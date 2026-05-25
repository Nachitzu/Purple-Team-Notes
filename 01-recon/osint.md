---
title: OSINT Methodology
phase: recon
platform: multi
tags: [osint, recon, intelligence, social]
risk: low
attack_tactic: TA0043
attack_technique: T1016
data_sources: [public-records, social-media, search-engines]
last_review: 2026-05-25
---

# OSINT Methodology

### Objetivo

Recopilar inteligencia de fuentes abiertas sobre un objetivo para apoyar la evaluación de superficie de ataque y spear phishing.

### Framework OSINT

#### 1. Reconocimiento de dominio

```
WHOIS lookups → historial de IP → reput IP
DNS records → subdomains → certificate transparency
```

#### 2. Búsqueda de personal

```
LinkedIn → Organizational structure
Hunter.io / Voila Norbert → Email discovery
Shodan / Censys → Technologies exposed
```

#### 3. Tecnologías y stack

```
Wappalyzer → tecnología de websites
BuiltWith → histórico de tecnología
Netcraft → hosting history
```

#### 4. Leak / Breached data

```
HaveIBeenPwned → breach exposure
DeHashed → credentials en leaks
Snus → paste searching
```

#### 5. Geolocation y Maps

```
Google Maps / Street View
Bing Maps Birds Eye
```

### Google Dorking Quick Reference

```
# Filtros de dominio
site:target.com
site:target.com filetype:pdf
site:target.com intitle:"login"
site:target.com inurl:admin
site:target.com ext:conf OR ext:txt OR ext:log

# Exclude
site:target.com -www

# Wildcard
site:*target.com
```

### Email Harvesting

```bash
# theHarvester
theHarvester -d target.com -b all

# hunter.io
curl "https://api.hunter.io/v2/domain-search?domain=target.com&api_key=KEY"

# email enumerate (SMTP)
smtp-user-enum -M VRFY -U users.txt -t target.com
```

### Detección y Mitigación

- **Visibilidad:** OSINT pasivo es difícil de detectar; monitorear qué información pública se lesiona
- **Hardening:** Eliminar metadatos de documentos, enforce LinkedIn privacy, remove sensitive info from public facing systems

### Validación de Cobertura

- **Prueba técnica:** Realizar OSINT audit sobre la organización y documentar findings.
- **Criterio de éxito:** Registro de exposed surfaces y comparación contra asset inventory.
