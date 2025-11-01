#!/bin/bash

# Fix all JSX/JS files by removing TypeScript syntax

find app -type f \( -name "*.jsx" -o -name "*.js" \) | while read file; do
    echo "Processing: $file"

    # Create backup
    cp "$file" "$file.bak"

    # Remove TypeScript syntax using sed
    sed -i 's/{ \([^}]*\) }: [^)]*)/{ \1 }/g' "$file"
    sed -i 's/({ \([^}]*\) }: [^)]*)/({ \1 })/g' "$file"
    sed -i 's/\([a-zA-Z_][a-zA-Z0-9_]*\)?: [A-Z][a-zA-Z0-9<>\[\]|]*/\1/g' "$file"
    sed -i 's/useState<[^>]*>/useState/g' "$file"
    sed -i 's/\[\] = useState/= useState/g' "$file"
    sed -i '/^\/\/ interface/,/^\/\/ }$/d' "$file"
    sed -i 's/(e$/async (e) {/g' "$file"
    sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\): [^=]*=/const \1 =/g' "$file"

    # Remove commented interface lines
    sed -i '/\/\/ interface/d' "$file"
    sed -i '/blog: IBlog/d' "$file"
    sed -i '/blogId;/d' "$file"

    echo "Fixed: $file"
done

echo "All files processed!"
