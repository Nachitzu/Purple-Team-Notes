# Ciclo de Vida de Ingeniería de Detecciones

### Objetivo

Estandarizar cómo se crean, prueban, despliegan y retiran las reglas de detección (SIEM/EDR) para mantener alta fidelidad y evitar la "deuda de detección" (fatiga de alertas por reglas desactualizadas).

### 1. Ideación y Priorización

- **Origen:** Reportes de CTI (Threat Intel), nuevos TTPs observados, resultados de un ejercicio Purple Team o brechas de cobertura en MITRE ATT&CK.
- **Acción:** Definir la hipótesis de detección (Ej: "Si un proceso ofimático lanza PowerShell con parámetros codificados, es probable que sea malicioso").

### 2. Desarrollo y Construcción

- **Fuentes de datos:** Identificar qué telemetría se necesita (Ej: Sysmon Event ID 1, Windows Security 4688).
- **Lógica:** Escribir la regla utilizando estándares como Sigma, YARA o el lenguaje nativo del SIEM (KQL, SPL).
- **Metadatos:** Asignar severidad, falsos positivos esperados y mapeo a MITRE ATT&CK.

### 3. Pruebas y Validación (Testing)

- **Ejecución:** Simular el ataque en un entorno controlado.
- **Tuning:** Ajustar la regla para excluir el comportamiento legítimo (ruido normal del entorno).
- **Criterio:** La regla no debe pasar a producción si genera más de un 10% de falsos positivos en el entorno de prueba.

### 4. Despliegue y Respuesta

- **Rollout:** Promover la regla a producción.
- **Playbook:** Cada regla debe tener un documento de respuesta asociado (IRP) que indique al analista SOC qué investigar cuando se dispare la alerta.

### 5. Monitoreo y Retiro (Deprecation)

- **Revisión:** Evaluar el rendimiento de la regla trimestralmente.
- **Retiro:** Si una regla genera fatiga de alertas o el TTP ya no es relevante, debe ajustarse drásticamente o eliminarse para sanear el entorno.
