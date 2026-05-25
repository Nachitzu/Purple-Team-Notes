---
title: FTP SSH RDP WinRM Enumeration
phase: exploracion
platform: multi
tags: [ftp, ssh, rdp, winrm, enumeration, remote-access]
risk: medium
attack_tactic: TA0007
attack_technique: T1021
data_sources: [network-traffic, auth-logs, security-events]
last_review: 2026-05-25
---

# FTP / SSH / RDP / WinRM Enumeration

### Objetivo

Enumerar servicios de acceso remoto para identificar password spray vectors, default credentials, y vectores de acceso inicial.

### FTP

```bash
# anonymous login check
ftp target 21
# user: anonymous, pass: anonymous

# nmap FTP enum
nmap -p 21 --script ftp-anon,ftp-syst,ftp-vsftpd-backdoor target

# bypass with ssl
openssl s_client -connect target:21 -starttls ftp
```

### SSH

```bash
# banner grab
nc target 22
ssh -v target

# nmap SSH enum
nmap -p 22 --script ssh-auth-methods,ssh-run,sshv1 target

# check for weak keys / algorithms
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no target

# SSH brute force
hydra -l admin -P wordlist.txt ssh://target.com
```

### RDP

```bash
# connection test
xfreerdp /v:target /u:user /p:password
remmina

# nmap RDP enum
nmap -p 3389 --script rdp-enum-encryption,rdp-vuln target

# Check for BlueKeep (CVE-2019-0708)
nmap -p 3389 --script rdp-vuln-cve-2019-0708 target
```

### WinRM

```bash
# crackmapexec WinRM
netexec winrm target -u user -p pass

# evil-winrm
evil-winrm -i target -u user -p 'password'

# pass the hash via WinRM
evil-winrm -i target -u user -H LM:NTLMhash
```

### One-liners

```bash
# Scan common remote access ports
for port in 21 22 23 3389 5985 5986; do echo "Port $port"; nc -zv target $port 2>&1 | grep -E 'open|closed'; done

# SSH key bypass
ssh -i id_rsa user@target

# FTP download all
wget -m ftp://user:pass@target.com
```

### Detección y Mitigación

- **Visibilidad:** SSH: Security Event 4624,4625,4672; RDP: Security Event 4624,4634; FTP: web server logs auth attempts.
- **Hardening:** Disable SSH password auth (use keys), enable RDP NLA, disable WinRM Basic Auth, implement account lockout.

### Validación de Cobertura

- **Prueba técnica:** Run SSH/RDP brute force in lab.
- **Criterio de éxito:** SIEM alert on multiple failed logins; account lockout triggered.
