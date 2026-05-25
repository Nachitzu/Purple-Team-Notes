---
title: Exercise Planning
phase: purple-exercises
platform: multi
tags: [purple-team, planning, exercise, ttps]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Purple Team Exercise Planning

### Objetivo

Metodología para planificar ejercicios purple team: selección de TTPs, alcance, reglas de engagement, e integración con Threat Intel.

### Fases de Planning

```
1. Framing → Understand business context, critical assets, threat model
2. Rules of Engagement → Scope, constraints, communication protocols
3. TTPs Selection → Based on CTI, coverage gaps, threat profile
4. Infrastructure Setup → C2, staging, logging
5. Blue Team Readiness → Ensure monitoring is active and baseline established
6. Execute →.run exercises while Blue Team observes
7. Debrief → Document findings, update detection rules
```

### Select TTPs Based on CTI

```bash
# Extract TTPs from CTI report
# Example: APT29 Spear Phishing
T1566.001 (Spearphishing Attachment)
T1059.003 (Windows Command Shell)
T1070.002 (Clear Windows Event Logs)...

# Priorize by:
- Relevance to organization (industry, geography)
- Availability of tooling
- Coverage gap in existing detections
- Feasibility in lab
```

### Rules of Engagement

```
Scope: Systems/IPs explicitly authorized
Constraints: No lateral movement beyond /24, no persistence mechanisms left behind
Pre-authorization: All participants signed authority
Kill switches: Emergency contacts to halt exercise
Timing: Business hours vs after-hours
Red Team pre-notification: announcing major attack phases
```

### Planning Templates

```bash
# Exercise Name: APT29 Emulation Q3
# Dates: 2026-09-15 to 2026-09-17
# Scope: Workstations 10.0.0.0/24, Domain Controller
# Constraints: No ransomware, no real data exfil
# TTPs: T1566.001, T1059.003, T1005
# Hypotheses: Blue team should detect encoded PowerShell within 10 min
```

### Readiness Checklist

```
Blue Team:
[ ] Monitoring tools operational
[ ] Baseline established (normal traffic pattern)
[ ] Analysts trained on expected TTPs
[ ] Communication channel open with Red Team
[ ] Incident Response ready

Red Team:
[ ] C2 infrastructure set up
[ ] Payloads prepared for each TTP
[ ] Kill switches in place
[ ] Timing aligned with Blue Team availability
[ ] No unintended persistence left
```

### Métricas a Recoger

- TTPs ejecutados vs detectados
- MTTD (Mean Time to Detect)
- MTTR (Mean Time to Respond)
- Cobertura ATT&CK antes vs después
