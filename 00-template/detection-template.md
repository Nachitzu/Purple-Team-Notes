---
title: Detection Rule Template
phase: blue-team
platform: [windows, linux, network]
tags: [detection, sigma, rule, template]
risk: [low, medium, high, critical]
attack_tactic: TA0000
attack_technique: T0000
data_sources: [sysmon, security-events, network-traffic]
last_review: 2026-05-25
---

# Detection Rule Template

### Objetivo

Plantilla para crear reglas de detección en formato Sigma o lenguaje nativo de SIEM (KQL, SPL). Cada campo debe completarse antes de pasar a producción.

### Criterios de calidad

- Fidelidad: tasa de falsos positivos < 10% en entorno de prueba
- Integrabilidad: mapeo explícito a MITRE ATT&CK (táctica + técnica)
- Trazabilidad: fecha de creación, autor, fecha de modificación
- Cobertura: documentar qué logs/pipeline alimentan la regla

### Campos obligatorios

```
title: [Nombre descriptivo de la regla]
status: [experimental | stable | deprecated]
description: [Qué detecta y por qué es relevante]
author: [Nombre o handle]
date: [YYYY-MM-DD]
modified: [YYYY-MM-DD]
tags:
  - detection
  - [táctica ATT&CK]
  - [técnica ATT&CK]
logsource:
  product: [windows, linux, network, cloud]
  service: [sysmon, security, apache, etc.]
  category: [process-creation, network-connection, etc.]
detection:
  selection:
    [field]: [value or regex]
  condition: [selection | keyword]
level: [informational | low | medium | high | critical]
falsepositives:
  - [FP known]
  - [FP expected in certain environments]
mitre:
  tactics:
    - TA0000
  techniques:
    - T0000
```

### Ciclo de vida

1. **experimental:** creada, probada en lab, < 10% FP
2. **stable:**promovida a producción con playbook
3. **deprecated:**retirada por irrelevancia o alto FP

### Playbook asociado

Cada regla estable debe tener un IR playbook indicando:
- Qué hacer cuando se disparar la alerta
- Qué telemetry collect durante la investigación
- Cuándo escalar a IR
