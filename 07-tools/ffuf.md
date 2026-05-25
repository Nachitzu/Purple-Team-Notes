---
title: FFUF
phase: tools
platform: multi
tags: [ffuf, web, fuzzing, directory, vhost]
risk: medium
attack_tactic: TA0007
attack_technique: T1071
data_sources: [web-server-logs, network-traffic]
last_review: 2026-05-25
---

# FFUF

### Objetivo

Fuzzing rápido de directorios, vhosts, parámetros y subdominios mediante fuerza bruta HTTP para enumeración web.

### Directory Fuzzing

```bash
ffuf -w wordlist.txt -u http://target.com/FUZZ

# With recursion
ffuf -w wordlist.txt -u http://target.com/FUZZ -recursion -recursion-depth 3

# Filter by size/status
ffuf -w wordlist.txt -u http://target.com/FUZZ -fs 4242 -fc 404

# Match keywords
ffuf -w wordlist.txt -u http://target.com/FUZZ -mr "Welcome"
```

### VHost Discovery

```bash
ffuf -w wordlist.txt -u http://target.com -H "Host: FUZZ.target.com" -fs 4242
```

### Parameter Fuzzing

```bash
# GET parameters
ffuf -w params.txt -u "http://target.com/search?FUZZ=value" -mc 200,302

# POST fuzzing
ffuf -w params.txt -u http://target.com/api -X POST -d "FUZZ=test" -fc 400

# Both
ffuf -w params.txt -u "http://target.com/?FUZZ=test"
```

### Subdomain Fuzzing

```bash
ffuf -w subdomains.txt -u http://FUZZ.target.com -fs 0
```

### One-liners

```bash
# Fast scan with thread control
ffuf -w wordlist.txt -u http://target.com/FUZZ -t 50

# Extensions fuzzing
ffuf -w wordlist.txt -u http://target.com/FUZZ.bak -e .txt,.log,.php,.html

# Output JSON for automation
ffuf -w wordlist.txt -u http://target.com/FUZZ -o results.json -of json
```

### Mutate-mode (SecLists)

```bash
# Use built-in wordlists
ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u http://target.com/FUZZ
```

### Detección y Mitigación

- **Visibilidad:** Fuzzing genera alto volumen de 404s, rate limiting kicks in, WAF blocks after threshold.
- **Hardening:** WAF con rate limiting, block known fuzzers via User-Agent, 429 responses.

### Validación de Cobertura

- **Prueba técnica:** Run ffuf in lab.
- **Criterio de éxito:** SIEM/WAF detects fuzzing attempt at threshold.
