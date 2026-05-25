---
title: Burp Suite
phase: tools
platform: multi
tags: [burp, web, proxy, pentest, intercept]
risk: medium
attack_tactic: TA0002
attack_technique: T1059
data_sources: [web-server-logs]
last_review: 2026-05-25
---

# Burp Suite

### Objetivo

Framework completo para pruebas de seguridad web: proxy de interceptación, scanner, intruder, repeater per automatización y explotación.

### Setup y Config

```bash
# Start Burp
java -jar burpsuite_community.jar &

# Proxy listener on port 8080
# Configure browser: localhost:8080 as proxy
# Import CA cert to browser for HTTPS intercept
```

### Key Features

#### Proxy Intercept

```
Forward / Drop / Intercept is on
Edit request manually and forward
Actions menu →send to Repeater, Intruder, etc.
```

#### Repeater

```bash
# Manual request editing and re-submission
# Configure target scope
# View response, headers, cookies
```

#### Intruder (Fuzzing)

```bash
# Add positions (FUZZ placeholders)
# Configure attack type (sniper, battering ram, pitchfork, cluster bomb)
# Payloads: simple list, runtime file, numbers, dates
# Start attack
```

#### Scanner (Pro)

```
Actively scan for vulnerabilities
Filter by issue type
Export report
```

### Extensions

```bash
# Install via BApp Store
- ActiveScan++
- JSON Web Tokens
- Logger++
- WSDigger
- Intruder Grep
```

### One-liners

```bash
# Export cookies from proxy for curl
# In Proxy → History: right-click request → Copy as curl

# Run active scan via CLI (Burp Pro)
java -jar burp.jar --project-file=project.bplist --scanner --scope="http://target.com/*"

# Collaborator for OOB testing (SSRF, DNS exfil)
cat collaborator_payloads.txt | while read url; do echo "$url"; done
```

### Detección y Mitigación

- **Visibilidad:** Web server logs show requests from Burp fingerprint (X-MalwareScanner header), abnormal patterns.
- **Hardening:** WAF detects Burp Suite based on headers; block in production.

### Validación de Cobertura

- **Prueba técnica:** RunBurp scanning against lab web app.
- **Criterio de éxito:** Scanner finds planted vulnerabilities; logs show tool fingerprint.
