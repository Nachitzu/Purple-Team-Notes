# Purple-team-notes

Repositorio centralizado de cheatsheets en Markdown para operaciones de red team, blue team y ejercicios purple team. El contenido está organizado por fase, tecnología, plataforma y caso de uso para facilitar la búsqueda y ejecución rápida.

## Vista
https://nachitzu.github.io/Purple-Team-Notes/

### Objetivo

Proveer una base de conocimiento mantenible, operativa y reutilizable. El enfoque principal es conectar la visibilidad defensiva con la ejecución ofensiva, asegurando que cada técnica tenga una contramedida o método de detección asociado.

### Principios de uso

- Uso exclusivo para laboratorios, entornos propios y auditorías con autorización explícita.
- El contenido debe ser breve, práctico y altamente accionable.
- Cada técnica debe mapearse al framework MITRE ATT&CK cuando sea posible.
- Toda nota ofensiva debe incluir su contraparte de detección o hardening.
- Las iteraciones del repositorio deben nacer de resultados de validaciones o retesting.

### Estructura Principal

- **01 a 04:** Fases ofensivas (Recon, Exploración, Explotación, Post-explotación).
- **05:** Capacidades defensivas (Blue team, Detección, Respuesta, Hardening).
- **06 y 07:** Herramientas y comandos de un solo uso (One-liners).
- **08 a 10:** Operaciones Purple Team (Ejercicios, Inteligencia de Amenazas, Mapeo).

### Estructura de directorios

```
00-template/          Plantillas (cheat-sheet, detection, exercise, incident)
01-recon/            Reconocimiento (passive, active, DNS, subdomains, OSINT)
02-exploracion/      Exploración (port scanning, web, SMB, LDAP, AD)
03-expletacion/      Explotación (web, file-upload, LFI/RFI, SQLi, XSS, AD)
04-post-explotacion/ Post-explotación (linux privesc, windows privesc, creds, pivivot)
05-blue-team/        Blue team (eventos, Sysmon, logs, Sigma, YARA, hunting, IR)
06-oneliners/        Comandos rápidos (bash, powershell, python, jq, awk)
07-tools/            Guías de herramientas (nmap, ffuf, netexec, impacket, burp)
08-purple-exercises/ Ejercicios purple team (framework, planning, AAR)
09-threat-intel/     Threat intelligence (CTI, adversary emulation)
10-attack-mapping/   Mapeo ATT&CK (tácticas, técnicas, coverage matrix)
99-notes/            Notas misceláneas (methodology, opsec, metrics)
```

### Cómo contribuir

1. Crea o actualiza una cheatsheet dentro del directorio correspondiente.
2. Utiliza siempre la plantilla oficial ubicada en `00-template/cheat-sheet-template.md`.
3. Añade ejemplos mínimos, comandos probados y una explicación corta.
4. Incluye métricas de cobertura y referencias a fuentes de telemetría reales.
5. Mapea cada técnica a MITRE ATT&CK cuando sea posible.
