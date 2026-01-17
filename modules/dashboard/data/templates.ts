import { Templates } from "@prisma/client";

export const STARTER_TEMPLATES: Record<
  Templates,
  { name: string; content: string }[]
> = {
  [Templates.REACT]: [
    {
      name: "App.js",
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
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
    },
    {
      name: "styles.css",
      content: `body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }`,
    },
  ],
  [Templates.NEXTJS]: [
    {
      name: "page.js",
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
      content: `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
    },
  ],
  [Templates.EXPRESS]: [
    {
      name: "index.js",
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
  ],
  [Templates.VUE]: [
    {
      name: "App.vue",
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
      content: `import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')`,
    },
  ],
  [Templates.HONO]: [
    {
      name: "index.ts",
      content: `import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app`,
    },
  ],
  [Templates.ANGULAR]: [
    {
      name: "app.component.ts",
      content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
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
    {
      name: "main.ts",
      content: `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent).catch(err => console.error(err));`,
    },
  ],
};
