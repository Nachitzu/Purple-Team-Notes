---
title: Active Reconnaissance
phase: recon
platform: multi
tags: [nmap, recon, active, scanning]
risk: medium
attack_tactic: TA0043
attack_technique: T1016
data_sources: [network-traffic, ids-ips-logs]
last_review: 2026-05-25
---

# Active Reconnaissance

### Objetivo

Explorar activamente el objetivo enviando tráfico para descubrir hosts vivos, puertos abiertos, servicios y versiones.

### Requisitos previos

- Alcance autorizado por escrito
- Herramientas: nmap, masscan, naabu, unicornscan

### Host Discovery

```bash
# Ping sweep
nmap -sn 10.0.0.0/24 -oA hosts.nmap

# ARP discovery (local network)
arp-scan -l

# TCP SYN ping ( stealthier)
nmap -PS22,80,443,445 -sn target/24
```

### Port Scanning

```bash
# Top 100 ports SYN scan
sudo nmap -sS --top-ports 100 -oA scan_top100 target

# Full TCP scan
nmap -p- -sT -oA scan_full target

# Service and version detection
nmap -sV -p 22,80,443,445,3389,8080 target

# UDP scan (slow)
sudo nmap -sU --top-ports 50 target
```

### Detección rápida en rango interno

```bash
# masscan for rapid scanning
masscan -p1-10000 10.0.0.0/24 --rate=10000

# naabu (fast resolver)
naabu -host 10.0.0.1-254 -top-ports 100
```

### OS Fingerprinting

```bash
nmap -O target
nmap -O --osscan-guess target
```

### One-liners

```bash
# Quick scan Top 10 ports
nmap -Pn --top-ports 10 target

# Scan plus default scripts
nmap -sC target

# Fast scan with timing
nmap -T4 -F target
```

### Detección y Mitigación

- **Visibilidad:** IDS will alert on port scans; log correlation shows scan patterns
- **Hardening:** Rate-limit SYN, implement port knock, block unused services at firewall, monitor for traffic anomalies

### Validación de Cobertura

- **Prueba técnica:** Run nmap scan in lab and verify IDS alerts.
- **Criterio de éxito:** SIEM rule fires on mass port scan pattern.
