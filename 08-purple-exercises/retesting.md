---
title: Retesting Methodology
phase: purple-exercises
platform: multi
tags: [retesting, purple-team, exercise, validation]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Retesting Methodology

### Objetivo

Establecer proceso de retesting para validar que las correcciones (nuevas reglas, hardening) implementadaspost-ejercicio funcionan correctamente.

### Trigger Conditions for Retest

```
After every Purple Team exercise where TTPs were not detected
After detection rule deployed to production
After significant infrastructure change
After detecting new adversary technique via CTI
Quarterly: Full ATT&CK coverage assessment
```

### Retesting Process

```
1. Identify gap: which TTP was not detected?
2. Root cause analysis: why was it not detected?
3. Implement fix: new rule / hardening / telemetry
4. Validate fix in isolation (lab)
5. Schedule retest window with Blue Team
6. Execute only the TTP(s) that failed
7. Measure: does the detection work now?
8. Document result in coverage matrix
9. If still failing → iterate
```

### Pre-Retest Checklist

```markdown
[ ] Fix implemented (rule, hardening, telemetry)
[ ] Fix tested in lab environment
[ ] No false positives expected at operational level
[ ] Blue Team notified of retest timing
[ ] Kill switch in place if something goes wrong
[ ] Logging/alerting confirmed active
[ ] SIEM query/search ready to execute
[ ] Evidence collection ready (screenshots, logs)
```

### Execution

```bash
# Atomic Red Team for verification
Invoke-AtomicTest -Technique T1003.001 -Studio

# Verify alert
# (wait for MTTD measurement)

# Cleanup
Invoke-AtomicTest -Technique T1003.001 -Cleanup
```

### Acceptance Criteria

```
[ ] Detection rule fires within expected MTTD
[ ] Alert contains sufficient context for investigation
[ ] No more than X false positives per day (predefined threshold)
[ ] Blue Team analyst can act on the alert without additional research
[ ] Playbook correctly documents response steps
```

### Retest Result

```markdown
## Retest #RT-2026-001

Original Exercise: APT29 Emulation Q3
Date: 2026-06-20
Technique: T1003.001 (LSASS Access)
Root Cause: Sysmon EID 10 rule not deployed
Fix #1: Deployed Sysmon config with LSASS monitoring
Fix #2: Created Sigma rule for LSASS access

Result: PASS

MTTD: 45 seconds (target < 5 min)
Alert Quality: High (Contain process, isolate host, preserve evidence)
```

### Documentation

Create a retest report for each retested TTP:
- Original failure date
- Root cause identified
- Fixes applied
- Retest date
- Result (Pass/Fail)
- MTTD achieved
- Notes
