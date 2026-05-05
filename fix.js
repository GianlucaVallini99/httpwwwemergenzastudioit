const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix canonical: SITE_URL
      content = content.replace(/canonical:\s*SITE_URL(,?)/g, 'canonical: `${SITE_URL}/`$1');
      
      // Fix languages: { it: SITE_URL }
      content = content.replace(/languages:\s*{\s*it:\s*SITE_URL\s*}/g, 'languages: { it: `${SITE_URL}/` }');
      
      // Fix template string canonicals: `${SITE_URL}/something` -> `${SITE_URL}/something/`
      // But only if it doesn't already end with a slash or trailing variable interpolation
      // Using regex replace where string doesn't end with slash before backtick
      content = content.replace(/canonical:\s*`([^`]+)`(,?\s*)/g, (match, p1, p2) => {
        if (!p1.endsWith('/') && !p1.endsWith('}')) {
          return `canonical: \`${p1}/\`${p2}`;
        }
        // In case of `${SITE_URL}/blog/${article.slug}`, we want it to become `${SITE_URL}/blog/${article.slug}/`
        if (p1.endsWith('}')) {
           return `canonical: \`${p1}/\`${p2}`;
        }
        return match;
      });

      // Fix hardcoded string canonicals
      content = content.replace(/canonical:\s*"([^"]+)"(,?\s*)/g, (match, p1, p2) => {
        if (!p1.endsWith('/')) {
          return `canonical: "${p1}/"${p2}`;
        }
        return match;
      });

      fs.writeFileSync(fullPath, content);
    }
  });
}

processDir('./src/app');
console.log('Fixed canonicals in src/app');
