---
title: Active Directory Enumeration
phase: exploracion
platform: ad
tags: [ad, ldap, enumeration, domain]
risk: high
attack_tactic: TA0007
attack_technique: T1018
data_sources: [ldap-adverts, security-events, sysmon]
last_review: 2026-05-25
---

# Active Directory Enumeration

### Objetivo

Recopilar información del dominio Active Directory: usuarios, equipos, políticas, grupos, relaciones de confianza y servicios expuestos para identificar vectores de ataque y movimiento lateral.

### Requisitos previos

- Acceso a la red interna con autenticación de dominio o credenciales de usuario raso
- Herramientas: `bloodhound`, `netexec`, `ldapsearch`, `windapsearch`, `ADMiner`

### Comandos base

```bash
# Enumeración básica con CrackMapExec (netexec)
netexec ads target domain.local -u user -p pass --users

# enumerate computers
netexec ads target domain.local -u user -p pass --computers

# enumerate groups
netexec ads target domain.local -u user -p pass --groups

# LDAP search con ldapsearch
ldapsearch -x -H ldap://dc01.domain.local -D "user@domain.local" -w password -b "DC=domain,DC=local" "(objectClass=user)" sAMAccountName memberOf
```

### One-liners

```bash
# Listar todos los usuarios con sus grupos
netexec ads target.domain.local -u user -p pass -M whoami

# Encontrar usuarios con descripciones sensibles (passwords en campo)
netexec ads target.domain.local -u user -p pass -M user-desc

# enumerarforest trusts
netexec ads target.domain.local -u user -p pass --forest

# BloodHound collection (necesita primeroSharpHound en Windows)
# Desde el dominio:
./SharpHound.exe -c All
```

### Detección y Mitigación

- **Visibilidad:** LDAP firmantes ,Security Event 1644 (LDAP consultas excesivas), Sysmon EID 3 para tráfico de red sospechoso.
- **Hardening:** Habilitar LDAP signing y SASL, monitorear consultas LDAP anónimas, limitar qué equipos pueden hacer queries al domain controllers.

### Validación de Cobertura

- **Prueba técnica:** `netexec ads target.domain.local -u user -p pass --users` en laboratorio.
- **Criterio de éxito:** Alerta por enumeración masiva de usuarios (Security Event 4768 si se generan tickets, 1644 para LDAP).
