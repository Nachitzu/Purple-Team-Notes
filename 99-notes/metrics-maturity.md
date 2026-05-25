---
title: Metrics and Maturity
phase: notes
platform: multi
tags: [metrics, maturity, detection-coverage, purple-team]
risk: medium
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Metrics and Maturity

### Objetivo

Definir métricas para medir la madurez del programa de seguridad offensivo y defensivo, y trackear evolución.

### Detection Maturity Model (by PRE-ATT&CK)

| Level | Capability |
|-------|------------|
| 0 | No detection capability for this technique |
| 1 | System artifacts preserved (logs) but no active alerting |
| 2 | Basic alerting on generic technique |
| 3 | High fidelity, context-rich alert |
| 4 | full chain detection (kill chain completo) |

### Key Metrics

```markdown
Detection Coverage:
- % ATT&CK techniques with "D" status (target > 80%)
- % ATT&CK techniques with "P" status (target < 10%)
- Gaps remaining (target < 10%)

Purple Team Exercise Metrics:
- TTPs detected / total executed (target > %80)
- MTTD promedio (target depends on technique)
- MTTR promedio (target < 60 min for critical)
- ATT&CK Coverage before vs after exercise

Detection Engineering Metrics:
- Detection rules in production
- Rules tested vs untested
- False positive rate per rule (target < 10%)
- Detection debt (old rules, stale rules)
- Rules with ATT&CK mapping (target > 90%)
```

### Maturity Growth Tracking

```yaml
Q1 2026:
  detection_coverage: 45%
  purple_team_detection_rate: 62%
  mttd_avg: 25 min
  detection_debt: 23%

Q2 2026:
  detection_coverage: 58%
  purple_team_detection_rate: 73%
  mttd_avg: 18 min
  detection_debt: 18%

Goal Q4 2026:
  detection_coverage: 75%
  purple_team_detection_rate: 85%
  mttd_avg: 10 min
  detection_debt: < 10%
```

### Measurement Cadence

```
Weekly:
- Run atomic tests for new rules deployed
- Review false positive rates
- Triage detection debt backlog

Monthly:
- Full ATT&CK coverage matrix review
- Purple team exercise + detection validation
- Detection debt review

Quarterly:
- Purple team exercise covering new TTPs
- Full metrics report to stakeholders
- Update maturity model assessment
```

### Dashboard Elements

```
1. Detection Coverage by Tactic (bar chart)
2. Purple Team Detection Rate Over Time (line chart)
3. MTTD / MTTR Trend (line chart)
4. Detection Debt Evolution (area chart)
5. ATT&CK Matrix Heatmap (color-coded by coverage level)
6. New Rules Added Per Sprint (bar chart)
```

### Goal Setting

```
Industry benchmarks:
- Mature orgs: 80%+ ATT&CK coverage, MTTD < 5 min for common TTPs
- Advanced orgs: 90%+ coverage, full kill chain detection, automated response

Start: Know your baseline (current coverage)
Goal: Set realistic targets (quarter-over-quarter improvement)
Achievement: Regular measurement drives continuous improvement
```
