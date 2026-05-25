---
title: Port Scanning
phase: exploracion
platform: multi
tags: [port, scanning, nmap, network]
risk: medium
attack_tactic: TA0043
attack_technique: T1046
data_sources: [network-traffic, ids-ips-logs, firewall-logs]
last_review: 2026-05-25
---

# Port Scanning

### Objetivo

Identificar puertos abiertos en objetivos para mapear servicios expuestos y encontrar vectores de acceso.

### TCP Scanning

```bash
# SYN scan (requires root)
sudo nmap -sS target

# Connect scan (no root needed)
nmap -sT target

# Full scan all ports
nmap -p- target

# Top 100 ports
nmap --top-ports 100 target
```

### UDP Scanning

```bash
# Top 50 UDP ports
sudo nmap -sU --top-ports 50 target

# DNS, SNMP, NTP discovery
sudo nmap -sU -p 53,161,123 target
```

### Service Detection

```bash
nmap -sV target
nmap -sV -p 22,80,443 target
nmap -sV --version-intensity 5 target
```

### Scan Types and Evasion

```bash
# Timing templates (T0-T5)
nmap -T4 target

# Decoy scan
nmap -D decoy1,decoy2,ME target

# Source port manipulation
nmap -g 53 target

# Fragmented packets
nmap -f target
```

### One-liners

```bash
# Quick live host discovery
nmap -sn 10.0.0.0/24 -oG - | grep Up

# Fast port scan
nmap -T5 -F target

# Service version scan for all ports
nmap -sV -p- -oA scan target

# Scan for specific vulnerability (example: EternalBlue)
nmap -p445 --script smb-vuln-ms17-010 target
```

### Detección y Mitigación

- **Visibilidad:** Port scans trigger IDS/IPS alerts, SYN floods logged by firewall, correlation rules for scan patterns.
- **Hardening:** SYN cookies, rate limiting at firewall, deploy IPS, monitor for traffic anomalies.

### Validación de Cobertura

- **Prueba técnica:** Run `nmap -sS -p- target` in lab.
- **Criterio de éxito:** IDS fires alert on port scan; firewall drops excessive SYN packets.
