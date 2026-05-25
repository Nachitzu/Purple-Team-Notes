---
title: Detection Testing Methodology
phase: blue-team
platform: multi
tags: [detection, testing, atomic-red-team, red-team, purple-team]
risk: high
attack_tactic: TA0007
attack_technique: T1070
data_sources: [siem, edr, endpoint]
last_review: 2026-05-25
---

# Detection Testing Methodology

### Objetivo

Establecer metodología para probar reglas de detección de forma controlada, reproducible y segura.

### Integration con Purple Team

La prueba de detecciones es el puente natural entre Red Team (ejecuta ataques) y Blue Team (valida visibilidad).

### Atomic Red Team (ATT&CK simulation)

```bash
# Install Atomic Red Team
IEX (New-Object Net.WebClient).DownloadString('http://atomicredteam.com/install-atomics.ps1')
Import-Module ./AtomicRedTeam.psd1

# List available atomic tests
Get-AtomicTechnique -Actions

# Invoke specific atomic test
Invoke-AtomicTest -Technique T1003.001 -Studio

# Cleanup after test
Invoke-AtomicTest -Technique T1003.001 -Cleanup
```

### Testing Pipeline

```
1. Select atomic test / create custom attacker simulation
2. Execute in ISOLATED LAB environment (no production impact)
3. Wait for detection output (SIEM/EDR)
4. Verify: Did the correct alert fire? What was the latency?
5. Tune: Adjust rule to reduce false positives or increase fidelity
6. Document: Update rule metadata with test results
7. Promote: Move to production if criteria met
```

### Categories of Test Results

| Result | Meaning |
|--------|---------|
| TP (True Positive) | Alert fires with correct rule |
| FP (False Positive) | Alert fires but no attack |
| TN (True Negative) | No alert, no attack (expected) |
| FN (False Negative) | Attack executes without alert |

### Test Matrix

Create a spreadsheet:

| Technique | Atomic Test | Detection Rule | Expected Alert | Actual Result | MTTD |
|-----------|-------------|----------------|----------------|---------------|------|
| T1059.003 | atomic-test-powershell | Sigma - PowerShell encoded | PowerShell script block alert | TP | < 5min |
| T1003.001 | atomic-test-lsass | Rule LSASS Access | Sysmon EID 10 alert | FN | N/A |

### One-liners

```bash
# Run detection test via Caldera (autonomous)
python caldera.py -A "stockpile linux ping" -d 30

# Check testing coverage
grep -r "atomic_test" detections/ | wc -l
```

### Continuous Validation

- Schedule detection tests via CI/CD pipeline (weekly)
- Integrate with security maturity metrics (see metrics-maturity.md)
- Run ATT&CK Caldera assessments quarterly
