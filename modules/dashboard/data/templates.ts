import { Templates } from "@prisma/client";
import {
  TemplateFile,
  TemplateFolder,
} from "@/modules/playground/lib/path-to-json";

export const STARTER_TEMPLATES: Record<
  Templates,
  (TemplateFile | TemplateFolder)[]
> = {
  [Templates.REACT]: [
    {
      name: "App.js",
      type: "file",
      content: `import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Hello React!</h1>
      <p>Start building your amazing app here.</p>
    </div>
  );
}

export default App;`,
    },
    {
      name: "index.js",
      type: "file",
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    },
    {
      name: "styles.css",
      type: "file",
      content: `body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }`,
    },
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "react-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
    },
  ],
  [Templates.NEXTJS]: [
    {
      folderName: "app",
      type: "folder",
      items: [
        {
          name: "page.js",
          type: "file",
          content: `export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Hello Next.js!</h1>
      <p>This is a server component by default.</p>
    </div>
  );
}`,
        },
        {
          name: "layout.js",
          type: "file",
          content: `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
        },
      ],
    },
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "next-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next dev",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.4.12",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  }
}`,
    },
  ],
  [Templates.EXPRESS]: [
    {
      name: "index.js",
      type: "file",
      content: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`);
});`,
    },
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "express-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}`,
    },
  ],
  [Templates.VUE]: [
    {
      name: "App.vue",
      type: "file",
      content: `<template>
  <div class="hello">
    <h1>Hello Vue!</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Welcome to your Vue.js playground!'
    }
  }
}
</script>

<style>
.hello {
  font-family: sans-serif;
  padding: 20px;
}
</style>`,
    },
    {
      name: "main.js",
      type: "file",
      content: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')`,
    },
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "vue-app",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "vite"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "vite": "^4.4.5"
  }
}`,
    },
    {
      name: "vite.config.js",
      type: "file",
      content: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})`,
    },
  ],
  [Templates.HONO]: [
    {
      name: "index.ts",
      type: "file",
      content: `import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(\`Server is running on port \${port}\`)

serve({
  fetch: app.fetch,
  port
})`,
    },
    {
      name: "package.json",
      type: "file",
      content: `{
  "scripts": {
    "dev": "tsx watch index.ts",
    "start": "tsx watch index.ts"
  },
  "dependencies": {
    "hono": "^3.4.1",
    "@hono/node-server": "^1.2.0"
  },
  "devDependencies": {
    "tsx": "^3.12.7"
  }
}`,
    },
  ],
  [Templates.ANGULAR]: [
    {
      folderName: "src",
      type: "folder",
      items: [
        {
          name: "main.ts",
          type: "file",
          content: `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch(err => console.error(err));`,
        },
        {
          name: "index.html",
          type: "file",
          content: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
        },
        {
          name: "styles.css",
          type: "file",
          content: `/* Add application styles & imports to this file! */`,
        },
        {
          folderName: "app",
          type: "folder",
          items: [
            {
              name: "app.component.ts",
              type: "file",
              content: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Hello Angular!</h1>
      <p>Start building your app.</p>
    </div>
  \`,
  styles: []
})
export class AppComponent {
  title = 'angular-playground';
}`,
            },
          ],
        },
      ],
    },
    {
      name: "angular.json",
      type: "file",
      content: `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-app": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/angular-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "angular-app:build:production"
            },
            "development": {
              "browserTarget": "angular-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "angular-app:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.spec.json",
            "assets": ["src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          }
        }
      }
    }
  }
}`,
    },
    {
      name: "tsconfig.json",
      type: "file",
      content: `{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}`,
    },
    {
      name: "tsconfig.app.json",
      type: "file",
      content: `{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}`,
    },
    {
      name: "package.json",
      type: "file",
      content: `{
  "name": "angular-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve --host 0.0.0.0",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "^16.2.0",
    "@angular/common": "^16.2.0",
    "@angular/compiler": "^16.2.0",
    "@angular/core": "^16.2.0",
    "@angular/forms": "^16.2.0",
    "@angular/platform-browser": "^16.2.0",
    "@angular/platform-browser-dynamic": "^16.2.0",
    "@angular/router": "^16.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^16.2.0",
    "@angular/cli": "^16.2.0",
    "@angular/compiler-cli": "^16.2.0",
    "@types/node": "^18.0.0",
    "typescript": "~5.1.3"
  }
}`,
    },
  ],
};
