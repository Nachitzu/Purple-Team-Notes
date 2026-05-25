---
title: SMB Enumeration
phase: exploracion
platform: [windows, linux]
tags: [smb, enum, shares, lateral-movement]
risk: high
attack_tactic: TA0007
attack_technique: T1135
data_sources: [smb-traffic, security-events, sysmon]
last_review: 2026-05-25
---

# SMB Enumeration

### Objetivo

Enumerar shares de SMB, usuarios, políticas y relaciones de confianza para identificar puntos de movimiento lateral.

### Comandos base

```bash
# enumerate shares con smbclient
smbclient -L //target -N

# enum with netexec (CrackMapExec)
netexec smb target -u '' -p '' --shares

# authenticated shares
netexec smb target -u user -p pass --shares

# enumerate users
netexec smb target -u user -p pass --users

# RID cycling con rpcclient
rpcclient target -U "" -N
rpcclient $> netshareenum
rpcclient $> enumdomusers
rpcclient $> querydispinfo
```

### Null Session y Guest Access

```bash
# Null session enumerate
enum4linux -a target

# smbmap
smbmap -H target
smbmap -H target -u guest

# Check for guest access
smbclient //target/guest -N
```

### SMB Signing y Vulnerabilities

```bash
# Check SMB signing required
nmap -p 445 --script smb-security-mode target

# Check for EternalBlue
nmap -p 445 --script smb-vuln-cve-2017-0144 target

# Check SMBv1
nmap -p 139,445 --script smb-os-discovery target
```

### One-liners

```bash
# Find readable shares
for share in $(netexec smb target -u '' -p '' --shares | awk '{print $1}'); do echo "Testing $share"; done

# smbexec
smbexec.py 'domain/user:password@target'

# psexec
psexec.py 'domain/user:password@target'
```

### Detección y Mitigación

- **Visibilidad:** Security Event 4624 (account logon), 4625 (logon failure), Sysmon EID 3 (SMB network connection), EID 1 (process creation from SMB).
- **Hardening:** Requir SMB signing, disable SMBv1, block null sessions, restrict authenticated users list.

### Validación de Cobertura

- **Prueba técnica:** Run `enum4linux -a target` in lab.
- **Criterio de éxito:** Alert fires on null session enumeration or excessive SMB connection attempts.
