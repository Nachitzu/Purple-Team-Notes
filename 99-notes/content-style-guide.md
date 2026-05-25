---
title: Content Style Guide
phase: notes
platform: multi
tags: [style, writing, content, cheatsheet, guide]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Content Style Guide

### Objetivo

Estandarizar el estilo editorial del repositorio para mantener consistencia, legibilidad y acción ágil.

### File Naming

```
Use kebab-case: ad-enum.md, lsass-access.md, windows-hardening.md
No spaces, no underscores in filenames
Prefer short descriptive names (max 3-4 words)
Pattern: {topic}={subtopic}.md
```

### Frontmatter Headers

```yaml
---
title: [Matching filename with spaces]  # Required
phase: [recon | explotacion | post-explotacion | blue-team | etc]
platform: [linux | windows | cloud | ad | multi]
tags: [sorted, comma-separated, lowercase-with-hyphens]
risk: [low | medium | high | critical]
attack_tactic: [TA####]     # From ATT&CK if applicable
attack_technique: [T#####]  # From ATT&CK if applicable
data_sources: [list of data sources]
last_review: YYYY-MM-DD
---
```

### Heading Hierarchy

```
# H1: Título de la nota (title case, short)
## H2: Sección principal (Objetivo, Comandos, Detección)
### H3: Sub-sección (comandos específicos, filtrar por tipo)
#### H4: Muy específico (un comando exacto, un caso)
```

### Command Blocks

```bash
# Always include explanation comment BEFORE important commands
# Inline comments only when necessary for context

# Bad:
cat /etc/passwd

# Good:
# Read passwd to enumerate users
cat /etc/passwd
```

### Structure Pattern

```
1. Objetivo (what and why in 2 sentences)
2. Requisitos previos (en bullets)
3. Flujo sugerido (numbered steps)
4. Comandos base y One-liners
5. Artefactos e Indicadores (para Blue Team)
6. Detección y Mitigación
7. Validación de Cobertura
```

### Tone and Voice

```
- Direct: "Ejecuta este comando" not "Se recomienda ejecutar"
- Brevity: Don't over-explain; commands speak for themselves
- Spanish preferred for primary content; English labels for commands
- Technical accuracy > length
- Action-oriented: "Usa este comando para" not "Este comando puede ser usado para"
```

### Tag Conventions

```bash
# Format: lowercase, hyphen-separated
# Examples:
tags: [linux, windows, web, blue-team, attck, detection, hardening]

# Always include generic tags:
- phase identifier (recon, explotacion, etc)
- platform (linux, windows, ad, cloud, multi)
- primary technique type (if applicable)
```

### Content Rules

```
- One idea per code block
- Don't paste multi-page logs; show relevant excerpt
- Mark unverified/draft commands as "(DRAFT)"
- Update last_review when content changes
- Cross-link to related notes using relative paths
- Include ATT&CK mapping when applicable
```

### Quality Checklist

```
[ ] Title concise and descriptive
[ ] Frontmatter complete
[ ] Objetivo section present (< 3 sentences)
[ ] Requisitos previos incluye tudo necessary
[ ] Commands have working examples
[ ] Section of detection / mitigation exists
[ ] last_review updated
[ ] No broken cross-links
[ ] Tags appropriate and complete
```
