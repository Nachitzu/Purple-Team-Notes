---
title: JQ One-liners
phase: oneliners
platform: linux
tags: [jq, json, parsing, data-processing]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# JQ One-liners

### Objetivo

Manipulación eficiente de JSON desde命令行 para procesamiento de datos de logs, APIs, y archivos estructurados.

### Basics

```bash
# Parse JSON, pretty print
echo '{"name":"test","value":42}' | jq .

# Extract field
cat data.json | jq '.name'

# Extract nested field
cat data.json | jq '.user.email'

# Array iteration
cat data.json | jq '.users[]'

# Array map
cat data.json | jq '.users[].name'
```

### Filtering

```bash
# Filter by condition (select)
cat logs.json | jq '.[] | select(.status == 500)'

# Filter by multiple conditions
cat logs.json | jq '.[] | select(.status > 400 and .bytes > 1000)'

# Find with regex
cat data.json | jq '.[] | select(.host | test("prod"))'

# Boolean filter
cat data.json | jq '.[] | select(.active == true)'
```

### Aggregation

```bash
# Count occurrences
cat data.json | jq '[.logs[].level] | group_by(.) | map({level: .[0], count: length})'

# Sum values
cat data.json | jq '[.records[].bytes] | add'

# Unique values
cat data.json | jq '[.ips[]] | unique'

# Max value
cat data.json | jq '[.records[].latency] | max'
```

### Common Blue Team Uses

```bash
# Parse Zeek JSON logs
cat conn.log | jq '{src_ip: .id.orig_h, dst_ip: .id.resp_h, proto: .proto}'

# Extract C2 domains from DNS query log
cat dns.log | jq '.[] | select(.query | test("malware")) | .query'

# Parse Suricata EVE JSON
cat eve.json | jq '.event_type == "alert"' | jq '.'

# Summarize log sources
cat sysmon.json | jq '.EventID' | sort | uniq -c
```

### One-liners

```bash
# Flatten nested
jq 'flatten' data.json

# Merge objects
jq -s '.[0] * .[1]' file1.json file2.json

# Extract keys
jq 'keys' data.json

# Convert to CSV
jq -r '.[] | [.id, .name, .status] | @csv' data.json
```

### Detección y Mitigación

- **Visibilidad:** NA (jq is a processing tool, not a detection mechanism itself).
- **Hardening:** NA.
