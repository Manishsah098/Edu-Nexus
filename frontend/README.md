# React + TypeScript + Vite

A modern React application built with **TypeScript** and **Vite**, providing a fast and efficient development environment with **Hot Module Replacement (HMR)**, **React Compiler**, and **Oxlint** for code quality and consistency.

## 🚀 Tech Stack

* **React** – UI development
* **TypeScript** – Type-safe JavaScript
* **Vite** – Fast development and build tooling
* **React Compiler** – Automatic React optimization
* **Oxlint** – High-performance JavaScript and TypeScript linting

## ⚡ Official React Plugins

Vite provides two official React plugins:

* **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)** – Uses [Oxc](https://oxc.rs/) for fast React transformation.
* **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react-swc)** – Uses [SWC](https://swc.rs/) for high-performance compilation.

## ⚛️ React Compiler

The **React Compiler** is enabled by default in this template. It automatically optimizes React applications by reducing unnecessary re-renders and improving application performance.

For more information, refer to the [React Compiler documentation](https://react.dev/learn/react-compiler).

> **Note:** Enabling the React Compiler may increase development and production build times.

## 🔍 Oxlint Configuration

For production applications, it is recommended to enable **type-aware linting** by installing `oxlint-tsgolint` and updating the `.oxlintrc.json` configuration.

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": [
      "warn",
      {
        "allowConstantExport": true
      }
    ]
  }
}
```

For a complete list of available rules and configuration options, see the [Oxlint documentation](https://oxc.rs/docs/guide/usage/linter/rules).

## 📦 Getting Started

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── assets/        # Static assets
├── components/    # Reusable React components
├── App.tsx        # Root application component
├── main.tsx       # Application entry point
└── ...
```

## 🛠️ Development

This project is designed to provide a clean and scalable foundation for building modern React applications. TypeScript ensures type safety, Vite provides a fast development experience, and Oxlint helps maintain consistent and reliable code quality.

## 📄 License

This project is available for personal and educational use. Add an appropriate license if you plan to distribute or open-source the project.
