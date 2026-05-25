---
title: Nmap
phase: tools
platform: multi
tags: [nmap, scanning, enumeration, network]
risk: medium
attack_tactic: TA0043
attack_technique: T1046
data_sources: [network-traffic, firewall-logs]
last_review: 2026-05-25
---

# Nmap

### Objetivo

Enumerar puertos abiertos, detectar servicios, identificar sistemas operativos y versiones en entornos de red para mapear la superficie de ataque.

### Comandos base

```bash
# Scan básico de puertos
nmap -sT target

# SYN scan (más sigiloso)
nmap -sS target

# Scan de top 100 puertos
nmap --top-ports 100 target

# Detección de servicio y versión
nmap -sV target

# Detección de SO
nmap -O target

# Scan agresivo (OS, version, scripts, traceroute)
nmap -A target

# Script scan default
nmap -sC target

# Escaneo con timing evade (T1-T5)
nmap -T4 target
```

### NSE Scripts útiles

```bash
# Enumeración SMB
nmap -p 445 --script smb-enum-shares,smb-enum-users target

# Detección de vulnerabilidades HTTP
nmap -p 80,443 --script http-vuln* target

# DNS enumeration
nmap -p 53 --script dns-enum target

# SSL/TLS info
nmap -p 443 --script ssl-enum-ciphers target
```

### One-liners

```bash
# Scan rápido de red interna
nmap -sn 10.0.0.0/24

# Listado de todos los scripts NSE
ls /usr/share/nmap/scripts/

# Scan con output a todos los formatos
nmap -oA scan_result target

# Scan IPv6
nmap -6 target
```

### Detección y Mitigación

- **Visibilidad:** Los escaneos SYN generan traffico anomaly,IDS alerta con patrones de incremento de puertos. Logs de firewall/show syn counts.
- **Hardening:** Implementar rate-limiting, SYN cookies, monitorear ports scans conSIEM, IPS inline puede bloquear escaneos aggressivos.

### Validación de Cobertura

- **Prueba técnica:** Ejecutar `nmap -sS 10.0.0.0/24` en laboratorio y verificar logs del IDS/IPS.
- **Criterio de éxito:** Regla Sigma para SYN scan masivo o alerta de firewall por escaneo de puertos.
