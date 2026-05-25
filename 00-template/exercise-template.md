---
title: Purple Team Exercise Template
phase: purple-exercises
platform: multi
tags: [purple-team, exercise, planning]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Purple Team Exercise Template

### Objetivo

Plantilla para planificar y documentar ejercicios purple team de punta a punta.

### Metadata del ejercicio

```
Nombre: [Nombre del ejercicio]
Fecha: [YYYY-MM-DD]
Alcance: [ IPs / dominios / sistemas ]
Restricciones: [No usar / No afectar]
Red Team: [Nombres]
Blue Team: [Nombres]
```

### Fases

#### 1. Planeación

- Intelligence sources consultadas
- Actor de amenaza a emular ( APT-XX )
- TTPs selecionados ( lista de técnica ATT&CK)
- Hipótesis de detección (qué debería alertar blue team)

#### 2. Preparación

- Infraestructura C2 lista
- Payloads prepared
- Blue Team notificado y en modo observación
- Canales de comunicación abiertos

#### 3. Ejecución

| Hora | Técnica | TTP ATT&CK | Resultado |
|------|---------|------------|-----------|
| HH:MM | [descripción] | T0000 | [detectado / no detectado / bloqueado] |

#### 4. Post-ejercicio

- Findings críticos
- Brechas de cobertura identificadas
- Recomendaciones de hardening
- Priorización de nuevas reglas

### Métricas recogido

- Tiempo medio de detección (MTTD)
- Tiempo medio de respuesta (MTTR)
- TTPs detectados vs total ejecutados
- Cobertura antes vs después

### After-action review

- Fecha de sesión AAR
- Participantes
- Decisiones tomadas
-owner de cada acción
