---
title: Web Enumeration
phase: exploracion
platform: multi
tags: [web, enumeration, http, dirbusting]
risk: medium
attack_tactic: TA0007
attack_technique: T1071
data_sources: [web-server-logs, network-traffic, ids-ips]
last_review: 2026-05-25
---

# Web Enumeration

### Objetivo

Enumerar contenido web, directorios, archivos, parámetros y tecnologías para identificar vectores de ataque en aplicaciones web.

### Dirbusting / Content Discovery

```bash
# ffuf (fast)
ffuf -w wordlist.txt -u http://target.com/FUZZ -o results.txt

# feroxbuster
feroxbuster -u http://target.com -w wordlist.txt -x html,php,txt

# gobuster
gobuster dir -u http://target.com -w wordlist.txt -t 50

# dirb
dirb http://target.com/ wordlist.txt
```

### Technology Detection

```bash
# whatweb
whatweb -a 4 http://target.com

# wappalyzer CLI
wappalyzer https://target.com

# builtwith
curl "https://api.builtwith.com/v19/free?url=https://target.com"
```

### Headers y Technology Fingerprinting

```bash
# curl headers
curl -I http://target.com
curl -A "Mozilla/5.0" -I http://target.com

# nuclei technology detection
nuclei -t technologies/ -u http://target.com
```

### Parameter Discovery

```bash
# arjun (GET/POST parameter scanning)
arjun -u http://target.com/?id=1 --get

# ffuf for parameters
ffuf -w params.txt -u "http://target.com/?FUZZ=value" -ac
```

### One-liners

```bash
# Virtual host discovery
ffuf -w wordlist.txt -u http://target.com -H "Host: FUZZ.target.com"

# Extension fuzzing
ffuf -w wordlist.txt -u http://target.com/FUZZ.bak -e .txt,.md,.sql,.git

# Sitemap.xml discovery
curl -s http://target.com/sitemap.xml | grep '<loc>' | sed 's/<[^>]*>//g'
```

### Detección y Mitigación

- **Visibilidad:** Dirbusting genera alto volumen de 404s y flood de requests; SIEM alerta por rate limiting.
- **Hardening:** Rate limiting en WAF, monitor for enumeration tool User-Agents, block known scanner IPs.

### Validación de Cobertura

- **Prueba técnica:** Run dirbusting tool in lab.
- **Criterio de éxito:** SIEM rule fires on directory enumeration pattern or WAF blocks after threshold.
