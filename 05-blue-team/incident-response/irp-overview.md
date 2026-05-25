# IRP Overview

### Objetivo

Marco general del proceso de respuesta ante incidentes (IR) y cómo se estructura un IRP (Incident Response Plan).

### Ciclo IR NIST

- **Preparación:** Herramientas, formación, IR team establecido
- **Detección y análisis:** Identificar, qualify el incidente
- **Contención:** Detener el spread, aislar sistemas affected
- **Erradicación:** Remover al attacker, cerrar vectores
- **Recuperación:** Restore from backup, return to operations
- **Lecciones aprendidas:** Post-incident review, update IRP

### Roles y Responsabilidades

```
IR Lead: Coordina la respuesta, toma decisiones de contención
Security Analysts: Investigación, documentazione, tracking
Forensics Examiner: Colección de evidencia, análisis de memory/disk
Communications Lead: Coordinar kommunikation interna y externa
Legal: Asesoramiento legal, regulatory requirements
Executives: Authorización de contención drástica
```

### Activation Criteria

```
Severity 1 (Critical): Compromised domain admin, active ransomware, breach confirmed
Severity 2 (High): Confirmed malware infection, suspicious lateral movement
Severity 3 (Medium): Investigations requires, possible isolated incident
Severity 4 (Low): Low-risk anomaly, monitoring increased
```

### Escalation Path

```
Tier 1 SOC → Tier 2 Analyst → IR Lead → CISO → CEO/Legal/Authorities
```

### Communication Protocol

- **Internal:** Slack #security-incidents, email to IR team with INC number
- **External:** Only authorized spokespersons, press inquiries → PR team
- **Regulatory:** Notify within 72h for GDPR breach, follow contract SLA for breach notification

### Playbooks

Each incident type should have a dedicated playbook:
- Ransomware response
- Phishing + credential theft
- Data breach
- Insider threat
- DDoS
- Systems + webshell

### Post-Incident

- Timeline de eventos reconstruido
- Lessons learned session within 7 days
- IRP updated with findings
- Detection rules added/modified as needed
