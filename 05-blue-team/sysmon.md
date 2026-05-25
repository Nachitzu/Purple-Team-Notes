---
title: Sysmon Configuration and Events
phase: blue-team
platform: windows
tags: [sysmon, edr, telemetry, detection]
risk: medium
attack_tactic: TA0002
attack_technique: T1082
data_sources: [sysmon-events]
last_review: 2026-05-25
---

# Sysmon Configuration and Events

### Objetivo

Proveer configuración base de Sysmon para recolección de telemetría en endpointsWindows y referencia de eventos clave para detección.

### Requisitos previos

- Sysmon instalado en endpoints Windows
- Permisos de administrador para configuración

### Eventos clave

| Event ID | Descripción |
|----------|-------------|
| 1        | Creación de proceso (Image loadd) |
| 2        | Recreación de archivo (file creation time) |
| 3        | Conexión de red (network connection) |
| 4        | Estado de servicio Sysmon |
| 5        | Terminación de proceso |
| 6        | Driver cargado |
| 7        | DLL cargada |
| 8        | Creación de proceso remoto (thread) |
| 9        | Raw disk access |
| 10       | Acceso a proceso (process access) — permite detectar LSASS |
| 11       | Creación de archivo |
| 12       | Registro: evento de creación/eliminación de clave |
| 13       | Registro: evento SetValue |
| 14       | Registro: evento RenameKey |
| 15       | DNS query (solo Windows 8.1+) |
| 16       | Sysmon config change |
| 17       | Pipe creation |
| 18       | Pipe connection |
| 19-21    | WMI subscriptions |
| 22       | DNS query (todas las versiones) |

### Configuración básica (SwiftOnSecurity)

```xml
<!-- sysmon config excerpt -->
<DriverLoading>Image</DriverLoading>
<NetworkConnectivity>True</NetworkConnectivity>
<ProcessCreation>True</ProcessCreation>
<ProcessTerminate>True</ProcessTerminate>
<RegistryBridging>True</RegistryBridging>
```

### Comandos útiles

```bash
# Instalar Sysmon con config
sysmon.exe -accepteula -i sysmonconfig-export.xml

# Actualizar config sin reiniciar
sysmon.exe -c sysmonconfig-update.xml

# Consultar eventos con Get-WinEvent
Get-WinEvent -FilterHashtable @{logname="Microsoft-Windows-Sysmon/Operational";Id=1} -MaxEvents 100

# Filtrar por nombre de imagen
Get-WinEvent -FilterHashtable @{logname="Microsoft-Windows-Sysmon/Operational";Id=1} -ComputerName hostname | Where-Object {$_.Message -imatch "powershell.exe"}
```

### Detección y Mitigación

- **Visibilidad:** Sysmon permite visibilidad profunda: proceso hijo spawned por script Office, conexiones DNS desde scripts, acceso a LSASS.
- **Hardening:** Utilizar config con hash checking para binaries firmados, bloquear loading de drivers no firmados, auditar eventos de registro.

### Validación de Cobertura

- **Prueba técnica:** atomic-red-team T1003.001 (LSASS dump).
- **Criterio de éxito:** Sysmon Event ID 10 con `TargetImage` siendo `lsass.exe` y `CallTrace` conteniendo `ntdll.dll`.
