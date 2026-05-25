---
title: ATT&CK Coverage Matrix
phase: attack-mapping
platform: multi
tags: [mitre, coverage, matrix, detection, attck]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# ATT&CK Coverage Matrix

### Objetivo

Mantener un matrix de cobertura que muestre qué técnicas tienen detección activa, cuáles están cubiertas parcialmente, y cuáles son gaps.

### Matrix Structure

```markdown
| Technique | Sub-technique | Data Source | Detection Status | Last Tested | Notes |
|-----------|--------------|-------------|-----------------|-------------|-------|
| T1059.003 | Windows Command Shell | Sysmon EID 1 | D | 2026-05-25 | Sigma rule #1234 |
| T1003.001 | LSASS Access | Sysmon EID 10 | D | 2026-05-25 | - |
| T1547.001 | Registry Run Keys | Sysmon EID 12 | P | - | need tuning |
| T1021.004 | Remote SSH | Linux auditd | - | - | Gap |
```

Coverage Status:
- **D** = Detected (rule in production, tested)
- **P** = Partially covered (some logs exist, no comprehensive rule)
- **-** = Gap (no visibility or rule)

### Coverage Statistics

```bash
# Calculate coverage
Total techniques in scope: X
Detected (D): Y (Y/X%)
Partially Covered (P): Z (Z/X%)
Gaps (-): W (W/X%)

Target: >80% D, <10% P, <10% gaps
```

### Filling Gaps Process

```
1. List all gaps (-) por orden de prioridad
   Priority factors:
   - Technique is used by relevant threat actors
   - Technique affects critical systems
   - Mitigation exists and is practical

2. For each gap:
   a. Identify data source
   b. If data source exists → write rule
   c. If data source doesn't exist → instrument, then write rule
   d. If technique can't be detected → compensating control

3. Set target date per gap

4. Quarterly review of matrix
```

### Coverage by Tactic

```markdown
Initial Access: 2/5 D, 2/5 P, 1/5 gaps
Execution: 4/8 D, 2/8 P, 2/8 gaps
Persistence: 3/7 D, 2/7 P, 2/7 gaps
Privilege Escalation: 2/6 D, 1/6 P, 3/6 gaps
...
```

### Tooling

```bash
# ATT&CK coverage visualizer
# https://mitre-attack.github.io/attack-navigator/

# import matrix JSON:
# Export to Excel for tracking

# attackcti for program generation
from attackcti import attack_client
attack_client = AttackClient()
attack_client.get_techniques_by_domain("enterprise")
```

### Integration with Exercises

```
Before exercise: Review matrix, identify low-coverage tactics
During exercise: Focus TTPs on gaps
After exercise: Update matrix, mark newly covered techniques

Goal: Every Purple Team exercise improves coverage matrix
```

### Reporting

Include in quarterly security metrics:
- Coverage % by tactic
- Number of new detections added
- Number of gaps closed
- Coverage trend over time
