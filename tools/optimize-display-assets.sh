#!/bin/sh

set -eu

if [ "${ALLOW_LOSSY_IMAGE_OPTIMIZATION:-}" != "1" ]; then
  echo "Refusing to recompress display images without ALLOW_LOSSY_IMAGE_OPTIMIZATION=1"
  exit 1
fi

optimize_jpegs() {
  folder=$1
  max_size=$2
  quality=$3

  [ -d "$folder" ] || return 0

  find "$folder" -type f \( -name "*.jpg" -o -name "*.jpeg" \) | while IFS= read -r image; do
    tmp="${image}.tmp.jpg"

    sips -s format jpeg \
      -s formatOptions "$quality" \
      -Z "$max_size" \
      "$image" \
      --out "$tmp" >/dev/null

    mv "$tmp" "$image"
  done
}

optimize_jpegs "assets/media/hero-display" 1800 88
optimize_jpegs "assets/media/block-2/gallery-display" 1400 88
optimize_jpegs "assets/media/block-3/display" 1800 88
optimize_jpegs "assets/media/block-4/display" 1600 88

echo "Display assets optimized"
