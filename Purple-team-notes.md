# Purple-team-notes

Repositorio de cheatsheets en Markdown organizadas por fase para operaciones de **purple team**, con foco práctico en red team, blue team, detección, respuesta y ejercicios colaborativos. La idea es construir una base mantenible, operativa y reutilizable: una HackTricks personalizada que después pueda publicarse también como sitio web en HTML, CSS con Tailwind y JavaScript.

## Objetivo

Centralizar conocimiento útil para:

- Reconocimiento y enumeración.
- Exploración y validación de superficie de ataque.
- Explotación y post-explotación.
- Persistencia, movimiento lateral y evasión.
- Detección, hunting, hardening y respuesta.
- Ejercicios purple team basados en TTPs.
- Ingeniería de detecciones.
- Threat intelligence aplicada.
- Métricas, cobertura y madurez.
- Comandos rápidos y recetas reutilizables.

## Enfoque del repositorio

Este repositorio debe priorizar:

- Cheatsheets breves, accionables y orientadas a ejecución.
- Ejemplos reproducibles en laboratorios autorizados.
- Notas separadas por tecnología, fase y sistema operativo.
- Formato homogéneo para facilitar búsqueda y mantenimiento.
- Etiquetado claro de contexto, riesgo y prerequisitos.
- Relación explícita entre técnica ofensiva, visibilidad defensiva y remediación.
- Trazabilidad de contenido hacia ATT&CK, hunting, detección y respuesta.

## Alcance recomendado

### Red team

- Recon externo.
- Recon interno.
- Enumeración de servicios.
- Web pentest.
- Active Directory.
- Linux.
- Windows.
- Cloud.
- Contenedores.
- Post-explotación.
- Movimiento lateral.
- Exfiltración simulada.
- OPSEC básica.

### Blue team

- Detección por fuente de log.
- Investigación inicial.
- Threat hunting.
- IOC y artefactos por plataforma.
- Hardening rápido.
- Casos de uso SIEM.
- Reglas Sigma/YARA.
- Respuesta ante incidentes.
- Triage de endpoints.
- Validación de cobertura.

### Purple team

- Planeación de ejercicios.
- Mapeo a MITRE ATT&CK.
- Emulación de adversarios.
- Medición de cobertura.
- Retesting y mejora continua.
- Priorización entre ofensiva, detección y respuesta.

## Estructura sugerida

```text
Purple-team-notes/
├── README.md
├── 00-template/
│   ├── cheat-sheet-template.md
│   ├── detection-template.md
│   ├── exercise-template.md
│   └── incident-template.md
├── 01-recon/
│   ├── passive-recon.md
│   ├── active-recon.md
│   ├── dns.md
│   ├── subdomains.md
│   ├── osint.md
│   └── screenshots.md
├── 02-exploracion/
│   ├── port-scanning.md
│   ├── web-enum.md
│   ├── smb-enum.md
│   ├── ldap-enum.md
│   ├── snmp-enum.md
│   ├── ftp-ssh-rdp-winrm.md
│   └── ad-enum.md
├── 03-explotacion/
│   ├── web-common.md
│   ├── file-upload.md
│   ├── lfi-rfi.md
│   ├── sqli.md
│   ├── xss.md
│   ├── deserialization.md
│   └── ad-abuse.md
├── 04-post-explotacion/
│   ├── linux-privesc.md
│   ├── windows-privesc.md
│   ├── credentials.md
│   ├── pivoting-tunneling.md
│   ├── persistence.md
│   ├── lateral-movement.md
│   └── data-collection.md
├── 05-blue-team/
│   ├── windows-events.md
│   ├── sysmon.md
│   ├── linux-logs.md
│   ├── web-logs.md
│   ├── sigma-rules.md
│   ├── yara.md
│   ├── triage.md
│   ├── threat-hunting.md
│   ├── hardening.md
│   ├── incident-response/
│   │   ├── irp-overview.md
│   │   ├── ransomware-playbook.md
│   │   ├── credential-compromise.md
│   │   └── webshell-playbook.md
│   └── detection-engineering/
│       ├── lifecycle.md
│       ├── quality-checks.md
│       ├── testing.md
│       └── detection-debt.md
├── 06-oneliners/
│   ├── bash.md
│   ├── powershell.md
│   ├── python.md
│   ├── jq.md
│   └── awk-sed-grep.md
├── 07-tools/
│   ├── nmap.md
│   ├── rustscan.md
│   ├── ffuf.md
│   ├── feroxbuster.md
│   ├── netexec.md
│   ├── impacket.md
│   ├── bloodhound.md
│   ├── burp.md
│   ├── responder.md
│   └── volatility.md
├── 08-purple-exercises/
│   ├── framework.md
│   ├── planning.md
│   ├── attack-to-detection.md
│   ├── after-action-review.md
│   └── retesting.md
├── 09-threat-intel/
│   ├── cti-to-ttp.md
│   ├── adversary-emulation.md
│   ├── actor-profiling.md
│   └── prioritization.md
├── 10-attack-mapping/
│   ├── mitre-attack-basics.md
│   ├── tactic-technique-index.md
│   ├── coverage-matrix.md
│   └── atomic-tests.md
└── 99-notes/
    ├── methodology.md
    ├── reporting.md
    ├── opsec.md
    ├── governance.md
    ├── metrics-maturity.md
    ├── web-architecture.md
    └── content-style-guide.md
```

