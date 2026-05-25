---
title: CTI to TTPs
phase: threat-intel
platform: multi
tags: [cti, threat-intelligence, ttps, analyst, attck]
risk: medium
attack_tactic: TA0000
attack_technique: T0000
data_sources: []
last_review: 2026-05-25
---

# CTI to TTPs

### Objetivo

Metodología para convertir reportes de Threat Intelligence (CTI) en TTPs accionables para detección, hunting y ejercicios.

### Procesode Conversión

```
1. Read the CTI report (Mitre, vendor report, threat brief)
2. Identify the ATT&CK technique mapping
3. Extract IOCs (IPs, domains, hashes, patterns)
4. Understand the attack chain (kill chain)
5. Select applicable TTPs 
6. Write detection rule or hunting query
7. Add to exercise plan or detection backlog
```

### Framework de Mapeo

```
Kill Chain段階 → ATT&CK Tactic → ATT&CK Technique

Reconn → TA0043 (Reconnaissance)
Weaponize → TA0002 (Execution), TA0003 (Persistence)
Deliver → TA0001 (Initial Access)
Exploit → TA0004 (Privilege Escalation)
C2 → TA0011 (Command and Control)
Actions → TA0010 (Exfiltration)
```

### Example: APT29 Report

```markdown
# APT29 usando Spear-phishing con attachment malicioso
# Attachment ejecuta macro que descargar Beacon

Kill chain映射:
Deliver: T1566.001 (Spearphishing Attachment)
Execution: T1059.003 (Windows Command Shell via macro)
C2: T1090 (Proxy)
Exfil: T1041 (Exfiltration via C2)

IOCs:
- hash: a1b2c3d4...
- domain: apt29.bad actor.com
- IP: 1.2.3.4
```

### Actionable Outputs

```yaml
Detection Rule:
  name: APT29 Macro Download
  technique: T1059.003
  источник: sysmon EventID 1
  hypothesis: "Office process spawning powershell with downloadstring"
  status: Experimental

Hunting Query:
  name: APT29 C2 Beacon
  technique: T1099
  query: "Network connections to apt29.* domains"

Exercise:
  TTPs: [T1566.001, T1059.003]
  objectives: "Validate detection of APT29 initial access chain"
```

### TIP Integration

```bash
# MISP (threat intelligence platform)
# Pull CTI from MISP, auto-convert to Sigma rules
# Example MISP event to detection pipeline

# OTX (AlienVault)
# Pulses include ATT&CK mapping
# Auto INGEST into SIEM
```

### Priorización

Priorize CTI-driven TTPs by:
- Relevance to your industry/organization
- Active exploitation in your sector (西门子,卫生)
- Existing coverage (do you already have detection?)
- Feasibility (can you emulate/test it?)
