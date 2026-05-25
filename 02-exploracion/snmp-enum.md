---
title: SNMP Enumeration
phase: exploracion
platform: linux, network
tags: [snmp, enumeration, network, monitoring]
risk: medium
attack_tactic: TA0007
attack_technique: T1016
data_sources: [snmp-traps, network-traffic]
last_review: 2026-05-25
---

# SNMP Enumeration

### Objetivo

Enumerar dispositivos via SNMP para obtener configuración de red, interfaces, routing, usuarios locales y passwords en dispositivos legacy.

### Community Strings y Basics

```bash
# onesixtyone (bruteforce community strings)
onesixtyone -c community_strings.txt -i targets.txt

# snmpwalk (walk entire MIB tree)
snmpwalk -v1 -c public target

# snmpwalk v2c
snmpwalk -v2c -c public target

# snmpwalk with auth
snmpwalk -v3 -u username -l authPriv -a SHA -A pass123 -x AES -X pass123 target
```

### Enumeración específica

```bash
# system info
snmpwalk -v1 -c public target system

# interfaces and IP
snmpwalk -v1 -c public target ipAddrTable
snmpwalk -v1 -c public target interfaces

# routing table
snmpwalk -v1 -c public target ipRouteTable

# processes
snmpwalk -v1 -c public target hrSWRunTable

# storage
snmpwalk -v1 -c public target hrStorageTable
```

### One-liners

```bash
# enumerate Windows users via SNMP
snmpwalk -v1 -c public target .1.3.6.1.4.1.77.1.2.25

# enumerate running processes
snmpwalk -v1 -c public target .1.3.6.1.2.1.25.4.2.1.2

# get network config
snmpget -v1 -c public target .1.3.6.1.2.1.4.1.1.0

# enumerate listening ports
snmpwalk -v1 -c public target .1.3.6.1.2.1.6.13.1.3
```

### Detección y Mitigación

- **Visibilidad:** SNMP sweeps generate anomalous traffic patterns, monitor for excessive SNMP queries, IDS signature for snmpget
- **Hardening:** Cambiar community strings default, use SNMPv3 with encryption, block SNMP at firewall except for management subnets

### Validación de Cobertura

- **Prueba técnica:** Run `snmpwalk -v1 -c public target` in lab.
- **Criterio de éxito:** Network monitoring alerts on SNMP enumeration activity.