## Bloques nuevos que conviene agregar

### `08-purple-exercises/`

Para documentar ejercicios purple team de punta a punta:

- Planeación.
- Objetivos y alcance.
- Técnicas ATT&CK cubiertas.
- Hipótesis de detección.
- Resultados.
- Hallazgos.
- Retesting.

### `05-blue-team/detection-engineering/`

Para tratar las detecciones como producto mantenible:

- Ciclo de vida de reglas.
- Criterios de calidad.
- Fuentes de telemetría.
- Casos de prueba.
- Versionado.
- Gestión de deuda técnica de detecciones.

### `09-threat-intel/`

Para conectar inteligencia con ejecución:

- Cómo pasar de un reporte de CTI a TTPs accionables.
- Cómo priorizar actores o técnicas.
- Cómo transformar IOCs en hunting y detección.
- Cómo convertir CTI en escenarios purple team.

### `05-blue-team/incident-response/`

Para incorporar playbooks de respuesta:

- Preparación.
- Detección y análisis.
- Contención.
- Erradicación.
- Recuperación.
- Lecciones aprendidas.

### `10-attack-mapping/`

Para relacionar el contenido con MITRE ATT&CK:

- Índice por táctica.
- Índice por técnica.
- Cobertura actual.
- Gaps de validación.
- Atomic tests o pruebas controladas.

### `99-notes/metrics-maturity.md`

Para medir si el repositorio y los ejercicios realmente mejoran capacidades:

- Cobertura ATT&CK.
- TTPs emuladas vs detectadas.
- Tiempo de detección.
- Tiempo de respuesta.
- Porcentaje de reglas testeadas.
- Evolución por trimestre o sprint.

## Convención para cada cheatsheet

Cada archivo puede seguir esta plantilla:

```md
# Título

## Objetivo
Qué resuelve esta nota y en qué contexto usarla.

## Requisitos
- Acceso necesario
- Herramientas
- Permisos / alcance autorizado

## Mapping
- ATT&CK tactic:
- ATT&CK technique:
- Data sources:
- Plataformas:

## Checklist rápida
- Qué validar primero
- Qué evidencia guardar
- Qué errores evitar

## Comandos base
```bash
# ejemplos
```

## One-liners
```bash
# one-liners cortos y reutilizables
```

## Flujo sugerido
1. Paso inicial.
2. Validación.
3. Siguiente pivote.

## Artefactos / Indicadores
- Logs
- Archivos
- Eventos

## Detección / Mitigación
- Qué ver desde blue team
- Cómo contener o endurecer

## Validación
- Cómo probar que la técnica funcionó
- Cómo verificar si fue detectada

## Referencias internas
- Enlaces a otros markdown del repo
```
```

## README principal sugerido

El `README.md` puede incluir:

```md
# Purple-team-notes

