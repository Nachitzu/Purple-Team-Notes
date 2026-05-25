---
title: AWK, SED, and GREP One-liners
phase: oneliners
platform: linux
tags: [awk, sed, grep, text-processing, parsing]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# AWK, SED, and GREP One-liners

### Objetivo

Procesamiento rápido de文本 peratore para análisis de logs, parsing, y transformación.

### GREP

```bash
# Basic search
grep "error" /var/log/syslog

# Case insensitive
grep -i "error" /var/log/syslog

# Recursive
grep -r "password" /etc/ 2>/dev/null

# Show line numbers
grep -n "error" file.log

# Invert match
grep -v "INFO" file.log

# Regex
grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" access.log

# Count matches
grep -c "error" file.log

# Context (lines before/after)
grep -B2 -A3 "error" file.log
```

### SED

```bash
# Replace text
sed 's/foo/bar/g' file.txt

# In-place edit
sed -i 's/foo/bar/g' file.txt

# Delete lines matching pattern
sed '/debug/d' file.log

# Print specific line
sed -n '15p' file.txt

# Insert after line
sed -i '5aTEXT TO INSERT' file.txt

# Substitute with regex capture
echo "123-456-7890" | sed -E 's/([0-9]{3})-([0-9]{3})-([0-9]{4})/(\1) \2-\3/'
# Output: (123) 456-7890
```

### AWK

```bash
# Print first column
awk '{print $1}' file.txt

# Print specific columns
awk '{print $1, $3, $NF}' file.txt  # NF = number of fields, last field

# FS (field separator)
awk -F: '{print $1, $5}' /etc/passwd

# OFS (output FS)
awk -F: -v OFS=',' '{print $1, $5}' /etc/passwd

# Conditional
awk '$3 > 500 {print $1, $3}' data.txt

# Built-in variables
awk 'NR==5' file.txt  # line 5
awk 'NR>=10 && NR<=20' file.txt  # lines 10-20
awk 'END {print NR}' file.txt  # total lines

# Sum column
awk '{sum += $2} END {print sum}' data.txt

# Group by
awk '{sum[$1]+=$2} END {for (k in sum) print k, sum[k]}' data.txt
```

### One-linerscombining tools

```bash
# GREP + AWK: Find top IPs hitting 404
grep " 404 " access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head

# Parse auth log for failed logins
grep "Failed" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn

# Extract unique URLs with status
awk '{print $7, $9}' access.log | sort -u | grep -E "404|500"

# SED: Remove ANSI color codes
sed 's/\x1b\[[0-9;]*m//g' output.txt
```

### Blue Team Log Analysis

```bash
# Windows Security Event 4624 - Successful logon
grep "4624" security.log | awk '{print $4}' | grep -E "^([0-9]{1,3}\.){3}[0-9]{1,3}$"

# Count events by level
grep -oE '\[Level=[0-9]+\]' log.txt | sort | uniq -c

# Extract timestamp + message
awk '{print $1, $2, $3, $NF}' syslog
```

### Detección y Mitigación

- **Visibilidad:** NA (text processing toolored).
- **Hardening:** NA.
