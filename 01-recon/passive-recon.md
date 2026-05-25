---
title: Passive Reconnaissance
phase: recon
platform: multi
tags: [osint, recon, passive, domain]
risk: low
attack_tactic: TA0043
attack_technique: T1016
data_sources: [passive-dns, whois, public-records]
last_review: 2026-05-25
---

# Passive Reconnaissance

### Objetivo

Recopilar información sobre el objetivo sin enviar tráfico directo a sus sistemas, usando fuentes públicas y registros abiertos.

### Fuentes principales

- **WHOIS:** Datos de registro de dominio (nombre, email, teléfono, nameservers)
- **Passive DNS:** Historial de resolutions DNS sin querying el servidor directamente
- **Certificates Transparency Logs:** Subdominios exposés par certificados SSL
- **Search engines:** Google Dorking, Shodan, Censys
- **Social media / LinkedIn:** tecnologías y personnelles de la organización
- **Archive.org:** Versiones anteriores de websites

### WHOIS lookup

```bash
# basic whois
whois target.com

# parse with whoisxmlapi
curl "https://www.whoisxmlapi.com/whoisserver/WhoisService/getWhois?outputFormat=json&initialWhoisRecord=1&daemonKey=test&domainName=target.com"
```

### Passive DNS y Certificate Transparency

```bash
# Certificate Transparency con crt.sh
curl -s "https://crt.sh/?q=%25.target.com&output=json" | jq .

# subDomain enumeration via crt.sh
python3 -c "import urllib.request; import json; r=urllib.request.urlopen('https://crt.sh/?q=%25.target.com&output=json'); print(set([x['name_value'] for x in json.loads(r.read())]))"

# hunter.io API (API key needed)
curl "https://api.hunter.io/v2/domain-search?domain=target.com&api_key=YOUR_KEY"
```

### Google Dorking

```
site:target.com inurl:admin
site:target.com filetype:pdf
site:target.com intitle:"login"
site:target.com ext:log
site: target.com inurl:wp-admin
```

### Shodan y Censys

```bash
# Shodan
shodan host 1.2.3.4
shodan search "org:target.com"

# Censys
censys search "parsed.names: target.com"
```

### Detección y Mitigación

- **Visibilidad:** Passive recon es difícil de detectar directamente; monitorear passive DNS lookups depuis tus resolveurs
- **Hardening:** Usar privacy guards on domain registration, monitor public exposure de tecnologías internally

### Validación de Cobertura

- **Prueba técnica:** Verificar qué información de la organización está disponible publicly.
- **Criterio de éxito:** Team knows what is exposed and has record of OSINT footprint.