Cheatsheets Markdown para red team, blue team y ejercicios purple team, organizadas por fase, tecnología, plataforma y caso de uso.

## Contenido
- Recon
- Exploración
- Explotación
- Post-explotación
- Blue team
- One-liners
- Herramientas
- Purple exercises
- Threat intelligence
- ATT&CK mapping
- Métricas y gobernanza

## Principios
- Solo para laboratorios y entornos autorizados.
- Contenido breve, práctico y actualizable.
- Cada nota debe incluir contexto operativo y visibilidad defensiva.
- Las técnicas deben mapearse a ATT&CK cuando sea posible.
- Toda mejora idealmente termina en validación o retesting.

## Cómo contribuir
1. Crear o actualizar una cheatsheet.
2. Seguir la plantilla oficial.
3. Añadir ejemplos mínimos y explicación corta.
4. Incluir notas de detección si aplica.
5. Mapear ATT&CK y fuentes de datos si aplica.
6. Añadir notas de validación o cobertura cuando corresponda.
```

## Índice de contenido prioritario

Orden sugerido para poblar el repositorio:

1. `01-recon/dns.md`
2. `01-recon/subdomains.md`
3. `02-exploracion/port-scanning.md`
4. `02-exploracion/web-enum.md`
5. `02-exploracion/smb-enum.md`
6. `02-exploracion/ad-enum.md`
7. `03-explotacion/web-common.md`
8. `04-post-explotacion/linux-privesc.md`
9. `04-post-explotacion/windows-privesc.md`
10. `04-post-explotacion/credentials.md`
11. `05-blue-team/windows-events.md`
12. `05-blue-team/sysmon.md`
13. `05-blue-team/threat-hunting.md`
14. `05-blue-team/detection-engineering/lifecycle.md`
15. `05-blue-team/incident-response/irp-overview.md`
16. `06-oneliners/bash.md`
17. `06-oneliners/powershell.md`
18. `07-tools/nmap.md`
19. `07-tools/ffuf.md`
20. `07-tools/netexec.md`
21. `07-tools/impacket.md`
22. `08-purple-exercises/framework.md`
23. `09-threat-intel/adversary-emulation.md`
24. `10-attack-mapping/coverage-matrix.md`
25. `99-notes/methodology.md`
26. `99-notes/metrics-maturity.md`
27. `99-notes/web-architecture.md`

## Estilo editorial recomendado

- Un archivo por tema.
- Títulos directos y orientados a tarea.
- Explicación mínima antes de comandos.
- Bloques separados por sistema operativo o contexto.
- Comandos probados o claramente marcados como borrador.
- No mezclar teoría extensa con operación práctica.
- Agregar una sección defensiva siempre que sea posible.
- Mantener cross-links entre notas ofensivas, defensivas y de validación.

## Metadatos útiles por archivo

Se puede agregar una cabecera corta al inicio de cada nota:

```yaml
---
title: smb-enum
phase: exploracion
platform: [linux, windows]
tags: [smb, enum, ad]
risk: medium
attack_tactic: discovery
attack_technique: T1135
data_sources: [sysmon, security-events, zeek]
last_review: 2026-05-25
---
```

## Ideas de categorías extra

- `mobile/`
- `wireless/`
- `ics/`
- `malware-analysis/`
- `forensics/`
- `detection-engineering/`
- `ctf-labs/`
- `cloud-detection/`
- `saas/`

## Web del proyecto

Además del repositorio Markdown, el contenido puede vivir en una página web estática para facilitar búsqueda, navegación y lectura.

### Stack recomendado

- HTML semántico.
- CSS con Tailwind.
- JavaScript vanilla o modular.
- Contenido en Markdown transformado o precargado.
- Sitio estático sin backend para una primera versión.

### Objetivo de la web

Construir una interfaz para:

- Navegar por fase, plataforma, táctica o herramienta.
- Buscar cheatsheets rápidamente.
- Filtrar por red team, blue team o purple team.
- Ver relaciones entre ATT&CK, detecciones y notas.
- Leer Markdown renderizado con buena UX.
- Mantener un look técnico, limpio y rápido.

## Arquitectura recomendada para la web

Sí, se puede usar arquitectura hexagonal incluso en un proyecto pequeño como este, y si el objetivo es mantener orden, escalabilidad y separación del dominio, conviene preferirla desde el inicio, pero de forma ligera.

### Cómo aplicarla sin sobre-ingeniería

Separar el proyecto web en:

- **Dominio**: entidades como `Note`, `Tag`, `Technique`, `Phase`, `Tool`, `Detection`, `Exercise`.
- **Aplicación**: casos de uso como `GetAllNotes`, `SearchNotes`, `FilterByTechnique`, `GetRelatedNotes`, `RenderMarkdownNote`.
- **Puertos**: interfaces para repositorios y renderizadores.
- **Adaptadores**: lectura de archivos JSON/Markdown, router del navegador, UI, buscador local.
- **Infraestructura**: fetch de archivos, parser Markdown, almacenamiento en memoria, índices de búsqueda.

### Estructura sugerida para el sitio

```text
web/
├── purple-team-notes.html
├── assets/
│   ├── css/
│   ├── js/
│   └── icons/
├── content/
│   ├── notes/
│   └── metadata/
└── src/
    ├── domain/
    │   ├── entities/
    │   └── value-objects/
    ├── application/
    │   ├── use-cases/
    │   └── ports/
    ├── adapters/
    │   ├── ui/
    │   ├── repositories/
    │   ├── markdown/
    │   └── routing/
    └── infrastructure/
        ├── data/
        ├── search/
        └── config/
