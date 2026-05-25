---
title: Windows Hardening
phase: blue-team
platform: windows
tags: [hardening, windows, security, baseline]
risk: high
attack_tactic: TA0005
attack_technique: T1028
data_sources: [security-policy, group-policy]
last_review: 2026-05-25
---

# Windows Hardening

### Objetivo

Proveer guía de endurecimiento rápido para sistemas Windows contra técnicas ofensivas comunes.

### Account Security

```powershell
# Disable unnecessary accounts
Get-LocalUser | Where-Object { $_.Enabled -eq $true -and $_.Description -like '*built-in*' } | Disable-LocalUser

# Set strong password policy
net accounts /minpwlen:14 /maxpwage:90 /minpwage:1

# Audit local Admin组成员
Get-LocalGroupMember -Group "Administrators"

# Remove guest account
net user guest /active:no
```

### Network Hardening

```powershell
# Disable SMB v1
Set-SmbServerConfiguration -EnableSMB1Protocol $false -Force

# Disable NetBIOS over TCP/IP
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\NetBT\Parameters\Interfaces" -Name NetbiosOptions -Value 2 -Type DWord

# Enable firewall
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True

# Block inbound RDP by default
Set-NetFirewallRule -DisplayName "Remote Desktop" -Enabled False
```

### Credential Guard and Protection

```powershell
# Enable Credential Guard
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name RunAsPPL -Value 1

# Disable WDigest (prevents clear-text passwords in memory)
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest" -Name UseLogonCredential -Value 0

# Enable NTLM v2 only
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name NtlmMinClientSec -Value 537395200
```

### PowerShell Security

```powershell
# Enable Constrained Language Mode (where possible)
$ExecutionContext.SessionState.LanguageMode = 'ConstrainedLanguage'

# Enforce script block logging
Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Name EnableScriptBlockLogging -Value 1

# Disable PowerShell v2
Disable-WindowsOptionalFeature -FeatureName MicrosoftWindowsPowerShellV2 -Online -NoRestart
```

### One-liners

```powershell
# Apply Windows Security Baseline (via policy)
secedit /export /cfg baseline.inf
# Edit baseline.inf then:
secedit /configure /db baseline.sdb /cfg baseline.inf /areas SECURITYPOLICY

# Remove admin privileges from users
Get-LocalUser | Where-Object {$_.LocalSids -contains 'S-1-5-544'} | ForEach-Object { net localgroup administrators $_.Name /delete }
```

### Detección y Mitigación

- **Visibilidad:** Group Policy changes tracked in Security log; SIEM alerts on policy modifications.
- **Hardening:** Apply via GPO for entire environment; test changes before deploying.

### Validación de Cobertura

- **Prueba técnica:** Hardened system vs baseline against atomic-red-team.
- **Criterio de éxito:** Hardened system reduces attack surface measurably.
