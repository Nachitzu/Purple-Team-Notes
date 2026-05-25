---
title: Actor Profiling
phase: threat-intel
platform: multi
tags: [threat-actor, actor profiling, apt, ct, intelligence]
risk: low
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# Actor Profiling

### Objetivo

Crear perfiles estructurados de threat actors para uso en threat model, selección de ejercicios, y priorización de detecciones.

### Perfil Template

```markdown
# APT29 (Cozy Bear)

## Overview
- Country: Russia
- Ministry: Foreign Intelligence Service (SVR)
- First observed: 2014
- Target sectors: Government, think tanks, NGOs, defense
- Motivation: Espionage

## Known TTPs (ATT&CK)
- Initial Access: T1566.001 (Spearphishing)
- Execution: T1059.003 (PowerShell), T1106 (Native API)
- Persistence: T1097 (Valid Accounts), T1133 (External Remote Services)
- Defense Evasion: T1027 (Obfuscated Files), T1562 (Disable Security Tools)
- C2: T1090 (Proxy), T1104 (Multi-Stage C2)
- Exfiltration: T1041 (Exfil via C2)

## Signature/Attacks
- spearphishing with Microsoft Office documents
- use of CHAINSHOT (malware loader)
- CORESHELL (backdoor)
- TEAPOT (exploit framework)
- Polyglot attacks

## Intent and Motive
Long-term espionage operations; maintaining persistent access to government networks.

## Relevance to our org
HIGH: We operate in government-adjacent sector, similar TTPs likely to be used

## Priority: 1 (Critical)
```

### Key Fields in Profile

```
Identification:
  - Name + alias (APT29, Cozy Bear, The Dukes)
  - Attribution (country, organization)
  - Suspected sponsors (state, criminal, hacktivist)

Capability:
  - sophistication (1-10)
  - TTPs arsenal size
  - Tooling maturity
  - Zero-day capability

Intent:
  - Primary mission (espionage, financial, destructive)
  - Target sectors
  - Geospatial focus

OPPORTUNITY:
  - Attack surface exposed
  - Existing controls gaps
```

### Collecting Intelligence

```bash
# MITRE ATT&CK Groups页面
# https://attack.mitre.org/groups/

# Vendor reports (CrowdStrike, FireEye/Mandiant, Palo Alto Unit 42)
# Paste reports into CTI pipeline

# MISPgalaxies in your TIP
# Importar desde MISP
misp-list-correlazioni
```

### Updating Profiles

```
Trigger events:
- New public report
- Internal incident that matches actor
- Industrypecific alerts
- Quarterly review of active actors

Maintain:
- Last updated date
- Source of intelligence
- Confidence level
- Priority classification
```

### Usage

Perfiles feed into:
- Purple Team exercises planning (select actors for emulation)
- Detection development (priorize rules for relevant TTPs)
- Threat hunting (hypothesis driven by actor TTPs)
- Risk assessment (likelihood × impact for each actor)
