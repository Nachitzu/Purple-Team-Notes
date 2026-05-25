---
title: Detection Debt Management
phase: blue-team
platform: multi
tags: [detection, technical-debt, sigma, rules, maintenance]
risk: medium
attack_tactic: TA0007
attack_technique: T1070
data_sources: []
last_review: 2026-05-25
---

# Detection Debt Management

### Objetivo

Gestionar la "deuda técnica de detecciones" acumulada por reglas desactualizadas, redundantes, o que generan fatiga de alertas.

### Qué es Detection Debt

- Reglas sin review en > 6 meses
- Técnicas ATT&CK sin cobertura activa
- Reglas con > 30% FP que nunca se tunean
- Reglas muteadas permanentemente pero no depuradas
- Mapeos a ATT&CK obsoletos (subtechniques v10+)
- Reglas que nunca dispararon (poser rules)

### Debt Inventory

```yaml
# Regla con deuda
- name: Crypto Locker Detection
  status: deprecated  # nunca se limpió
  created: 2023-01-15
  last_review: 2023-06-01  # 90 días sin revisión
  issues:
    - Subtechnique v3 attack changed
    - Too generic, 40% FP
    - Replaced by Ransomware_Behavioral_Detection
  action: Archive or delete
```

### Triage Process

```
Step 1: Inventory all rules (export from SIEM)
Step 2: Flag by age, FP rate, mapeo ATT&CK
Step 3: Prioritize: High-FP + old = immediate
Step 4: Decide: Archive / Tune / Rewrite / Keep
Step 5: Document rationale
```

### Acceptance Criteria for Debt

```
Allowed debt:
- Rules in 'experimental' status (active development)
- New rules < 30 days (still tuning)
- Deprecated rules pending archival (< 90 days post-deprecation)
- Rules protecting legacy systems (EOL timeline known)

NOT allowed:
- Rules muteadas > 30 dias sin acción
- Reglas con >50% FP por >30 dias
- Coverage gaps > 90 dias sin plan
```

### Quarterly Debt Review

```
Agenda:
1. Reglas con > 90 dias sin revisión → Review
2. Reglasmuteadas → Unmute + tune or delete
3. Cobertura gaps nuevos → Priorizear yplanear
4. Mapeos ATT&CK desactualizados → Actualizar
5. Decommission rules que nunca dispara → Retire
```

### Detección y Mitigación

- **Visibilidad:** Metrics on detection maintenance: age of rules, FP rates over time, coverage gaps.
- **Hardening:** Governance process that enforces review cycles, quarterly debt review mandatory.

### Validación de Cobertura

- **Prueba técnica:** Audit rule inventory and verify percentage of rules meeting quality criteria.
- **Criterio de éxito:** Detection debt ratio < 10% (rules meeting acceptance criteria / total rules).
