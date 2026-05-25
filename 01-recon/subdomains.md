---
title: Subdomain Enumeration
phase: recon
platform: multi
tags: [subdomain, recon, dns, enumeration]
risk: low
attack_tactic: TA0043
attack_technique: T1016
data_sources: [passive-dns, certificate-transparency]
last_review: 2026-05-25
---

# Subdomain Enumeration

### Objetivo

Descubrir subdominios de un dominio para expandir la superficie de ataque y encontrar servicios olvidados o no documentados.

### Métodos pasivos

```bash
# crt.sh
curl -s "https://crt.sh/?q=%25.target.com&output=json" | jq -r '.[].name_value' | sort -u

# amass (passive)
amass enum -passive -d target.com

# subfinder
subfinder -d target.com -silent

# assetfinder
assetfinder target.com

# findomain
findomain -t target.com
```

### Métodos activos

```bash
# amass active (bruteforce + wordlist)
amass enum -active -d target.com -w wordlist.txt

# gobuster DNS
gobuster dns -d target.com -w wordlist.txt -o subdomains.txt

# ffuf
ffuf -w wordlist.txt -u http://FUZZ.target.com

# shuffledns
shuffledns -d target.com -w wordlist.txt -r resolvers.txt
```

### Permutation y Alterations

```bash
# alterates subdomains with DNSgen
cat wordlist.txt | dnsgen - | shuffledns -d target.com -r resolvers.txt

# certex (certificate transparency + permutations)
certex -d target.com -w wordlist.txt
```

### One-liners

```bash
# Combine passive sources + sort unique
subfinder -d target.com & ammass enum -passive -d target.com & assetfinder target.com | sort -u > subdomains.txt

# Verify alive subdomains with httpx
cat subdomains.txt | httpx -silent -status-code -title
```

### Detección y Mitigación

- **Visibilidad:** Passive recon is hard to detect; active bruteforce is noisy and may trigger IDS
- **Hardening:** Restrict zone transfers, implement response rate limiting on DNS, monitor for DNS lookups for non-existent subdomains (nxdomain)

### Validación de Cobertura

- **Prueba técnica:** Run tools in lab and verify detection capability against subdomain enumeration methods.
- **Criterio de éxito:** DNS monitoring shows enumeration activity; nxdomain traffic baseline established.
