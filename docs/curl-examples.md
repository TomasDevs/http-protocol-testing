# Curl Testing Examples

Příklady curl commandů pro testování HTTP protokolů.

## Základní Testy

### Test HTTP/1.1
```bash
curl -I --http1.1 https://your-site.pages.dev
```

### Test HTTP/2
```bash
curl -I --http2 https://your-site.pages.dev
```

### Test HTTP/3
```bash
curl -I --http3 https://your-site.pages.dev
```

## Detailní Timing

### Měření všech time metrik
```bash
curl -o /dev/null -s -w "\
time_namelookup:    %{time_namelookup}s\n\
time_connect:       %{time_connect}s\n\
time_appconnect:    %{time_appconnect}s\n\
time_pretransfer:   %{time_pretransfer}s\n\
time_redirect:      %{time_redirect}s\n\
time_starttransfer: %{time_starttransfer}s\n\
time_total:         %{time_total}s\n\
size_download:      %{size_download} bytes\n\
speed_download:     %{speed_download} bytes/sec\n\
http_version:       %{http_version}\n\
" --http2 https://your-site.pages.dev
```

### Porovnání protokolů
```bash
# HTTP/1.1
echo "=== HTTP/1.1 ==="
for i in {1..5}; do
  curl -o /dev/null -s -w "Total: %{time_total}s\n" --http1.1 https://your-site.pages.dev
done

# HTTP/2
echo "=== HTTP/2 ==="
for i in {1..5}; do
  curl -o /dev/null -s -w "Total: %{time_total}s\n" --http2 https://your-site.pages.dev
done

# HTTP/3
echo "=== HTTP/3 ==="
for i in {1..5}; do
  curl -o /dev/null -s -w "Total: %{time_total}s\n" --http3 https://your-site.pages.dev
done
```

## Testování Specifických Scénářů

### Light Test
```bash
curl -o /dev/null -s -w "%{time_total}\n" --http2 https://your-site.pages.dev/test/light
```

### Heavy Test
```bash
curl -o /dev/null -s -w "%{time_total}\n" --http2 https://your-site.pages.dev/test/heavy
```

### Many Resources Test
```bash
curl -o /dev/null -s -w "%{time_total}\n" --http2 https://your-site.pages.dev/test/many
```

## Pokročilé Testování

### Test s různými compression
```bash
# Bez compression
curl -o /dev/null -s -w "Size: %{size_download}\n" --http2 https://your-site.pages.dev

# S GZIP
curl -o /dev/null -s -w "Size: %{size_download}\n" -H "Accept-Encoding: gzip" --http2 https://your-site.pages.dev

# S Brotli
curl -o /dev/null -s -w "Size: %{size_download}\n" -H "Accept-Encoding: br" --http2 https://your-site.pages.dev
```

### Test s User Agent
```bash
# Desktop
curl -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" --http2 https://your-site.pages.dev

# Mobile
curl -I -A "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" --http2 https://your-site.pages.dev
```

### Verbose Output (Debug)
```bash
curl -v --http2 https://your-site.pages.dev 2>&1 | grep -i "alpn\|http"
```

## Statistiky a Průměry

### Bash script pro průměr
```bash
#!/bin/bash
SITE="https://your-site.pages.dev"
ITERATIONS=10

echo "Testing HTTP/2 - $ITERATIONS iterations"
sum=0
for i in $(seq 1 $ITERATIONS); do
  time=$(curl -o /dev/null -s -w "%{time_total}" --http2 $SITE)
  echo "Iteration $i: ${time}s"
  sum=$(echo "$sum + $time" | bc)
done

avg=$(echo "scale=3; $sum / $ITERATIONS" | bc)
echo "Average: ${avg}s"
```

## Ověření HTTP/3 Podpory

### Check curl verze
```bash
curl --version | grep -i http3
```

### Test QUIC connection
```bash
curl -I --http3 https://cloudflare-quic.com
```

## CSV Export

### Export do CSV
```bash
echo "protocol,time_total,time_connect,time_starttransfer,size_download" > results.csv

for protocol in --http1.1 --http2 --http3; do
  for i in {1..10}; do
    result=$(curl -o /dev/null -s -w "%{time_total},%{time_connect},%{time_starttransfer},%{size_download}" $protocol https://your-site.pages.dev)
    echo "$protocol,$result" >> results.csv
  done
done
```

## Interpretace Výsledků

### Time Metriky

- **time_namelookup**: DNS resolution time
- **time_connect**: TCP connection time
- **time_appconnect**: SSL/TLS handshake time
- **time_pretransfer**: Time until file transfer start
- **time_starttransfer**: Time to first byte (TTFB)
- **time_total**: Complete transaction time

### HTTP Version Codes

- `1.1` = HTTP/1.1
- `2` = HTTP/2
- `3` = HTTP/3

## Očekávané Rozdíly

### HTTP/1.1 vs HTTP/2
```
HTTP/1.1: time_total ≈ 1.5-2x HTTP/2
```

### HTTP/2 vs HTTP/3
```
HTTP/3: time_connect ≈ 0.5x HTTP/2 (0-RTT)
HTTP/3: time_total ≈ 0.8-0.9x HTTP/2 (ideální podmínky)
```

## Troubleshooting

### HTTP/3 není podporováno
```bash
# Zkontrolujte verzi curl
curl --version

# HTTP/3 vyžaduje curl 7.66+ s QUIC support
# macOS: brew install curl (nebo curl-quic)
# Linux: použijte Docker s HTTP/3 curl
```

### ALPN negotiation failed
```bash
# Server nepodporuje daný protokol
# Zkuste jiný protokol nebo jiný server
```

### SSL certificate problems
```bash
# Přeskočte SSL verifikaci (pouze pro testing!)
curl -k --http2 https://your-site.pages.dev
```

## Docker pro HTTP/3 Testing

Pokud váš curl nepodporuje HTTP/3:

```bash
# Použijte Docker image s HTTP/3
docker run --rm ymuski/curl-http3 curl --http3 https://cloudflare.com

# Alias pro pohodlí
alias curl-http3="docker run --rm ymuski/curl-http3 curl --http3"
```

## Automatizované Testování

Použijte připravený script:

```bash
# Upravte URL v scriptu
nano testing/scripts/curl-test.sh

# Spusťte
./testing/scripts/curl-test.sh

# Analyzujte výsledky
node testing/scripts/analyze-results.js
```
