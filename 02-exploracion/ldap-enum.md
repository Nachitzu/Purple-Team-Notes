---
title: LDAP Enumeration
phase: exploracion
platform: ad
tags: [ldap, active-directory, enum, discovery]
risk: high
attack_tactic: TA0007
attack_technique: T1018
data_sources: [ldap-traffic, security-events]
last_review: 2026-05-25
---

# LDAP Enumeration

### Objetivo

Extraer información del directorio Active Directory via LDAP: usuarios, grupos, equipos, GPOs, políticas y relaciones de confianza.

### Comandos base

```bash
# ldapsearch
ldapsearch -x -H ldap://dc01.domain.local -b "DC=domain,DC=local" "(objectClass=user)" sAMAccountName memberOf

# with authentication
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w 'password' -b "DC=domain,DC=local"

# Get all domain admins
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w 'password' -b "CN=Users,DC=domain,DC=local" "(&(objectClass=user)(memberOf=CN=Domain Admins,CN=Users,DC=domain,DC=local))"

# windapsearch (Python)
windapsearch --dc dc01.domain.local --domain domain.local -u user -p pass --users
windapsearch --dc dc01.domain.local --domain domain.local -u user -p pass --computers
windapsearch --dc dc01.domain.local --domain domain.local -u user -p pass --dainciusers
```

### Enum users con bloodhound-like queries

```bash
# Get all users with descriptions
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w pass -b "DC=domain,DC=local" "(objectClass=user)" sAMAccountName description | grep -E '^(sAMAccountName|description):'

# Find users with ServicePrincipalName
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w pass -b "DC=domain,DC=local" "(objectClass=user)" sAMAccountName servicePrincipalName | grep -v '^$' | paste - - | sort -u
```

### One-liners

```bash
# Get all groups
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w pass -b "DC=domain,DC=local" "(objectClass=group)" cn member | grep -E '^(cn|member):'

# Get domain trusts
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w pass -b "" "(objectClass=trustedDomain)" trustedPartner

# Enumerate GPOs
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w pass -b "CN=Policies,CN=System,DC=domain,DC=local" "(objectClass=groupPolicyContainer)" displayName cn
```

### Detección y Mitigación

- **Visibilidad:** Security Event 1644 (LDAP query), monitor for ldap enumeration tools, Sysmon EID 3 for network connections to port 389/636.
- **Hardening:** Requir LDAP signing and SASL, enable LDAP channel binding, monitor for Anonymous LDAP binds.

### Validación de Cobertura

- **Prueba técnica:** Run `windapsearch --users` in lab.
- **Criterio de éxito:** Security Event 1644 logged; alert if excessive LDAP enumeration from single source.