```

### Regla práctica

Si el proyecto nace como un simple viewer de Markdown, usa hexagonal mínima:

- Dominio pequeño.
- Casos de uso claros.
- Un repositorio de notas.
- Adaptador UI.
- Adaptador de lectura de contenido.

Si luego crece con búsqueda avanzada, filtros ATT&CK, grafo de relaciones, favoritos, versionado o generador estático, esa separación ya te deja bien posicionado.

### Decisiones útiles para esta primera versión

- Guardar metadatos de cada nota en frontmatter o JSON.
- Generar un índice global de notas.
- Renderizar Markdown en una vista principal.
- Usar un router por hash o estado interno.
- Implementar filtros por fase, plataforma, tags y ATT&CK.
- Dejar la UI desacoplada del origen de datos.

## Estilo de producto web sugerido

- Visual sobrio, técnico y oscuro/claro.
- Sidebar con navegación por fases.
- Barra de búsqueda prominente.
- Tarjetas o listas compactas.
- Panel principal para lectura.
- Chips para tags, plataformas y ATT&CK.
- Sección de notas relacionadas.

## Seguridad y ética

Este repositorio y su futura web deben usarse únicamente en entornos propios, de laboratorio o con autorización explícita. El contenido debe priorizar documentación, metodología, detección, validación y administración de conocimiento, evitando instrucciones orientadas a abuso fuera de contexto autorizado.

## Siguiente paso sugerido

Crear primero:

- `README.md`
- `00-template/cheat-sheet-template.md`
- `00-template/exercise-template.md`
- `05-blue-team/detection-engineering/lifecycle.md`
- `08-purple-exercises/framework.md`
- `09-threat-intel/adversary-emulation.md`
- `10-attack-mapping/coverage-matrix.md`
- `99-notes/web-architecture.md`

Después, montar la primera versión del sitio estático con HTML, Tailwind y JavaScript alrededor de ese contenido.
