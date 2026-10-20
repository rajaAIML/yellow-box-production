#!/bin/bash
# Generates cinematic SVG placeholder images for all photo categories

BASE="/Users/raja/Projects/yellow-box-production/public/images"

generate_svg() {
  local path="$1"
  local title="$2"
  local hue="$3"
  local sub="$4"
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${hue},15%,8%)"/>
      <stop offset="50%" style="stop-color:hsl(${hue},20%,14%)"/>
      <stop offset="100%" style="stop-color:hsl(${hue},10%,6%)"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" style="stop-color:hsl(${hue},40%,25%);stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:hsl(${hue},40%,25%);stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1200" fill="url(#bg)"/>
  <rect width="1600" height="1200" fill="url(#glow)"/>
  <text x="800" y="560" text-anchor="middle" fill="#666" font-family="system-ui,sans-serif" font-size="28" letter-spacing="8">${title}</text>
  <text x="800" y="610" text-anchor="middle" fill="#444" font-family="system-ui,sans-serif" font-size="14" letter-spacing="4">${sub}</text>
  <rect x="700" y="640" width="200" height="2" fill="#ffc700" opacity="0.5"/>
</svg>
EOF
}

generate_svg "$BASE/hero/hero-01.svg" "YELLOW BOX" "45" "HERO PLACEHOLDER"
generate_svg "$BASE/travel/himalayan-silence.svg" "HIMALAYAN SILENCE" "200" "TRAVEL"
generate_svg "$BASE/travel/coastal-drift.svg" "COASTAL DRIFT" "190" "TRAVEL"
generate_svg "$BASE/portraits/quiet-confidence.svg" "QUIET CONFIDENCE" "30" "PORTRAITS"
generate_svg "$BASE/portraits/soft-gaze.svg" "SOFT GAZE" "25" "PORTRAITS"
generate_svg "$BASE/weddings/golden-vows.svg" "GOLDEN VOWS" "40" "WEDDINGS"
generate_svg "$BASE/weddings/first-dance.svg" "FIRST DANCE" "35" "WEDDINGS"
generate_svg "$BASE/fashion/monochrome-motion.svg" "MONOCHROME MOTION" "0" "FASHION"
generate_svg "$BASE/fashion/velvet-shadow.svg" "VELVET SHADOW" "280" "FASHION"
generate_svg "$BASE/events/neon-pulse.svg" "NEON PULSE" "300" "EVENTS"
generate_svg "$BASE/events/stage-light.svg" "STAGE LIGHT" "260" "EVENTS"
generate_svg "$BASE/street/urban-rhythm.svg" "URBAN RHYTHM" "210" "STREET"
generate_svg "$BASE/street/rain-reflection.svg" "RAIN REFLECTION" "220" "STREET"

echo "Generated placeholder images in $BASE"
