---
title: Sigma Rules Reference
phase: blue-team
platform: [windows, linux]
tags: [sigma, detection, rules, siem]
risk: high
attack_tactic: TA0002
attack_technique: T1059
data_sources: [windows-security-log, sysmon, linux-audit]
last_review: 2026-05-25
---

# Sigma Rules Reference

### Objetivo

Proveer patrones de reglas Sigma para detección de TTPs en SIEM.

### Creating a Sigma Rule

```yaml
title: Suspicious PowerShell Execution
id: 12345678-1234-1234-1234-123456789012
status: stable
description: Detects PowerShell execution with encoded commands
author: Purple Team
date: 2026-01-15
modified: 2026-05-25
tags:
  - attack.execution
  - attack.t1059
  - detection
level: high
logsource:
  product: windows
  service: sysmon
  category: process_creation
detection:
  selection:
    Image|endswith: '\powershell.exe'
    CommandLine|contains:
      - '-enc '
      - '-encodedcommand '
      - 'FromBase64String'
  condition: selection
fields:
  - ComputerName
  - User
  - CommandLine
falsepositives:
  - Administrative scripts that use encoding
mitre:
  tactics:
    - TA0002
  techniques:
    - T1059
```

### High-Signal Rules

```yaml
# LSASS dump
title: LSASS Access After Logon
id: 00000001-0001-0001-0001-000000000001
status: stable
logsource:
  product: windows
  service: sysmon
detection:
  selection:
    TargetImage|endswith: '\lsass.exe'
    CallTrace|contains: '*dbgcore*'
  condition: selection
level: critical
mitre:
  techniques:
    - T1003
```

### Converting Sigma to SIEM

```bash
# Install sigmac
pip install sigma

# Export to Splunk SPL
sigmac -t splunk -f rules.yml

# Export to Kibana (Lucene)
sigmac -t kibana -f rules.yml

# Export to QRadar AQL
sigmac -t qradar -f rules.yml

# Export to Elastic (EQL)
sigmac -t eql -f rules.yml
```

### One-liners

```bash
# Correlate multiple Sigma rules
sigma convert -t splunk -f *.yml | splunk search

# Validate rule syntax
sigma validate rules/*.yml
```

### Detección y Mitigación

- **Visibilidad:** Sigma rules enable vendor-agnostic detection logic across SIEM platforms.
- **Hardening:** Prioritize rules mapped to MITRE ATT&CK, apply to high-fidelity detections only.

### Validación de Cobertura

- **Prueba técnica:** Run atomic-red-team for TTP and verify Sigma rule fires.
- **Criterio de éxito:** Rule generates alert in SIEM when atomic test executes.
