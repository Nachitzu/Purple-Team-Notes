---
title: Ransomware Response Playbook
phase: blue-team
platform: [windows, network]
tags: [ransomware, incident-response, ransomware-playbook, dfir]
risk: critical
attack_tactic: TA0010
attack_technique: T1486
data_sources: [edr-alerts, endpoint-logs, network-traffic, security-events]
last_review: 2026-05-25
---

# Ransomware Playbook

### Objetivo

Respuesta inmediata y estructurada ante un incidente de ransomware para minimizar impacto y preservar evidencia.

### FASE 1: Detección y Confirmación

**Indicadores comunes:**
- Archivos .encrypted, .locked, .crypto extension
- Ransom notes (README_DECRYPT.txt, etc.)
- Screen lockers
- EDR alerts for mass encryption behavior
- NTLM authentication spikes to unusual hosts

**Confirmar el alcance:**
```powershell
# Verificar extensión de archivos encryptados
Get-ChildItem -Path C:\ -Recurse -File -Include *.encrypted,*.locked,*.crypto | Select-Object FullName, LastWriteTime | Export-Csv -Path ransomware_files.csv

# Verificar actividad de último día
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4688} | Where-Object {$_.TimeCreated -gt (Get-Date).AddDays(-1)} | Format-List
```

### FASE 2: Contención Inmediata

**Aislar sin apagar (preserve evidence):**
```powershell
# Disable network on servers (NAC or manual)
Set-NetAdapter -Name "Ethernet" -InterfaceIndex 12 -Status Disabled

# Block ransomware C2 at proxy/firewall
# Block known C2 domains via DNS sinkhole

# Isolar affected machines
# Not power off - memory may contain keys
```

**Considerar usar Windows Firewall quarantine:**
```powershell
# Block all outbound from infected host
netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound
```

### FASE 3: Investigación

```powershell
# Collect ransom note
Get-ChildItem -Path C:\ -Recurse -File -Include *DECRYPT*,*README* | Select FullName, Content

# Check for scheduled tasks (persistence)
Get-ScheduledTask | Where-Object {$_.TaskPath -ne '\Microsoft\'} | Format-List

# Collect event logs before shutdown
Copy-Item C:\Windows\System32\winevt\Logs\*.evtx C:\Triage\

# Identify patient zero (first encryption event)
```

### FASE 4: Erradicación

- Confirm malware variant
- Check for persistence mechanisms (scheduled tasks, services, registry)
- Re-image affected systems
- Reset ALL credentials used on compromised accounts
- Revoke ALL session tokens (force AD logoff)

### FASE 5: Recuperación

- Restore from-clean backups (verify backup integrity)
- Rebuild from gold image when possible
- Update firmware, drivers, software post-restore

### Detección y Mitigación

- **Visibilidad:** EDR behavioral analytics for mass file Encryption, process creation of known ransomware.
- **Hardening:** Daily backups tested, network segmentation, least privilege, EDR configured for process termination.

### Validación de Cobertura

- **Prueba técnica:** Simulate file encryption (eicar in folder) and verify EDR alerts within minutes.
- **Criterio de éxito:** EDR detects and alerts before files are encrypted en masse.
