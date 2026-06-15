#!/bin/sh

set -eu

source_folder="assets/media/hero"
display_folder="assets/media/hero-display"

mkdir -p "$display_folder"
rm -f "$display_folder"/*

for source in "$source_folder"/*; do
  [ -f "$source" ] || continue

  filename=$(basename "$source")
  name=${filename%.*}
  extension=$(printf '%s' "${filename##*.}" | tr '[:upper:]' '[:lower:]')

  if [ "$extension" = "jpg" ] || [ "$extension" = "jpeg" ]; then
    cp "$source" "$display_folder/$name.jpg"
  else
    sips -s format jpeg \
      -s formatOptions 98 \
      "$source" \
      --out "$display_folder/$name.jpg" >/dev/null
  fi
done

echo "Hero optimized into $display_folder"
