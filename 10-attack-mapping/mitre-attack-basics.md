---
title: MITRE ATT&CK Basics
phase: attack-mapping
platform: multi
tags: [mitre, attack, framework, mapping]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# MITRE ATT&CK Basics

### Objetivo

Proveer una introducción prática al framework MITRE ATT&CK para mapear Técnicas, tácticas y cobertura de detección.

### Estructura del framework

ATT&CK se organiza en:

- **Tácticas (TA.xxx):** Objetivos del atacante (ej: Initial Access, Execution, Persistence)
- **Técnicas (Txxxx):** Cómo el atacante logra el objetivo (ej: T1059 - Command and Scripting Interpreter)
- **Subtécnicas:** Variantes específicas (ej: T1059.001 - PowerShell)
- **Mitigaciones:** Contramedidas propostas
- **Detections:** Cómo identificar la técnica

### Tácticas principales

| ID     | Táctica |
|--------|---------|
| TA0043 | Reconnaissance |
| TA0042 | Resource Development |
| TA0001 | Initial Access |
| TA0002 | Execution |
| TA0003 | Persistence |
| TA0004 | Privilege Escalation |
| TA0005 | Defense Evasion |
| TA0006 | Credential Access |
| TA0007 | Discovery |
| TA0008 | Lateral Movement |
| TA0009 | Collection |
| TA0010 | Exfiltration |
| TA0011 | Command and Control |
| TA0040 | Impact |

### Cómo usar ATT&CK en Purple Team

1. **Mapear tu ejercicios** → Identifica qué técnicas emulas y mapea a ATT&CK
2. **Evaluar cobertura** → Qué técnicas tienes detectadas vs cuáles son gaps
3. **Priorizar improvements** → Detectar gaps de cobertura con mayor impacto
4. **Validar** → Usar Atomic Red Team o Caldera para probar cada técnica

### Comandos útiles

```bash
# Instalar asistente de mapeo
pip install attackcti

# Buscar técnicas por nombre
attackcti get_techniques_by_name "powershell"

# Listar todas las tácticas
attackcti get_tactics

# Buscar técnicas por mitigación
attackcti get_techniques_by_mitigation("M1050")
```

### Cobertura矩阵

Para crear una coverage matrix:

1. Liste todas las técnicas relevantes al negocio
2. Para cada técnica registrar:
   - ¿Existe regla de detección?
   - ¿Qué fuente de datos se usa?
   - ¿Qué MITRE subtechnique aplica?
   - ¿Resultado del último test?

### Referencias

- ATT&CK Navigator: https://attack.mitre.org
- attackcti library: https://github.com/OTRF/attackcti
- Atomic Red Team: https://github.com/redcanaryco/atomic-red-team
