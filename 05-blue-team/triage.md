---
title: Endpoint Triage
phase: blue-team
platform: [windows, linux]
tags: [triage, dfir, endpoint, investigation]
risk: high
attack_tactic: TA0007
attack_technique: T1070
data_sources: [forensic-artifacts, memory-dump]
last_review: 2026-05-25
---

# Endpoint Triage

### Objetivo

Guía rápida para recolección de artefactos e investigación en endpoints comprometidos.

### Live Response Collection (Windows)

```powershell
# Fast triage with Kansa-style collection
$hostname = hostname
$output = "C:\Triage\$hostname"
New-Item -ItemType Directory -Path $output -Force

# Copy event logs
Copy-Item C:\Windows\System32\winevt\Logs\*.evtx $output -ErrorAction SilentlyContinue

# Prefetch
Copy-Item C:\Windows\Prefetch\*.pf $output -ErrorAction SilentlyContinue

# Registry hives
reg save HKLM\SYSTEM $output\SYSTEM
reg save HKLM\SAM $output\SAM

# Master File Table (MFT)
$script = @"
ntfsutil.exe C: copy mft c:\temp\mft.dump
"@;
```

### Memory Acquisition

```powershell
# WinPMEM
.\winpmem.exe memory.raw

# Dump using vulnerable driver (FTK imager)
# Use DumpIt from target
DumpIt.exe
```

### Timeline Analysis

```bash
# plaso / log2timeline for timeline creation
log2timeline.py timeline.json image.raw
psort.py -o body timeline.json

# Find artifacts recent
mactime -b timeline.body "2026-05-01 00:00:00".."2026-05-25 23:59:59"
```

### Forensics Artifacts

```
Windows:
  %SystemRoot%\System32\winevt\Logs\      Event logs
  %SystemRoot%\Prefetch\                  Prefetch
  %SystemRoot%\Tasks\                      Scheduled tasks
  %APPDATA%\Microsoft\Windows\Recent\      Recent files
  %LOCALAPPDATA%\Temp\                     Temp files
  Registry hives (SAM, SYSTEM, SECURITY, SOFTWARE)
  SRUM (System Resource Utilization Monitor)
  BAM/DAM (Background Activity Moderator)
```

### One-liners

```bash
# Windows: List all processes
tasklist /v

# Windows: Network connections
netstat -anob

# Windows: Scheduled tasks
schtasks /query /fo LIST /v

# Linux: Recent cron
cat /etc/crontab; ls -la /var/spool/cron
```

### Detección y Mitigación

- **Visibilidad:** Endpoint forensics is post-breach; focus on detection and containment before collection.
- **Hardening:** Enable Sysmon, configure Windows event log forwarding, keep forensic collection kits ready.

### Validación de Cobertura

- **Prueba técnica:** Collect triage data from known infected system.
- **Criterio de éxito:** Data consistently collected; timeline shows attacker activity.
