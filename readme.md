# Music Inventory App

## Table of Content

- [Running App](#running-app)
- [Node-TypeScript Setup](#node-typescript-setup)

## Running App

In your terminal:

```bash
cd <folder directory>
npm install
npm run dev
```

## Node-TypeScript Setup

### Initialize app

```bash
mkdir music_inventory
cd music_inventory
npm init -y
```

### Install dependencies

Typically, TypeScript is used during development to check your code for errors and convert it to JavaScript before it's deployed. So, in that sense, it aligns with the definition of a development dependency.

```bash
npm i -D typescript ts-node nodemon
```

__ts-node__ utilizes a JIT (just-in-time) transformer to convert TypeScript code into JavaScript, facilitating the direct execution of TypeScript on Node.js without requiring prior compilation.

__nodemon__ watches for file changes in your source code and automatically restarts your server.

### tsConfig

Create a `tsconfig.json` file in the root directory. Paste the following code into it.

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": ".",
        "paths": {
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        }
    },
    "include": [
        "src/**/*"
    ]
}
```

Overall, this configuration defines a TypeScript project that:

- Uses CommonJS modules with ES module interop for compatibility.
- Targets ES6 for compiled JavaScript.
- Enforces strict type checking.
- Uses Node.js module resolution strategy.
- Generates source maps for debugging.
- Compiles source files from src to a separate dist directory.
- Has custom paths for resolving modules in node_modules and for custom type definitions in src/types.

### Update Script

Before proceeding create a `src` directory. In it create an `app.ts` file, we would make reference to this file in our `package.json`.

In your `package.json` look for scripts, then add the following code.

```json
{
    // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "ts-node src/app.ts",
    "dev": "nodemon src/app.ts"
  }
}
```

Now to run the app, enter command in the terminal:

```bash
npm run dev
```
