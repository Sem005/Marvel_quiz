const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const extensions = new Set([".js", ".jsx", ".ts", ".tsx"]);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!extensions.has(path.extname(entry.name))) {
      continue;
    }

    const buffer = fs.readFileSync(fullPath);
    const hasBom =
      buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf;

    if (hasBom) {
      fs.writeFileSync(fullPath, buffer.subarray(3));
      console.log(`Removed BOM from ${path.relative(root, fullPath)}`);
    }
  }
}

walk(path.join(root, "src"));
