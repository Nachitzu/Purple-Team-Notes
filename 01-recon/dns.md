# DNS Reconnaissance

### Objetivo

Enumerar información de DNS para descubrir assets externos, subdominios, servidores de correo y estructuras internas de una organización.

### Requisitos previos

- Herramientas: `dig`, `nslookup`, `dnsenum`, `fierce`, `massdns`
- Alcance autorizado para enumerar el dominio objetivo

### Registros DNS clave

| Tipo | Propósito |
|------|-----------|
| A    | Dirección IPv4 |
| AAAA | Dirección IPv6 |
| MX    | Servidores de correo |
| NS    | Servidores de nombres |
| TXT   | Verificaciones SPF, DMARC, dominios de prueba |
| CNAME | Alias de dominio |
| SOA   | Autoridad de zona |
| PTR   | Resolución inversa |

### Comandos base

```bash
# Consulta básica A record
dig target.com A

# Consulta ANY (si el servidor lo permite)
dig target.com ANY

# Transferencia de zona
dig target.com AXFR @ns1.target.com

# Enumeración de subdominios con dnsenum
dnsenum target.com

# enumeración pasiva con fierce
fierce --domain target.com --subdomains
```

### One-liners

```bash
# Extracción de nameservers
dig target.com NS +short

# Extracción de MX
dig target.com MX +short

# Lookup inverso para descubrir más hosts
for ip in $(seq 1 254); do dig +short $ip.in-addr.arpa PTR | grep -v NXDOMAIN; done

# wordlist de subdominios con massdns
massdns -r resolvers.txt -t A -o output.txt domains.txt
```

### Detección y Mitigación

- **Visibilidad:** Monitorear consultas AXFR y patrones de enumeración masiva desde IPs externas.
- **Hardening:** Restringir transferencias de zona, implementar rate-limiting en DNS recursivo.

### Validación de Cobertura

- **Prueba técnica:** Ejecutar `dnsenum target.com` en laboratorio.
- **Criterio de éxito:** Alerta de IDS/IPS por enumeración DNS o log de consultas AXFR recibidas.
