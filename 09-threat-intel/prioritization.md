---
title: Threat Intel Prioritization
phase: threat-intel
platform: multi
tags: [threat-intel, prioritization, risk, intelligence]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Threat Intel Prioritization

### Objetivo

Framework para priorizar inteligencia de amenazas y recursos de detección basándose en relevance, credibility, y tangibility.

### Priorización Matrix

```markdown
                 Relevance High | Relevance Low
Credibility High  | PRIORITY 1    | PRIORITY 2
Credibility Low   | PRIORITY 3    | PRIORITY 4
```

### Dimensions

**Credibility (¿Es confiable la fuente?)**
- Fuente primaria verificada (misp, vendor, internal)
- Nivel de detalle técnico
- Capacidad para reproducir/validar
- Histórico de accuracy

**Relevance (¿Es applicable a noi?)**
- Mismo sector industrial
- Misma geografia
- Misma tecnología/platform
- Mismos activos TTPs objetivo

**Tangibility (¿Qué tan accionable?)**
- TTPs específicosvs generic
- IOCs con vida útil larga
- Mapeo directo a ATT&CK
- Posibilidad deemular/validar

### Scoring Model

```python
# Pseudocode prioritization
def prioritize(cti_item):
    score = 0
    score += 30 if cti_item.industry_match else 0
    score += 30 if cti_item.geography_match else 0
    score += 20 if cti_item.has_ttps else 0
    score += 20 if cti_item.has_valid_iocs else 0
    # Normalize to High/Medium/Low
    if score >= 75: return "HIGH"
    elif score >= 40: return "MEDIUM"
    else: return "LOW"
```

### Decision Framework

```
HIGH:
- Actor known to target your industry
- Specific TTPs identified
- Active exploitation reported
→ Create detection rule immediately
→ Plan purple team exercise

MEDIUM:
- Actor with some overlap overlap
- Generic TTPs vs specific
- Older intelligence
→ Add to detection backlog
→ Schedule quarterly review

LOW:
- Actor unrelated to your sector
- Generic or theoretical techniques only
- Unverified/uncorroborated
→ Store in TIP/KB for reference
→ Monitor only if escalates
```

### Process

```
1. Ingest CTI from all sources (MISP, vendor reports, ISACs, internal)
2. Tag with relevance dimensions (industry, geo, tech)
3. Score and classify
4. Assign to Detection Engineering or Purple Team queue
5. Follow up on SLA: HIGH = 48h response, MEDIUM = 2 weeks, LOW = quarterly
6. Re-evaluate on new intelligence or incident
```

### Detección y Mitigación

- **Visibilidad:** Intelligence that goes unprocessed is worthless; enforce tagging and scoring.
- **Hardening:** Prioritized intelligence should immediately inform hardening plan changes.
