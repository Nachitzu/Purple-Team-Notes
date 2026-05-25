---
title: After Action Review
phase: purple-exercises
platform: multi
tags: [after-action-review, aar, purple-team, lessons-learned]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# After Action Review

### Objetivo

Estructurar la sesión post-ejercicio para documentar hallazgos, identificar gaps, y generar acciones concretas de mejora.

### Template de Sesión AAR

```
Exercise: [Nombre]
Fecha: [YYYY-MM-DD]
Duración: [X horas/días]
Participantes: [Lista]
Scope: [Qué se evaluó]

MATERIAL:
- Slides de Opening
- Playbooks ejecutados
- Logs capturados
- Detections que dispararon
```

### ResultadosCuantitativos

```
Total TTPs ejecutados: X
TTPs detectados: Y
TTPs no detectados: Z
Detección rate: Y/X * 100%

MTTD promedio: X min
MTTR promedio: Y min

Cobertura ATT&CK antes: A%
Cobertura ATT&CK después: B%
```

### TTPs por Resultado

| TTP | Estado | Detección |
|-----|--------|-----------|
| T1059.003 | Detected | SIEM alert in 3 min |
| T1003.001 | Not detected | No log generated |
| T1547.001 | Detected | EDR alert in 1 min |

### Qualitative Findings

```
STRENGTHS:
- Blue Team detected phishing link click rapidly
-SIEM rules well-tuned for PowerShell
- Communication protocol worked smoothly

WEAKNESSES:
- LSASS access not detected until post-mortem
- No visibility into lateral movement via WMI
- Hunting queries took too long to write
```

### Recomendaciones Priorizadas

```markdown
1. [CRITICAL] Implementar Sysmon EID 10 logging para detectar LSASS access
   Owner: Blue Team Lead
   Due: 2026-06-15
   
2. [HIGH] Crear regla Sigma para WMI remote spawning
   Owner: Detection Engineering
   Due: 2026-06-22

3. [MEDIUM] Investigar possibility of filtering rule para RCE #1524
   Owner: Detection Engineering
   Due: 2026-07-01
```

### Action Items Tracking

```
| ID | Recommendations | Owner | Due Date | Status |
|----|-----------------|-------|----------|--------|
| A1 | Sysmon EID 10 rule for LSASS | Blue Team | 2026-06-15 | DONE |
| A2 | WMI spawning Sigma rule | Detection Eng | 2026-06-22 | IN PROGRESS |
| A3 | Hardening: disable PowerShell v2 | Infra | 2026-06-30 | TODO |
```

### Lessons Learned Process

1. Schedule AAR within 5 business days of exercise
2. Send pre-read: summary data, detection results
3. Facilitator guides discussion, takes detailed notes
4. Categorize: what worked, what didn't, what needs follow-up
5. Assign owners and due dates before leaving the room
6. Follow up bi-weekly until all items closed
