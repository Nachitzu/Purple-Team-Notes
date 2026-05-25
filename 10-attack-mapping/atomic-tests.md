---
title: Atomic Tests (ATT&CK)
phase: attack-mapping
platform: multi
tags: [atomic-red-team, attck, testing, red-team]
risk: high
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Atomic Tests (ATT&CK)

### Objetivo

Usar Atomic Red Team como repository de pruebas controlladas para validar detecciones contra técnicas reales del framework ATT&CK.

### Getting Started

```bash
# Install Atomic Red Team on Windows (requires admin)
IEX (New-Object Net.WebClient).DownloadString('http://atomicredteam.com/install-atomics.ps1')
Import-Module .\AtomicRedTeam.psd1

# Linux/Mac
bash <(curl -s https://raw.githubusercontent.com/redcanaryco/atomic-red-team/master/instructions/atransfer.md)
```

### Running Atomic Tests

```bash
# List all available tests
Get-AtomicTechnique

# Run a specific test
Invoke-AtomicTest T1003.001

# Cleanup after test
Invoke-AtomicTest T1003.001 -Cleanup

# Run all tests in a category
Invoke-AtomicTechnique -AllCategories

# Run specific test by name
Invoke-AtomicTest -AtomicName "Access LSASS Memory"
```

### Test Coverage Map

```bash
# List tests for specific ATT&CK technique
Invoke-AtomicTest -Atomictechnique T1059.003 -ShowDetails

# Count tests per tactic
(Get-AtomicTechnique).TechniqueName | group | sort count -desc
```

### Executing Tests Safely

```bash
# Check prerequisites before running
Invoke-AtomicTest T1003.001 -GetPrereqs

# Run only if prerequisites met
Invoke-AtomicTest T1003.001 -PromptForPrereqs

# Check if test will run automatically or needs manual check
Invoke-AtomicTest T1003.001 -ShowDetails
```

### Integrating with SIEM Testing

```bash
# Test then immediately check SIEM for alert
Invoke-AtomicTest T1059.003
# THEN: Run SIEM search for encoded PowerShell alerts
# Verify detection within expected MTTD
```

### Mapping Tests to Detections

```
Test → Technique → Data Source → SIEM Rule → Pass/Fail → Coverage Matrix Update
T1003.001 → LSASS Access → Sysmon EID 10 → LSASS_Access_Rule → PASS → Mark D
```

### One-liners

```bash
# Run all Defense Evasion tests
Invoke-AtomicTechnique -Category "Defense Evasion"

# Run all PowerShell tests
Invoke-AtomicTechnique -Category "Execution" | Where-Object {$_.TechniqueName -match "PowerShell"}

# Get test count
(Get-AtomicTechnique).Count
```

### Logging Tests

```bash
# Enable detailed logging when running tests
$VerbosePreference = "Continue"
Invoke-AtomicTest T1003.001 -Verbose

# Output paths for exfiltration simulation
Invoke-AtomicTest T1048 -Cleanup
```

### Detección y Mitigación

- **Visibilidad:** Atomic tests generate realistic artifacts; detection rules should fire during controlled tests.
- **Hardening:** Some atomic tests can be blocked via endpoint hardening (e.g., disable PowerShell v2,Constrained Language).

### Validación de Cobertura

- **Prueba técnica:** Run atomic tests and document detection results.
- **Criterio de éxito:** >90% of tests should generate detectable artifacts given current instrumentation.
