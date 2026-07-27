#!/usr/bin/env python3
"""
Website Visit Stats - CTI Group
Support IP Classification: Mainland/HK/Overseas, Visits, Referer Summary
Usage:
  python stats_visit.py          # Fetch fresh data from server
  python stats_visit.py load    # Load from last raw data file
  python stats_visit.py <file>  # Load from custom file
"""

import paramiko
import json
import sys
import os
from collections import defaultdict
import requests

# ==================== Config ====================
HOST = "103.107.88.249"
PORT = 22
USER = "sunhuijun"
PASSWORD = "<本地填写服务器密码>"
START_DATE = "20260501"
END_DATE = "20260601"
RAW_DATA_FILE = "raw_logs.json"

# ==================== IP Classification ====================
def classify_ip(ip):
    """Use ip-api.com free API to classify IP"""
    try:
        resp = requests.get(f"http://ip-api.com/json/{ip}?fields=status,countryCode", timeout=5)
        data = resp.json()
        if data.get("status") == "success":
            cc = data.get("countryCode", "")
            if cc == "CN":
                return "Mainland"
            elif cc == "HK":
                return "HK"
            else:
                return "Overseas"
        return "Overseas"
    except:
        return "Overseas"

# ==================== SSH Connection ====================
def get_raw_logs():
    """Connect to server via SSH and fetch raw log data"""
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    print("[Connect] Connecting to server...")
    client.connect(HOST, port=PORT, username=USER, password=PASSWORD, timeout=30)

    cmd = f"""
LOG_FILES=''
CURRENT_DATE='{START_DATE}'
END_DATE='{END_DATE}'

while [ $(date -d "$CURRENT_DATE" +%Y%m%d) -le $(date -d "$END_DATE" +%Y%m%d) ]; do
    YEAR=${{CURRENT_DATE:0:4}}
    MONTH=${{CURRENT_DATE:4:2}}
    DAY=${{CURRENT_DATE:6:2}}

    if [ $(date -d "$CURRENT_DATE" +%s) -gt $(date +%s) ]; then
        CURRENT_DATE=$(date -d "$CURRENT_DATE + 1 day" +%Y%m%d)
        continue
    fi

    if [ "$CURRENT_DATE" = "$(date +%Y%m%d)" ]; then
        LOG_FILES="$LOG_FILES /var/log/nginx/access.log"
    else
        LOG_FILES="$LOG_FILES /var/log/nginx/access.log-${{YEAR}}${{MONTH}}${{DAY}}.gz"
    fi

    CURRENT_DATE=$(date -d "$CURRENT_DATE + 1 day" +%Y%m%d)
done

echo '<本地填写sudo密码>' | sudo -S zcat $LOG_FILES 2>/dev/null | grep 'GET /assets/css/index.*.css' | awk '{{print $1, $NF}}'
"""

    print("[Fetch] Fetching log data (may take minutes)...")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=300)
    output = stdout.read().decode('utf-8', errors='replace')
    client.close()
    return output

# ==================== Parse Logs ====================
def parse_logs(raw_data):
    """Parse raw log, extract IP and referer"""
    records = []
    for line in raw_data.strip().split('\n'):
        parts = line.strip().split()
        if len(parts) >= 2:
            ip = parts[0]
            referer = parts[-1] if len(parts) > 1 else "Direct"
            records.append((ip, referer))
    return records

# ==================== Save/Load ====================
def save_raw_data(data, filepath):
    """Save raw log data to JSON file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump({
            'date_range': f"{START_DATE}-{END_DATE}",
            'raw_data': data,
            'fetched_at': str(__import__('datetime').datetime.now())
        }, f, ensure_ascii=False, indent=2)
    print(f"[Save] Raw data saved to: {filepath}")

def load_raw_data(filepath):
    """Load raw log data from JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get('raw_data', '')

