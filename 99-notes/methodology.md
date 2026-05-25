---
title: Methodology
phase: notes
platform: multi
tags: [methodology, process, purple-team, operations]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Methodology

### Objetivo

Establecer los principios fondamentamentales y metodología que guían todo el repositorio.

### Core Principles

1. **Brevedad accionable** — Cada nota debe poder leerse en menos de 2 minutos y ejecutarse en el momento necesario.

2. **Offense meets Defense** — Ninguna nota ofensiva existe sin su contraparte de detección o hardening. El objetivo es cerrar el ciclo.

3. **MITRE ATT&CK como lenguaje común** — Toda técnica se mapea a ATT&CK para permitir conversación estructurada entre equipos.

4. **Lab-validated** — Los comandos deben probarse en laboratorio autorizado antes de incluirse. Marqu明的como "borrador" los no probados.

5. **Mantener y hacer crecer** — El repositorio es vivo. Después de cada ejercicio, cada detección exitosa o fallida, actualizar las notas correspondientes.

### Flujo de Contenido

```
CTI Report / New Vulnerability
    ↓
Analyze → Extract TTPs / IOCs / Techniques
    ↓
Map to ATT&CK
    ↓
Create or update cheat sheet (offensive note)
    ↓
Create or update detection rule (defensive note)
    ↓
Test in lab (Atomic / manual)
    ↓
Deploy to production
    ↓
Post Purple Team Exercise → Lessons Learned → Update Notes
    ↓
Validate Coverage Matrix
```

### Interaction Between Teams

```
Red Team: Ejecuta técnicas, documenta tooling y metodología
Blue Team: Crea detecciones, valida cobertura, responde
Purple Team: Conecta ambos mundos, mide efectividad, guía ejercicios
```

### Naming Conventions

```
archivos: kebab-case (ad-enum.md, lsass-access.md)
directorios: números de serie + nombre (01-recon, 05-blue-team)
Reglas: identificador único + nombre (Sigma-0001-SuspiciousPowerShell)
```

### Quality Bar

```
Para cada cheatsheet:
[ ] Título descriptivo y único
[ ] Frontmatter con todos los campos requeridos
[ ] Sección de requisitos previos
[ ] Comandos probados o marcados como draft
[ ] Sección de detección关联
[ ] Referencias a ATT&CK y data sources
[ ] Última revisión feta
```
