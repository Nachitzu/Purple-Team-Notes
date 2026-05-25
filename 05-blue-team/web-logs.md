---
title: Web Server Logging
phase: blue-team
platform: web
tags: [apache, nginx, access-log, error-log, waf]
risk: low
attack_tactic: TA0007
attack_technique: T1070
data_sources: [apache-access-log, nginx-access-log, error-log]
last_review: 2026-05-25
---

# Web Server Logging

### Objetivo

Proveer patrones de análisis para logs de Apache, Nginx y WAF para detectar ataques web y hallazgos DFIR.

### Apache / Nginx Access Log Patterns

```bash
# IP con más requests
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -20

# Status codes
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# Requests by hour
awk '{print $4}' access.log | cut -d: -2 | cut -d/ -1 | sort | uniq -c

# Top endpoints
awk '{print $7}' access.log | sort | uniq -c | sort -rn | head -20
```

### Detection Patterns

```bash
# SQL Injection attempts
grep -E "UNION|SELECT|INSERT|DROP|OR 1=1" access.log

# XSS attempts
grep -E "<script|alert|onerror=" access.log

# Path traversal
grep -E "\.\./|\.\.%2F|\.\.%5C" access.log

# Scanner user-agents
grep -E "sqlmap|nmap|masscan|gobuster|dirbuster|nikto|burp" access.log

# Common attack vectors
grep -E "\.asp|\.jsp|\.php|\.cgi|shell\.php" access.log
```

### WAF Log Analysis

```bash
# ModSecurity audit log (JSON)
tail -f /var/log/apache2/modsec_audit.log | jq .;

# Failing rules
grep "Rule" modsec_audit.log | cut -d: -f4 | sort | uniq -c | sort -rn | head -10

# Cloudflare logs
jq '.AccessedURL, .ClientIP, .SecurityRule' cf_logs.json
```

### One-liners

```bash
# Find IPs hitting 404 repeatedly (可能的 dirbusting)
awk '{if ($9==404) print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Scanner detection
awk '/(sqlmap|nikto|burp)/ {print $1}' access.log | sort -u

# Top user agents
awk -F'"' '{print $6}' access.log | sort | uniq -c | sort -rn | head -10
```

### Detección y Mitigación

- **Visibilidad:** Implementar fail2ban or mod_security for real-time IP blocking; ship logs to SIEM for correlation.
- **Hardening:** Enable detailed logging (VirtualHost level), rotate logs daily, ship to centralized log server.

### Validación de Cobertura

- **Prueba técnica:** Run sqlmap against lab web server.
- **Criterio de éxito:** SIEM rule detects SQL injection patterns in logs.
