---
title: Screenshot Reconnaissance
phase: recon
platform: multi
tags: [screenshot, recon, web, screenshot-osint]
risk: low
attack_tactic: TA0043
attack_technique: T1016
data_sources: [public-web]
last_review: 2026-05-25
---

# Screenshot Reconnaissance

### Objetivo

Capturar screenshots de websites y aplicaciones web descubiertas durante recon para identificar login portals, paneles de admin, tecnologías expuestas, y hacer mapeo visual rápido.

### Herramientas principales

```bash
# eyewitness (Python, Kali)
eyewitness -f targets.txt --web

# aquatone (Go)
aquatone -Targets targets.txt -Ports-TCP 80,443,8080,8443

#gowitness (Go, fast)
gowitness scan --url-list targets.txt
gowitness screenshot --url https://target.com --timeout 30

# url-to-pdf-apiron (screenshot as service)
curl "https://api.urlto.io/v1/screenshot?api_key=KEY&url=target.com&format=json"

# screeenshot.py (selenium)
python3 screenshot.py -l targets.txt
```

### Uso en pipeline de recon

```bash
# Pipeline: enumerate subdomains → filter alive → screenshot
cat subdomains.txt | httpx -silent | aquatone -out screenshots/

# Batch screenshots from aquatone output
ls *.png | for i in *.png; do echo "$i"; done
```

### One-liners

```bash
# screenshots de IPs con aquatone para port 80/443
cat alive-ips.txt | aquatone - Ports-TCP 80,443 -out screenshots/

# screenshot de login pages con eyewitness
eyewitness -f loginpages.txt --web -- Threads 10
```

### Detección y Mitigación

- **Visibilidad:** Screenshots tooleo no genera logs en el objective server; detection puede basarse en traffic patterns
- **Hardening:** Rate-limit HTTP, banner strings identifying scanners, block known scanner IPs

### Validación de Cobertura

- **Prueba técnica:** Run screenshot tool against lab and verify screenshot output vs actual web content.
- **Criterio de éxito:** Screenshots accurately capture application state; tool handles authentication forms gracefully.
