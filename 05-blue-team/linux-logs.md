---
title: Linux Logging and Audit
phase: blue-team
platform: linux
tags: [linux, logging, audit, syslog, auth-log]
risk: medium
attack_tactic: TA0007
attack_technique: T1070
data_sources: [auth.log, syslog, audit.log, auditd]
last_review: 2026-05-25
---

# Linux Logging and Audit

### Objetivo

Proveer referencia de logs de Linux para detección, hunting e investigación forense.

### Key Log Files

```
/var/log/auth.log          # SSH, sudo, PAM, user authentication
/var/log/syslog           # General system messages
/var/log/kern.log         # Kernel messages
/var/log/apache2/access.log  # Apache access
/var/log/apache2/error.log   # Apache errors
/var/log/nginx/access.log
/var/log/nginx/error.log
/etc/rsyslog.conf         # Logging configuration
```

### Auth Log Patterns

```bash
# Successful SSH
grep "Accepted" /var/log/auth.log

# Failed SSH
grep "Failed" /var/log/auth.log

# sudo usage
grep "sudo" /var/log/auth.log

# User added to sudo/admin group
grep "add.*sudo\|add.*admin" /var/log/auth.log

# All logins by user
grep "user123" /var/log/auth.log | tail -50
```

### Audit Daemon (auditd)

```bash
# Install and enable
apt-get install auditd
systemctl enable auditd

# Key rules (add to /etc/audit/rules.d/)
# Monitor password files
-w /etc/passwd -p wa -k identity
-w /etc/shadow -p wa -k identity
# Monitor SSH keys
-w /home -p wa -k homedirs
# Monitor execution
-a always,exit -F arch=b64 -S execve -k execution
```

### Audit Search Commands

```bash
# Search by key
ausearch -k identity -i

# Search by user
ausearch -ua 1000 -i

# Search by time
ausearch -ts today -i

# aureport summary
aureport -u
aureport -f
aureport -m
```

### One-liners

```bash
# Find recently modified config files
find /etc -mtime -7 -type f 2>/dev/null

# Find new users
grep -E "useradd|groupadd" /var/log/auth.log

# Find processes spawned from SSH
grep "sshd" /var/log/auth.log | grep -E "session opened|command"

# Analyze /proc for hidden processes
ps aux | grep -v "^\[" | grep -v PPID
```

### Detección y Mitigación

- **Visibilidad:** auth.log is critical; enable auditd for comprehensive syscall logging.
- **Hardening:** Configurar centralized logging (rsyslog to SIEM), protect logs from tampering (immutable files), enable auditd rules.

### Validación de Cobertura

- **Prueba técnica:** Trigger sudo command and SSH login, verify logs are created.
- **Criterio de éxito:** Logs appear in SIEM; audit rules capture execution events.
