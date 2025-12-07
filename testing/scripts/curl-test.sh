#!/bin/bash

# HTTP Protocol Performance Testing with curl
# This script tests HTTP/1.1, HTTP/2, and HTTP/3 performance

# Configuration
SITE="https://your-site.pages.dev"  # Replace with your deployed site URL
ITERATIONS=10
OUTPUT_DIR="testing/results/raw"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}HTTP Protocol Performance Test${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Test URLs
URLS=(
  "$SITE/test/light"
  "$SITE/test/heavy"
  "$SITE/test/many"
)

SCENARIO_NAMES=("light" "heavy" "many")

# Function to test a URL with specific protocol
test_url() {
  local url=$1
  local protocol=$2
  local protocol_flag=$3
  local output_file=$4
  local scenario=$5

  echo -e "${YELLOW}Testing $scenario with $protocol...${NC}"

  for i in $(seq 1 $ITERATIONS); do
    echo -n "  Iteration $i/$ITERATIONS... "

    # Run curl with timing and save results
    result=$(curl -o /dev/null -s -w "%{time_total},%{time_connect},%{time_starttransfer},%{size_download},%{http_version}\n" \
      $protocol_flag \
      "$url" 2>&1)

    if [ $? -eq 0 ]; then
      echo "$protocol,$scenario,$result" >> "$output_file"
      echo -e "${GREEN}OK${NC}"
    else
      echo -e "${RED}FAILED${NC}"
      echo "$protocol,$scenario,error,error,error,error,error" >> "$output_file"
    fi

    # Small delay between requests
    sleep 0.5
  done

  echo ""
}

# Test HTTP/1.1
echo -e "${BLUE}--- Testing HTTP/1.1 ---${NC}"
HTTP1_FILE="$OUTPUT_DIR/http1.txt"
echo "protocol,scenario,time_total,time_connect,time_starttransfer,size_download,http_version" > "$HTTP1_FILE"

for i in "${!URLS[@]}"; do
  test_url "${URLS[$i]}" "HTTP/1.1" "--http1.1" "$HTTP1_FILE" "${SCENARIO_NAMES[$i]}"
done

# Test HTTP/2
echo -e "${BLUE}--- Testing HTTP/2 ---${NC}"
HTTP2_FILE="$OUTPUT_DIR/http2.txt"
echo "protocol,scenario,time_total,time_connect,time_starttransfer,size_download,http_version" > "$HTTP2_FILE"

for i in "${!URLS[@]}"; do
  test_url "${URLS[$i]}" "HTTP/2" "--http2" "$HTTP2_FILE" "${SCENARIO_NAMES[$i]}"
done

# Test HTTP/3 (if supported)
echo -e "${BLUE}--- Testing HTTP/3 ---${NC}"
HTTP3_FILE="$OUTPUT_DIR/http3.txt"
echo "protocol,scenario,time_total,time_connect,time_starttransfer,size_download,http_version" > "$HTTP3_FILE"

# Check if curl supports HTTP/3
if curl --http3 --version &> /dev/null; then
  for i in "${!URLS[@]}"; do
    test_url "${URLS[$i]}" "HTTP/3" "--http3" "$HTTP3_FILE" "${SCENARIO_NAMES[$i]}"
  done
else
  echo -e "${YELLOW}Warning: Your curl version doesn't support HTTP/3${NC}"
  echo -e "${YELLOW}Skipping HTTP/3 tests${NC}"
  echo "HTTP/3 not supported by curl" > "$HTTP3_FILE"
fi

# Summary
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Testing Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Results saved in: $OUTPUT_DIR"
echo ""
echo "Files created:"
echo "  - $HTTP1_FILE"
echo "  - $HTTP2_FILE"
echo "  - $HTTP3_FILE"
echo ""
echo -e "${BLUE}Run the analyzer script to process results:${NC}"
echo "  node testing/scripts/analyze-results.js"