# ==================== Main Analysis ====================
def analyze(raw_data, date_range_label=""):
    """Analyze log data and print results"""
    if not raw_data.strip():
        print("[ERROR] No data to analyze")
        return

    records = parse_logs(raw_data)
    total = len(records)
    unique_ips = set(r[0] for r in records)

    print(f"[Total] Visits: {total}")
    print(f"[IPs] Unique IPs: {len(unique_ips)}")
    print("\n[Working] Classifying IPs (may take minutes)...")

    # IP visit counting
    ip_visits = defaultdict(int)
    ip_referers = defaultdict(list)
    for ip, ref in records:
        ip_visits[ip] += 1
        ip_referers[ip].append(ref)

    sorted_ips = sorted(ip_visits.items(), key=lambda x: x[1], reverse=True)

    # Category stats
    category_stats = defaultdict(lambda: {"count": 0, "unique_ips": set()})
    ip_categories = {}

    for ip, count in sorted_ips:
        cat = classify_ip(ip)
        ip_categories[ip] = cat
        category_stats[cat]["count"] += count
        category_stats[cat]["unique_ips"].add(ip)

    # Output - Category Summary
    print("\n" + "=" * 60)
    print("Category Stats")
    print("=" * 60)
    print(f"{'Category':<12} {'Visits':>10} {'UniqueIPs':>10}")
    print("-" * 35)
    for cat in ["Mainland", "HK", "Overseas"]:
        stats = category_stats[cat]
        print(f"{cat:<12} {stats['count']:>10} {len(stats['unique_ips']):>10}")
    total_unique = sum(len(s["unique_ips"]) for s in category_stats.values())
    print("-" * 35)
    print(f"{'Total':<12} {total:>10} {total_unique:>10}")

    # Output - IP Details
    print("\n" + "=" * 60)
    print("IP Details (sorted by visits desc)")
    print("=" * 60)
    print(f"{'IP':<18} {'Cat':<10} {'Visits':>8} {'Referer':<30}")
    print("-" * 70)
    for ip, count in sorted_ips:
        cat = ip_categories[ip]
        ref_counter = defaultdict(int)
        for ref in ip_referers[ip]:
            ref_counter[ref] += 1
        top_ref = max(ref_counter.items(), key=lambda x: x[1])[0]
        ref_display = top_ref[:30] if len(top_ref) > 30 else top_ref
        print(f"{ip:<18} {cat:<10} {count:>8} {ref_display:<30}")

    # Output - Referer Summary
    print("\n" + "=" * 60)
    print("Referer Summary (sorted by visits desc)")
    print("=" * 60)
    all_refs = []
    for ip, refs in ip_referers.items():
        all_refs.extend(refs)
    ref_counter = defaultdict(int)
    for ref in all_refs:
        ref_counter[ref] += 1
    sorted_refs = sorted(ref_counter.items(), key=lambda x: x[1], reverse=True)
    print(f"{'Referer':<50} {'Visits':>10}")
    print("-" * 62)
    for ref, count in sorted_refs[:30]:
        ref_display = ref[:50] if len(ref) > 50 else ref
        print(f"{ref_display:<50} {count:>10}")

    print("\n" + "=" * 60)
    print("Done!")
    print("=" * 60)

# ==================== Entry Point ====================
def main():
    print("=" * 60)
    print("   Website Visit Stats - CTI Group")
    print("=" * 60)

    if len(sys.argv) > 1:
        # Load mode: read from file
        filepath = sys.argv[1]
        if not os.path.exists(filepath):
            print(f"[ERROR] File not found: {filepath}")
            return
        print(f"\n[Load] Loading from: {filepath}\n")
        raw_data = load_raw_data(filepath)
        date_range = filepath.replace('\\', '/').split('/')[-1].replace('.json', '')
        analyze(raw_data, date_range)
    else:
        # Fetch mode: connect to server
        print(f"\nDate Range: {START_DATE} - {END_DATE}\n")
        raw_data = get_raw_logs()
        if raw_data.strip():
            save_raw_data(raw_data, RAW_DATA_FILE)
            analyze(raw_data)
        else:
            print("[ERROR] No data fetched, check connection and date range")

if __name__ == "__main__":
    main()
