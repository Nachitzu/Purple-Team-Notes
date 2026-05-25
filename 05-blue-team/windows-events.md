---
title: Windows Event Log Reference
phase: blue-team
platform: windows
tags: [windows-events, security, logging, dfir]
risk: medium
attack_tactic: TA0007
attack_technique: T1070
data_sources: [windows-security-log, system-log, application-log]
last_review: 2026-05-25
---

# Windows Event Log Reference

### Objetivo

Referencia rápida de eventos de Windows Security, System y Application para investigación y detección.

### Logon / Authentication Events

| Event ID | Source | Description |
|----------|--------|-------------|
| 4624 | Security | Successful logon |
| 4625 | Security | Failed logon |
| 4627 | Security | Logon with group membership |
| 4634 | Security | Logoff |
| 4647 | Security | User initiated logoff |
| 4648 | Security | Explicit credentials for logon (runas) |
| 4672 | Security | Account assigned special privileges (admin logon) |
| 4675 | Security | SID history was filtered |
| 4688 | Security | New process created |
| 4689 | Security | Process terminated |

### Account Management

| Event ID | Description |
|----------|-------------|
| 4720 | User account created |
| 4722 | User account enabled |
| 4723 | Password change attempt |
| 4724 | Password reset attempt |
| 4725 | User account disabled |
| 4726 | User account deleted |
| 4732 | User added to local admin group |
| 4733 | User removed from local admin group |
| 4740 | Account lockout |
| 4767 | Account unlocked |

### Kerberos Events

| Event ID | Description |
|----------|-------------|
| 4768 | TGT requested (logon) |
| 4769 | TGS requested (service ticket) |
| 4771 | Kerberos preauth failure |
| 4776 | DC validated credentials |

### PowerShell and Scripting

| Event ID | Source | Description |
|----------|--------|-------------|
| 800 | PowerShell | Script block logging |
| 400 | PowerShell | Engine lifecycle |
| 4103 | PowerShell | Module logging |

### Querying Events

```powershell
# Recent logons
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624} -MaxEvents 20 | Format-List TimeCreated,Message

# Failed logins
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 50 | Where-Object {$_.TimeCreated -gt (Get-Date).AddDays(-1)}

# New service created
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4697} -MaxEvents 20
    
# PowerShell script blocks
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-PowerShell/Operational';Id=800} -MaxEvents 30
```

### Detección y Mitigación

- **Visibilidad:** Windows Security log es fundamental; Security log debe estar configured para retention minima de 90 dias.
- **Hardening:** Enable PowerShell module logging, enable Script Block Logging, forward events to SIEM, protect event logs from deletion.

### Validación de Cobertura

- **Prueba técnica:** Generate test events (login, process create) and verify they appear in logs.
- **Criterio de éxito:** SIEM receives Security events; retention policy configured.
