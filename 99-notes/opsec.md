---
title: OPSEC Fundamentals
phase: notes
platform: multi
tags: [opsec, red-team, operational-security, anonymity]
risk: critical
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# OPSEC Fundamentals

### Objetivo

Principios de seguridad operacional que deben seguirse siempre durante exercises rojos y purple team para proteger infrastructure, identidad y operation.

### Core OPSEC Rules

```
1. Never use your real identity in operations
2. Separate op identity from personal identity
3. Never mix bullet-resistant infrastructure with lab/tools
4. Assume all comms are monitored (use OPROXY)
5. Minimize traces left on targets
6. Never keep operationally sensitive data on systems you don't control
```

### Identity Separation

```bash
# nunca usar emails personales o reales para C2, phishing, o infraestructura
# Instead:
- Protonmail / throwaway emails for infrastructure registration
- Virtual phone numbers (TextNow, Google Voice) for 2FA
- Domain registrant privacy (WHOIS guard)
- Dedicated op VPS with crypto or prepaid cards
```

### Network OPSEC

```bash
# Rotation de IPs (VPS en diferentes providers/ubicaciones)
# Proxy chains:
proxychains4.conf → Chains: VPS1:tor → VPS2 → target

# Never directly connect from your real ISP IP
# Use dedicated bullet-resistant VPS for C2 callbacks
# VPN with no-logging policy as additional layer

# MAC address randomization
macchanger -r eth0

# Hostname consistent con entorno legitimate (no "$" in Windows hostnames via DNS)
```

### Operational Hygiene

```bash
# No reusing infrastructure across different clients
# Separate C2 servers for each operation
# Clean up artifacts post-exercise (scheduled + manual verify)
# No persistence left behind (unless explicitly requested in RoE)
# All tools stripped of user-identifying strings before use
```

### Blue Team OPSEC

```bash
# Blue team knowledge of Red Team IOCs debe remain confidential
# Don't document exact Red Team infrastructure (could leak via finding)
# Don't share IOCs outside of secure communication channel
# Alert thresholds should not be communicated to Red Team pre-exercise
```

### Indicator Management

```bash
# IOCs (Indicators of Compromise) vs IOCs (Operator's Common)
# Mantener listas separadas:
# - Internal IOCs (blue team uses to tune rules)—don't share with red team
# - External IOCs (from threat intel)—shared knowledge

# During exercise:
# - Red Team IOCs (C2 domains, hashes) → archivo cerrado, only IR lead has access
# - Red Team never asks Blue Team "am I detected"
```

### C2 OPSEC

```
Bullet-resistant hosting: Known bulletproof providers
 never use: Home connection, shared hosting from providers with abuse teams
 Rotation cadence: Change C2 infrastructure every N days (depends on operation)
 
 Domain Reputation:
 - New domains only (pre-aged preferred)
 - Cheap/throwaway domains avoided (pattern detection)
 - Reverse DNS matching legit organizations
```

### OPSEC Failure Impact

```markdown
OPSEC Failure Consequences:
- Red Team infrastructure burned
- Future assessments compromised (actor knows our TTPs)
- Legal exposure (if identity links to assessment)
- Client relationship damage
- Personal professional consequences
```
