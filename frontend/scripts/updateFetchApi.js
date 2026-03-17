import fs from 'fs';
import path from 'path';

const API_FILE = path.join(process.cwd(), 'src/lib/api-client.ts');
const apiContent = `export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const needsAuth = endpoint.startsWith("/admin") || endpoint.startsWith("/auth");
  const defaultOptions: RequestInit = {};

  if (needsAuth) {
    defaultOptions.credentials = "include";
  }

  // Handle absolute URL cases if someone passes something else, though unlikely.
  return fetch(\`\${NEXT_PUBLIC_API_URL}\${endpoint}\`, {
    ...defaultOptions,
    ...options,
  });
}
`;
fs.writeFileSync(API_FILE, apiContent);

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (!content.includes('fetch("/api/') && !content.includes('fetch(`/api/')) {
        continue;
      }

      console.log(`Updating ${fullPath}`);

      // Add import
      // calculate relative path to src/lib/api-client.ts
      const libPath = path.resolve(process.cwd(), 'src/lib/api-client.ts');
      // For Next.js we can just use '@/lib/api-client'
      const importStatement = `import { fetchApi } from "@/lib/api-client";\n`;
      if (!content.includes('fetchApi')) {
        content = importStatement + content;
      }

      // Replace fetch("/api/xxx") with fetchApi("/xxx")
      content = content.replace(/fetch\("(\/api[^"]*)"/g, (match, endpoint) => {
        return `fetchApi("${endpoint.replace('/api', '')}"`;
      });
      // Replace fetch(`/api/xxx`) with fetchApi(`/xxx`)
      content = content.replace(/fetch\(`(\/api[^`]*)`/g, (match, endpoint) => {
        return `fetchApi(\`${endpoint.replace('/api', '')}\``;
      });

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Saved ${fullPath}`);
    }
  }
}

processDirectory(path.join(process.cwd(), 'src'));
