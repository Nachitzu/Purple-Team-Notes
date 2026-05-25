---
title: Adversary Emulation
phase: threat-intel
platform: multi
tags: [adversary-emulation, apt, red-team, caldera, attck]
risk: high
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Adversary Emulation

### Objetivo

Emular actores de amenazas específicos para crear ejercicios representativos y validar detecciones contra TTPs reales usados por atacantes reales.

### Popular APT Profiles

```bash
# Caldera (MITRE)
# Install Caldera
python3 -m pip install crydetect
# Agents pre-built for APT profiles

# Atomic Red Team mapped to APT groups
# https://github.com/redcanaryco/atomic-red-team/blob/master/instructions/atransfer.md
```

### Emulation Plans

```markdown
# APT29 Emulation Plan
## Objetivo
Validar detección de initial access + execution chain

## TTPs a ejecutar
T1566.001 - Spearphishing Attachment
T1059.003 - PowerShell Encoded Command
T1090 - Proxy (C2 callback)

## Infrastructure
C2: Covenant (licit for authorized assessment)
Staging: attacker-controlled domain

## Timing
Day 1: Recon + phishing
Day 2: Initial access + C2 establishment
Day 3: Lateral movement + data collection
```

### Selecting emulated actor

Criteria:
- Industry relevance (APT41 for tech, FIN7 for retail)
- Geographic relevance (APT32 for SEA operations)
- TTPs used that match your threat model
- Availability ofpublic documentation and tooling

### Tools for Emulation

```bash
# Caldera (autonomous C2)
python agent.py --ip 10.0.0.1 --port 7770

# MITRE ATT&CK Workbench
#自定义 adversary profile

# Endgame RTA (Ruby scripts)
git clone https://github.com/endgameinc/RTA.git
```

### Planning Emulation

```markdown
1. Define objective: ¿Qué queremos probar?
2. Select adversary: based on CTI
3. Map TTPs: ATT&CK techniques for that actor
4. Plan phased execution: don't run all at once
5. Coordinate with Blue Team: informar timing
6. Execute and observe: document results
7. Debrief: lessons learned
```

### Detección y Mitigación

- **Visibilidad:** Emulation is meant to test detection; if adversary is correctly emulated, it should generate alerts if detection exists.
- **Hardening:** Emulation results directly feed hardening plan.

### Validación de Cobertura

- **Prueba técnica:** Emulate APT29 and verify detection rate.
- **Criterio de éxito:** Detection rate should match or exceed pre-defined threshold for that actor's TTPs.
