const fs = require('fs');
const path = require('path');

// 1. Fix index.css
const cssFile = 'c:/laragon/www/Porto/gelbiasa.github.io/src/styles/index.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

// Ensure space-separated
cssContent = cssContent.replace(/--accent-rgb:\s*\d+,\s*\d+,\s*\d+;/g, (match) => {
    return match.replace(/,/g, '');
});

// Convert rgba(var(--accent-rgb), X) to rgb(var(--accent-rgb) / X)
cssContent = cssContent.replace(/rgba\(\s*var\(--accent-rgb\)\s*,\s*(0\.[0-9]+)\s*\)/g, 'rgb(var(--accent-rgb) / $1)');

// If my previous powershell script ruined it by producing rgb(var(--accent-rgb) / ), fix it:
cssContent = cssContent.replace(/rgb\(\s*var\(--accent-rgb\)\s*\/\s*\)/g, 'rgb(var(--accent-rgb) / 0.4)');

fs.writeFileSync(cssFile, cssContent, 'utf8');

// 2. Fix JSX files
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('c:/laragon/www/Porto/gelbiasa.github.io/src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // In Tailwind arbitrary classes, we MUST use rgb(var(--accent-rgb)/X) WITHOUT spaces!
    // If the file currently has rgba(var(--accent-rgb),0.5) we change it:
    let newContent = content.replace(/rgba\(\s*var\(--accent-rgb\)\s*,\s*(0\.[0-9]+)\s*\)/g, 'rgb(var(--accent-rgb)/$1)');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
    }
});

console.log("All fixes applied successfully.");
