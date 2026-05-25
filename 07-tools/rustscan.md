---
title: RustScan
phase: tools
platform: linux
tags: [rustscan, scanning, fast, network]
risk: medium
attack_tactic: TA0043
attack_technique: T1046
data_sources: [network-traffic, firewall-logs]
last_review: 2026-05-25
---

# RustScan

### Objetivo

Scanner de puertos ultra-rápido escrito en Rust como alternativa más rápida a Nmap para enumeración inicial.

### Uso básico

```bash
# Basic scan (usa Nmap sotto-capó per detection)
rustscan -a target -- -A

# Top 100 ports
rustscan -a target -t 200 -- -sT

# Timings paricular
rustscan -a target -t 1500 -- -T5

# Full scan
rustscan -a target -t 100 -- -p- -sV
```

### Configuración y Scripts

```bash
# Config file
rustscan --configfile rustscan.toml

# Scripts NSE (requires Nmap installed)
rustscan -a target -- -sC

# Nmap pipe style (shows what was autopiped to)
rustscan -a target -- -A
```

### Pipe to Nmap

```bash
# Full automation: rustscan + nmap
rustscan -a target -- -A -g | nmap -v -sVC -i -
```

### One-liners

```bash
# Scan + grepable output con script inspection
rustscan -a target -t 500 -- -sT -sV -oG - | grep ports

# Fast top 100
rustscan -a 10.0.0.1 -t 4000

# Output as JSON
rustscan -a target -- -oX output.xml
```

### Detección y Mitigación

- **Visibilidad:** RustScan is louder than Nmap but faster; IDS will detect.
- **Hardening:** Rate limiting, IPS, network segmentation.

### Validación de Cobertura

- **Prueba técnica:** Run RustScan in lab.
- **Criterio de éxito:** IDS alerts; scan completes in < seconds.
