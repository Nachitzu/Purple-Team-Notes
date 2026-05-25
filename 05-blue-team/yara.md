---
title: YARA Rules Reference
phase: blue-team
platform: [windows, linux, network]
tags: [yara, malware, detection, file-patterns]
risk: critical
attack_tactic: TA0002
attack_technique: T1057
data_sources: [file-content, endpoint)
last_review: 2026-05-25
---

# YARA Rules Reference

### Objetivo

Proveer guía para crear y usar reglas YARA para detección de malware y reconocimiento de artefactos.

### Basic YARA Rule

```yara
rule RemoteAccessTool_Xploit {
    meta:
        description = "Detects Xploit RAT"
        author = "Purple Team"
        date = "2026-05-25"
        md5 = "d41d8cd98f00b204e9800998ecf8427e"
    strings:
        $mz = "MZ"
        $str1 = "xor eax, eax" wide ascii
        $str2 = "HackingTool" ascii
        $mutex = "XploitMutex" ascii
    condition:
        $mz at 0 and
        2 of them
}
```

### Strings y Modules

```yara
// Import modules
import "pe"
import "elf"
import "hash"

rule PE_Info {
    strings:
        $dos_header = "MZ"
    condition:
        // Check for high entropy sections
        for any section in pe.sections:
            (section.entropy > 7.0)
}
```

### Compiling and Testing

```bash
# Install yara
pip install yara-python

# Compile rule
yara -C rule.yar malware sample

# Scan directory
yara malware_rules.yar /path/to/scan -r

# With JSON output
yara -j malware_rules.yar /path/to/scan -r > results.json
```

### Scanning Memory

```bash
# Volatility + YARA
volatility -f memory.dmp yarascan -Y "meterpreter"

# Find process with yara
python yara_scan.py -r rules.yar -p PID

# LOKI (Blue Team's IR tool)
python loki.py -p /opt/loki -l report
```

### One-liners

```bash
# Find compiled rules in apt
apt list --installed 2>/dev/null | grep yara

# Scanning on threat intel
curl -s URL | yara rules.yar

# Malware taxonomy with YARA
yara -C classifier.yar ./malware_set/
```

### Detección y Mitigación

- **Visibilidad:** YARA rules detect malware on disk and in memory; integrate with endpoint protection API.
- **Hardening:** Mantener actualizado rule set, priorizar coverage for commodity malware first.

### Validación de Cobertura

- **Prueba técnica:** Submit known malware sample to YARA rule scanner.
- **Criterio de éxito:** YARA rule matches the correct malware (true positive) and no FP on clean files.
