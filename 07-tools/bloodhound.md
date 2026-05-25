---
title: BloodHound
phase: tools
platform: windows, linux
tags: [bloodhound, ad, path, analysis, ldap, ad]
risk: critical
attack_tactic: TA0007
attack_technique: T1018
data_sources: [ldap-traffic, security-events]
last_review: 2026-05-25
---

# BloodHound

### Objetivo

Enumerar y visualizar relaciones de AD para identificar caminos de ataque (paths to domain admin), debilidades de permisos y vectores de escalación.

### Colección

```bash
# BloodHound Python collector (no Windows needed)
bloodhound-python -c All -u user -p password -d domain.local -dc dc01.domain.local

# SharpHound (from domain-joined Windows)
./SharpHound.exe -c All -d domain.local --domaincontroller dc01.domain.local

# AzureHound (for Azure AD)
./AzureHound.py -w -u user@domain.com -p password
```

### Queries útiles

```
# Shortest path to Domain Admin
MATCH (m {name:'DOMAIN ADMINS@_DOMAIN.COM'}),(c {name:'USER@DOMAIN.COM'}),p=path(m,c) RETURN p

# Find all Domain Admin sessions
MATCH (u)-[:AdminTo*1..]->(c {name:'DOMAIN ADMINS@DOMAIN.COM'}) RETURN u.size(), u.name

# Unconstrained delegation computers
MATCH (c:Computer) WHERE c.unconstraineddelegation RETURN c.name

# Users with SPN (Kerberoastable)
MATCH (u:User) WHERE u.hasspn RETURN u.name, u.spn

# SQL Admin members
MATCH (u:User)-[:SQLAdmin*1..]->(c:Computer) RETURN u.name, c.name
```

### Cypher Query Examples

```bash
# Find users who can do RBCD
MATCH (u:User)-[:GenericAll|GENERIC_ALL]->(c:Computer) RETURN u.name, c.name

# Find descent paths from owned user to EA
MATCH p=shortestPath((owned {name:'user@domain.com'})-[*1..]->(got {name:'ENTERPRISE ADMINS@DOMAIN.COM'})) RETURN p
```

### Analysis Insights

- **Shortest path to Domain Admin** — identify low-hanging fruit
- **ACO (Account Operators)** members — high-value targets
- **Unconstrained delegation** — print spooler attack vectors
- **MSSQL admins** — potential privesc via stored procedures
- **ASREP Roastable users** — no preauth required

### One-liners

```bash
# Collect and output JSON
./SharpHound.exe -c All -o stats -f

# Azure collection
python AzureHound.py -k -u 'user@domain.com' -p 'password' --collect Azure
```

### Detección y Mitigación

- **Visibilidad:** AD audit logs query events (Event 1644 in LDAP), Security Event 4756 for group changes; monitor for bloodhound queries.
- **Hardening:** Protect privileged group membership, enable LDAP signing, monitor for threshold of AD queries from single source.

### Validación de Cobertura

- **Prueba técnica:** Run collection in lab.
- **Criterio de éxito:** AD logs show enumeration queries with high volume.
