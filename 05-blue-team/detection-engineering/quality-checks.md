---
title: Detection Rule Quality Checks
phase: blue-team
platform: multi
tags: [detection, quality, sigma, validation]
risk: medium
attack_tactic: TA0007
attack_technique: T1070
data_sources: []
last_review: 2026-05-25
---

# Detection Rule Quality Checks

### Objetivo

Checklist para validar que una regla de detección está lista para pasar a producción.

### Pre-Production Checklist

```
[ ] Title is unique and descriptive (no duplicates)
[ ] Status is correctly set (experimental/stable/deprecated)
[ ] Description explains the what, why, and security context
[ ] Author and date recorded
[ ] MITRE mapping is accurate (tactic + technique + subtechnique)
[ ] Tags are correctly applied
[ ] logsource.product and logsource.service correctly specified
[ ] detection.selection fields exist in target log source
[ ] condition logic is correct (AND/OR/NOT properly applied)
[ ] level is appropriate (informational → critical)
[ ] falsepositives documented (at least 2 known)
[ ] tested in lab environment
[ ] false positive rate < 10%
[ ] no duplicate of existing rule
[ ] mapped to playbook
[ ] runbook attached or linked
```

### Field Validation

```bash
# Test field existence with sigmac dry-run
sigmac --dry-run -t splunk rules/myrule.yml

# Validate YAML syntax
python -c "import yaml; yaml.safe_load(open('rules/myrule.yml'))"

# Ensure no syntax errors
sigma validate rules/
```

### False Positive Scenarios to Test

```
[ ] Normal administrator activity
[ ] Automated patching/maintenance tools
[ ] Expected scheduled tasks
[ ] Legitimate software installations
[ ] Emergency break-glass procedures
[ ] Off-domain or workgroup machines
[ ] Service accounts running expected scripts
```

### Maintenance Schedule

```
Monthly: Review detection hit rate, adjust thresholds
Quarterly: Full review of all stable rules
On-event: Update after new TTPs or vulnerability disclosures
Bi-annual: Re-test all rules against updated ATT&CK
```

### Deprecation Criteria

- Alert rate falls below threshold (noise)
- Technique no longer relevant to threat landscape
- False positive rate too high to tune
- Target log source deprecated
- Successfully replaced by higher-fidelity rule
