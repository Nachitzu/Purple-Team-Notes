---
title: Feroxbuster
phase: tools
platform: linux
tags: [feroxbuster, web, fuzzing, directory, busting]
risk: medium
attack_tactic: TA0007
attack_technique: T1071
data_sources: [web-server-logs]
last_review: 2026-05-25
---

# Feroxbuster

### Objetivo

Fetcher de directorios recursivo escrito en Rust con múltiples características de auto-parsing.

### Basic

```bash
feroxbuster -u http://target.com -w wordlist.txt

# Auto-parsing de enlaces (no wordlist needed)
feroxbuster -u http://target.com --extract-links
```

### Extensions y Filters

```bash
# With extensions
feroxbuster -u http://target.com -x html,php,asp,aspx

# Filter by status code
feroxbuster -u http://target.com --filter-status 404

# Filter by size
feroxbuster -u http://target.com --filter-size 1234
```

### Recursion y Depth

```bash
# Recursive with depth
feroxbuster -u http://target.com -R -d 3

# Connection persist ( reuse TCP connections)
feroxbuster -u http://target.com -k
```

### One-liners

```bash
# Fast short wordlist
feroxbuster -u http://target.com -w /usr/share/seclists/Discovery/Web-Content/common.txt -t 20

# With auth
feroxbuster -u http://target.com -H "Authorization: Bearer TOKEN" -w wordlist.txt
```

### Detección y Mitigación

- **Visibilidad:** Similar to dirbuster/gobuster; logs show directory enumeration.
- **Hardening:** Rate limit 429, block at WAF.

### Validación de Cobertura

- **Prueba técnica:** Run feroxbuster in lab.
- **Criterio de éxito:** Blocked or alerted by WAF/SIEM.
