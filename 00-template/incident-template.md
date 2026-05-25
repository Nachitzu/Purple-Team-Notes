---
title: Incident Response Template
phase: blue-team
platform: multi
tags: [ir, incident, response, playbook]
risk: critical
attack_tactic: TA0000
attack_technique: T0000
data_sources: [logs, endpoints, network]
last_review: 2026-05-25
---

# Incident Response Template

### Objetivo

Plantilla para playbooks de respuesta ante incidentes. Debe cobrir todo el ciclo de respuesta.

### Metadata

```
Incident ID: [INC-YYYY-NNNN]
 Tipo: [Malware / Phishing / Insider / DDoS / etc.]
 Severidad: [P1 / P2 / P3 / P4]
 Fecha.detección: [YYYY-MM-DD HH:MM]
 Fecha.inicio.supuesta: [YYYY-MM-DD]
 Reportado.por: [Source]
 Asignado.a: [Analyst]
```

### Detección y Análisis

- **Cómo se detectó:** EDR alert / SOC report / User report / Threat intel
- **Síntomas iniciales:** [ Indicators ]
- **Sistemas afectados:** [ Lista de hosts ]
- **Usuarios comprometidos:** [ Lista ]

### Contención

- **Corto plazo (inmediata):** Bloquear IOC en firewall/EDR, isolate affected hosts
- **Largo plazo (limpieza):** Re-image, password reset, revoke sessions
- **Indicadores de contención:** Confirmar que no hay spread observed

### Erradicación

- **Pasos de cleanup:** Remove malware, close backdoors, patch vulnerable services
- **Verificación:** Re escanear sistemas, confirm resolving de IOC

### Recuperación

- **Restore from backup:** [ Fecha del backup usado ]
- **Hardening aplicado:** [ Cambios realizados post-incidente ]
- **Monitorización extra:** [ Timeline de heightened monitoring ]

### Lecciones aprendidas

- **Causa raíz:** [ Root cause analysis ]
- **Qué funcionó bien:** [ Lessons ]
- **Qué falló:** [ Gaps identified ]
- **Acciones de mejora:** [ Owner + fecha ]
