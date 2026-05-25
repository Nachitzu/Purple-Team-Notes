---
title: Credential Compromise Response
phase: blue-team
platform: [windows, ad]
tags: [credential-compromise, password-spray, ir, dfir]
risk: critical
attack_tactic: TA0006
attack_technique: T1070
data_sources: [security-events, azure-ad-logs, identity-provider-logs]
last_review: 2026-05-25
---

# Credential Compromise Playbook

### Objetivo

Respuesta estructurada ante compromiso de credenciales, incluyendo password spray, credential stuffing, y token theft.

### Indicadores de compromiso

- Account lockouts sin reason known
- Spike en failed logins (Security Event 4625)
- Logons desde países/lugares inusuales
- Account lockout para múltiples usuarios simultáneo (password spray)
- Lateral movement usando credenciales robadas
- Az/Azure AD risky sign-ins detected

### FASE 1: Detectar y Confirmar

```powershell
# Investigar failed logins
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} -MaxEvents 1000 | Where-Object {
    $_.TimeCreated -gt (Get-Date).AddHours(-24)
} | Select-Object TimeCreated, Message | Export-Csv -Path failed_logins.csv

# Check for password spray pattern (same source IP multiple accounts)
# Azure AD sign-in logs: spike in 4625 equivalent

# Detect NTLM relay
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624;IpAddress='-'} -MaxEvents 100

# Investigate anomalous logon (no password)
Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625} | Where-Object {
    $_.Message -imatch 'bad password|account disabled|logon type 3'
} | Select-Object -First 50
```

### FASE 2: Contención

```powershell
# Reset password immediately for compromised account
net user username newpassword /domain

# Disable account temporarily
net user username /active:no /domain

# Revoke all sessions (remove tgt)
net session /delete /force 2>$null

# Check for concurrent sessions
query user
```

### FASE 3: Investigación

- Determine how credentials were compromised
- Check for password reuse from public leaks
- Investigate if corporate password in a public breach (haveibeenpwned.com)
- Identify if phishing was the vector
- Review recent changes to privileged accounts

### FASE 4: Evaluación deImpacto

```powershell
# Check all admin accounts
Get-LocalUser | Where-Object {$_.Description -like '*admin*'}

# Check for golden ticket activity (time-based anomalies)
# Review security events 4672, 4769 for unusual TGS requests

# Azure AD: review sign-in logs for all users with same IP
```

### Recuperación

- Password reset force next logon
- MFA enrollment confirmed
- If tokens were stolen (OAuth compromise), revoke all tokens and re-enumerate app permissions
- If Kerberos TGT stolen (golden ticket), reset krbtgt account twice (official guidance)

### Detección y Mitigación

- **Visibilidad:** Account lockout alerts, impossible travel alerts, password spray patterns.
- **Hardening:** Enforce MFA, educate users not to reuse passwords, enforce complex passwords, implement smart lockout.

### Validación de Cobertura

- **Prueba técnica:** Legitimate password spray test with prior notice and authorization.
- **Criterio de éxito:** SIEM alerts on password spray pattern; accounts lock as expected.
