---
title: Webshell Detection Playbook
phase: blue-team
platform: [windows, linux]
tags: [webshell, detection, ir, dfir, malware]
risk: critical
attack_tactic: TA0002
attack_technique: T1059
data_sources: [web-server-logs, access-logs, iis-logs, endpoint]
last_review: 2026-05-25
---

# Webshell Detection Playbook

### Objetivo

Detectar, investigar y erradicar Webshells usados para persistencia post-explotación en servidores web.

### Indicadores de compromiso

- Unexpected new file in web directory (.php, .jsp, .asp, .svg, .png with embedded code)
- Unexpected listening port on web server (beyond 80/443)
- Unfamiliar process executing under w3wp.exe / apache / nginx
- Web server logs showing POST requests to non-app endpoints
- High traffic to unknown .asp or .php pages

### Detection Queries

```bash
# Find newly created PHP/ASP/JSP files
find /var/www -name "*.php" -mtime -7 -type f
find /var/www -name "*.asp" -mtime -7 -type f

# Find suspicious encoded commands in web logs
cat /var/log/apache2/access.log | grep -E '\.(php|jsp|asp)\?' | grep -E 'system|exec|passthru|shell_exec'

# Linux: check for web shells via YARA
yara -C webshell.yar /var/www -r
```

```powershell
# Windows: Find recently created web files
Get-ChildItem -Path C:\inetpub -Recurse -Include *.php,*.asp,*.aspx,*.jsp -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }

# Find PHP files with eval base64
Select-String -Path C:\inetpub\*.php -Pattern "eval|base64_decode|system\(" -Recurse

# Process monitor for w3wp unusual child processes
Get-Process | Where-Object { $_.Parent.ProcessName -in @('w3wp.exe','httpd.exe','nginx') } | Select-Object ProcessName, Id, Path
```

### Artefactos

- **Files:** Hidden in web root, double extension (shell.php.jpg)
- **Logs:** POST to webshell, suspicious User-Agent, outbound connections
- **Process:** web server process spawning cmd.exe/powershell.exe/bash
- **Registry:** autorun persistence via COM hijacking

### Response Steps

1. **Capture** - Acquire file for forensics (don't delete yet)
2. **Isolate** - Disable site in IIS/Apache, don't shut down (preserve memory)
3. **Identify** - Determine vector (file upload, LFI, RCE exploit)
4. **Scope** - Check other webservers for similar IOCs
5. **Eradicate** - Re-image or clean (including patching the entry vector)
6. **Hardening** - Implement upload validation, WAF, file integrity monitoring

### YARA Rule Example

```yara
rule Webshell_PHP_Basic {
    strings:
        $eval_func = /eval\s*\(/ ascii
        $base64_decode = "base64_decode" ascii
        $system = "system" ascii
        $passthru = "passthru" ascii
    condition:
        3 of them
}
```

### One-liners

```bash
# Apache access log for webshell POSTs
grep -E 'POST.*\.php|POST.*\.asp' /var/log/apache2/access.log | awk '{print $7}' | sort | uniq -c | sort -rn

# IOCs via find
find / -name "*.php" -mtime -3 -type f -exec grep -l "shell_exec" {} \;
```

### Detección y Mitigación

- **Visibilidad:** File integrity monitoring (FIM) on web directories, web server logs forwarded to SIEM, EDR behavioral detection.
- **Hardening:** Disable PHP/ASP in upload directories, use WAF, implement FIM, disable dangerous PHP functions, no execute permission on upload dir.

### Validación de Cobertura

- **Prueba técnica:** Upload common webshell to lab webserver, EDR and log monitoring should detect.
- **Criterio de éxito:** FIM detects new PHP file; EDR detects web server process calling shell commands.
