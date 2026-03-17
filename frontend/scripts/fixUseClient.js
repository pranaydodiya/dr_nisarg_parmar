import fs from 'fs';
import path from 'path';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Check if "use client" or 'use client' is pushed down
      if (
        (content.includes('"use client"') || content.includes("'use client'")) &&
        !content.trim().startsWith('"use client"') &&
        !content.trim().startsWith("'use client'")
      ) {
        console.log(`Fixing ${fullPath}`);
        
        let clientStr = content.includes('"use client"') ? '"use client";\n' : "'use client';\n";
        
        // Remove existing "use client" (with optional semi-colon and newlines)
        content = content.replace(/["']use client["'];?\s*/g, '');

        // Prepend correctly
        content = clientStr + content;

        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDirectory(path.join(process.cwd(), 'src'));
