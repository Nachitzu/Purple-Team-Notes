---
title: Reporting
phase: notes
platform: multi
tags: [reporting, pentest, red-team, purple-team, deliverable]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Reporting

### Objetivo

Guía para estructurar deliverables de assessments y ejercicios purple team que sean accionables.

### Types of Reports

```
Pentest Report:
  Executive Summary (1-2 pages)
  Methodology
  Scope and Limitations
  Findings (severity-rated)
  Recommendations
  Appendix: Commands / Evidence

Purple Team Exercise Report:
  Objectives and Scope
  Participants
  TTPs Executed vs Detected
  MTTD / MTTR Metrics
  Coverage Assessment (ATT&CK matrix)
  Findings
  Recommendations
  Next Steps

CTI Report:
  Actor Profile
  TTPs Used
  IOCs
  Recommended Controls
```

### Finding Severity Ratings

| Rating | Definition |
|--------|------------|
| Critical | Immediate business impact; exploit actively used; no existing control |
| High | Significant impact; specific exploitation path identified |
| Medium | Elevated risk; combined with other factors leads to impact |
| Low | Limited impact; requires specific conditions to exploit |
| Informational | Best practice deviation; no immediate risk; observed anomaly |

### Report Structure (Purple Team Exercise)

```markdown
# Purple Team Exercise Report
## Exercise: APT29 Emulation Q3 2026
## Period: 2026-09-15 to 2026-09-17
## Classification: [Confidential]

### Executive Summary
[2 page summary of objectives, key findings, priority recommendations]

### Exercise Scope
- Systems: [IP ranges, assets]
- Participants: [Red Team, Blue Team]
- TTPs planned: [Count by ATT&CK tactic]

### Quantitative Results
- Detection Rate: 87% (13/15 undetected)
- MTTD: 8 min (target: <15 min)
- MTTR: 45 min (target: <60 min)
- ATT&CK Coverage Before: 52%
- ATT&CK Coverage After: 71%

### Detailed TTP Results
[Table: TTP, Result, MTTD, Notes]

### Findings
[Prioritized list with severity]

### Recommendations
[Prioritized by risk + effort]

### Appendices
- Raw detection results
- Raw logs
- Updated coverage matrix
```

### Audience

```
Executive Summary: CISO, CIO, VP Engineering
Technical Details: Security Team Leads, IR Team
Full Report: Security Engineers, System Administrators
```

### Recommendations Template

```markdown
## Finding #: [Title]
**Severity:** [Critical / High / Medium / Low / Informational]
**Technique:** [ATT&CK Tactic - Technique]
**Affected Systems:** [Scope]
**Evidence:** [Command output / screenshot / log excerpt]
**Business Impact:** [Describe risk to business]
**Recommendation:**
  1. [Immediate action]
  2. [Short-term fix]
  3. [Long-term hardening]
**Effort:** [Low / Medium / High]
**Owner:** [Team / Person]
**Due Date:** [YYYY-MM-DD]
```
