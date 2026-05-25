# Framework para Ejercicios Purple Team

### Objetivo

Establecer una metodología repetible para los ejercicios colaborativos, asegurando que la ofensiva mejore directamente las capacidades de detección y respuesta de la organización.

### 1. Planeación e Inteligencia (Pre-ejercicio)

- Definir el alcance (sistemas, red, restricciones de impacto).
- Seleccionar el actor de amenazas a emular o la cadena de ataque (TTPs) basada en reportes de Threat Intelligence.
- Establecer las métricas base (tiempo medio de detección esperado).

### 2. Preparación (Tabletop y Configuración)

- El Blue Team expone qué visibilidad y alertas esperan tener para los TTPs seleccionados.
- El Red Team prepara los payloads, la infraestructura C2 (Command and Control) y los scripts de automatización.
- Se asegura que los canales de comunicación entre ambos equipos estén abiertos y sin fricciones.

### 3. Ejecución Controlada (El Ejercicio)

- **Transparencia:** El Red Team anuncia cada ejecución ("Ejecutando volcado de LSASS en el host X en 3, 2, 1...").
- **Observación:** El Blue Team revisa las consolas en tiempo real.
- **Registro:** Se documenta inmediatamente si el ataque fue bloqueado, detectado (generó alerta), solo registrado (hay logs pero no alerta) o pasó inadvertido.

### 4. Revisión y Mitigación (Post-ejercicio)

- Sesión de lecciones aprendidas (After-Action Review).
- Ingeniería de detecciones inmediata para los TTPs que pasaron inadvertidos pero dejaron logs.
- Recomendaciones de hardening para las técnicas que no dejaron rastros.

### 5. Retesting

- Volver a ejecutar exclusivamente los ataques que fallaron en detección durante el ejercicio principal.
- Validar que las nuevas reglas implementadas funcionen sin interrumpir la operación del negocio.
