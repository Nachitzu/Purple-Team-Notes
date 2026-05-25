---
title: Attack to Detection Mapping
phase: purple-exercises
platform: multi
tags: [purple-team, attack-to-detection, mapping, ttps]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Attack to Detection Mapping

### Objetivo

Proceso estructurado para convertir técnicas de ataque en reglas de detección funcional, asegurando cobertura bidireccional (offensa → defensa).

### Paso a Paso

```
1. Select TTP (e.g., T1059.003 PowerShell Encoded Command)
2. Document attack chain: how does the technique work?
3. Identify data sources that capture the technique
4. Write detection hypothesis
5. Translate hypothesis to SIEM rule (Sigma/KQL)
6. Test in lab, tune, deploy
7. Verify alert fires in exercise
```

### Mapeo Example

```yaml
TTP: T1059.003 - Windows Command Shell

Attack chain:
1. Attacker sends encoded PowerShell command via phishing
2. Payload decodes and executes in memory
3. Beacon calls back to C2

Data sources:
- Windows Security Event 4688 (process creation)
- Sysmon Event ID 1 (process creation with full command line)
- Windows PowerShell Event 800 (script block logging)

Detection hypothesis:
"If a process named powershell.exe is created with '-enc' 
or '-encodedcommand' in the command line, it's likely encoded 
PowerShell execution."

Sigma rule:
title: Encoded PowerShell
 detection:
   selection:
     Image|endswith: '\powershell.exe'
     CommandLine|contains: '-enc '
   condition: selection
```

### Coverage Matrix

```markdown
| Technique | Data Source | Rule Status | Last Tested | Result |
|-----------|-------------|------------|------------|--------|
| T1059.003 | Sysmon EID 1 | stable | 2026-05-25 | TP |
| T1003.001 | Sysmon EID 10 | stable | 2026-05-25 | TP |
| T1547.001 | Security 4672 | experimental | - | - |
```

### Offense-Defense Correlation

```
Attack phase → Technique → Data Source → Detection Rule
Initial Access → T1566 → Email logs → Email gateway rule
Execution → T1059 → Sysmon 1 → Sigma:PowerShellEnc
Persistence → T1547 → Sysmon 12 → Registry monitoring rule
Lateral Movement → T1021 → Security 4688 → Remote process creation rule
```

### Gaps Analysis

When a TTP is not detected:
1. Identify data source that could see it
2. If data source exists but rule doesn't → create rule
3. If data source doesn't exist → instrument endpoint, then create rule
4. If technique inherently invisible → implement compensating control

### After Action Integration

Exercise result feeds back:
- Detections that worked → document in testing.md
- Detections that failed → add to detection debt backlog
- New coverage gaps → add to coverage matrix
- Hardening recommendations → add to hardening.md
