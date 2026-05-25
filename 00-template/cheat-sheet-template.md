---
title: [Nombre de la técnica o herramienta]
phase: [recon | explotacion | post-explotacion | blue-team]
platform: [linux | windows | cloud | ad | multi]
tags: [tag1, tag2]
risk: [low | medium | high | critical]
attack_tactic: [Ej: TA0002]
attack_technique: [Ej: T1059]
data_sources: [Ej: sysmon, zeek, aws-cloudtrail]
last_review: YYYY-MM-DD
---

# [Título de la Cheatsheet]

### Objetivo

[Describe brevemente qué resuelve esta nota y en qué contexto específico debe utilizarse.]

### Requisitos previos

- [Acceso necesario, ej: credenciales de usuario raso]
- [Herramientas requeridas, ej: Impacket, Nmap]
- [Permisos o alcance autorizado]

### Flujo de ejecución sugerido

1. [Paso inicial de preparación]
2. [Ejecución de la técnica]
3. [Validación del resultado o siguiente pivote]

### Comandos base y One-liners

```bash
# Explicación del comando
comando --flag1 valor --flag2
```

### Artefactos e Indicadores (Blue Team)

- **Logs:** [Rutas de archivos de log o IDs de eventos, ej: EVID 4624]
- **Archivos:** [Archivos creados o modificados]
- **Red:** [Puertos inusuales, user-agents, volúmenes de tráfico]

### Detección y Mitigación

- **Visibilidad:** [Cómo observar esta actividad desde el SIEM o EDR]
- **Hardening:** [Configuraciones para bloquear la técnica]

### Validación de Cobertura

- **Prueba técnica:** [Cómo simular esto de forma segura (Ej: Atomic Red Team)]
- **Criterio de éxito:** [Qué regla o alerta debe dispararse para considerar la prueba exitosa]
