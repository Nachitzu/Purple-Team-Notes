---
title: Governance and Compliance
phase: notes
platform: multi
tags: [governance, compliance, regulation, legal]
risk: medium
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Governance and Compliance

### Objetivo

Consideraciones de gobernanza, regulatory requirements, y legal framework para ejercicios de seguridad ofensiva.

### Authorización

```
MANDATORY before any offensive activity:
[ ] Written scope authorization from asset owner
[ ] Legal review of assessment scope
[ ] Rules of Engagement document explicitly limits impact
[ ] Kill switches defined and tested
[ ] Insurance coverage confirmed (professional liability)
[ ] NDA / confidentiality agreements in place
```

### Key Legal Considerations

```
Computer Fraud and Abuse Act (US): Unauthorized access = crime
GDPR (EU): Data breach notification timelines (72h)
SOX / GLBA: Financial sector data protection requirements
HIPAA: Healthcare data protection
State-level regulations: NY SHIELD Act, California CCPA

International consideration: Countries with strict cyber laws may prosecute even authorized assessors
```

### Compliance Mapping

When building detections:
- Map to regulatory controls (SOC 2, PCI-DSS, ISO 27001)
- Map to NIST CSF functions (Identify, Protect, Detect, Respond, Recover)
- Document how detection supports compliance requirements

### Documentation Requirements

```markdown
Assessment Documentation:
1. Rules of Engagement (RoE) signed by client
2. Scope definition with hard limits (no action outside scope)
3. Communication protocol (who approves what)
4. Incident escalation path
5. Evidence handling (chain of custody for forensic data)
6. Report classification and handling instructions
7. Data retention policy (when to destroy assessment data)
8. Confidentiality agreement
```

### Ethical Considerations

```
- Only test systems in scope (no recon on non-targets)
- Don't exfiltrate real sensitive data (use synthetic data)
- Respect privacy: don't capture personal data beyond what's necessary
- No destructive attacks unless explicitly authorized
- No modification of evidence (your assessment logs must be accurate)
- Be mindful of operations that affect other parties sharing infrastructure
```

### Professional Standards

```
- Follow your certifier's code of ethics (ISC², ISACA, etc.)
- Don't work on systems you don't have explicit permission to test
- Maintain competency (don't assess advanced APT TTPs without expertise)
- Report conflicts of interest
- Protect client confidentiality even after engagement ends
```

### Red Flags (When to Walk Away)

- Client cannot provide written authorization
- Request to "not document" findings
- Pressure to skip certain systems
- Request to use client data in tests
- "Just trust us" without documentation
- Scope that includes production systems without rollback plan
