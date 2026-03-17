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
      let changed = false;

      // Replace fetch("/api/admin/...") with fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/...`, { credentials: "include" })
      // This is a bit tricky due to existing options. Let's use a regex carefully.

      // First, handle fetch("/api/auth/login", { ... })
      // and fetch(`/api/admin/...`, { ... })

      const fetchRegex = /fetch\(([`'"])\/api\/([^`'"]+)\1(?:,\s*(\{[\s\S]*?\}))?\)/g;
      
      content = content.replace(fetchRegex, (match, quote, endpoint, optionsStr) => {
        changed = true;
        
        let hasCredentials = false;
        let newOptionsStr = optionsStr;

        const needsAuth = endpoint.startsWith('admin/') || endpoint.startsWith('auth/');

        if (needsAuth) {
          if (newOptionsStr) {
            if (!newOptionsStr.includes('credentials')) {
              newOptionsStr = newOptionsStr.replace(/}\s*$/, ', credentials: "include" }');
            }
          } else {
            newOptionsStr = '{ credentials: "include" }';
          }
        }

        const newEndpoint = `\`\${process.env.NEXT_PUBLIC_API_URL}/\${"${endpoint}"}\``;
        
        if (newOptionsStr) {
          return `fetch(${newEndpoint}, ${newOptionsStr})`;
        } else {
          return `fetch(${newEndpoint})`;
        }
      });

      // Special case where the URL itself has variables, e.g. `/api/admin/locations/${id}`
      // The regex above might not catch `...` with template literals that contain ${...}.
      const templateRegex = /fetch\(`\/api\/(.*?)`((?:,\s*\{[\s\S]*?\})?)\)/g;
      content = content.replace(templateRegex, (match, pathInside, optionsStr) => {
        changed = true;
        let newOptionsStr = optionsStr ? optionsStr.replace(/^,\s*/, '') : '';
        const needsAuth = pathInside.startsWith('admin/') || pathInside.startsWith('auth/');

        if (needsAuth) {
          if (newOptionsStr) {
            if (!newOptionsStr.includes('credentials')) {
              newOptionsStr = newOptionsStr.replace(/}\s*$/, ', credentials: "include" }');
            }
          } else {
            newOptionsStr = '{ credentials: "include" }';
          }
        }

        const newEndpoint = `\`\${process.env.NEXT_PUBLIC_API_URL}/${pathInside}\``;

        if (newOptionsStr) {
          return `fetch(${newEndpoint}, ${newOptionsStr})`;
        } else {
          return `fetch(${newEndpoint})`;
        }
      });

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(process.cwd(), 'src'));
