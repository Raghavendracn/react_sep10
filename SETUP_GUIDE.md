# React MUI TypeScript Project Setup Guide

## Professional Step-by-Step Documentation

This guide provides comprehensive instructions for setting up a React application with TypeScript, Material-UI, and enforced code quality standards using ESLint and pre-commit hooks.

---

## Table of Contents

1. [Project Initialization](#1-project-initialization)
2. [Material-UI Integration](#2-material-ui-integration)
3. [ESLint Configuration](#3-eslint-configuration)
4. [Pre-commit Hooks Setup](#4-pre-commit-hooks-setup)
5. [VS Code Configuration](#5-vs-code-configuration)
6. [Git Repository Setup](#6-git-repository-setup)
7. [Team Onboarding](#7-team-onboarding)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Project Initialization

### Step 1.1: Create React TypeScript Project

**Prompt**: "Create a new React application with TypeScript template"

```bash
npx create-react-app my-react-mui-app --template typescript
cd my-react-mui-app
```

**Expected Output**: 
- New React project with TypeScript configuration
- `tsconfig.json` file with TypeScript settings
- `src/` directory with `.tsx` files

### Step 1.2: Verify Project Structure

**Prompt**: "Verify the initial project structure is correct"

```bash
ls -la
```

**Expected Files**:
```
├── public/
├── src/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 2. Material-UI Integration

### Step 2.1: Install MUI Dependencies

**Prompt**: "Install Material-UI core packages and dependencies for React TypeScript project"

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

**Dependencies Installed**:
- `@mui/material` - Core MUI components
- `@emotion/react` - CSS-in-JS library
- `@emotion/styled` - Styled components
- `@mui/icons-material` - Material Design icons

### Step 2.2: Add Roboto Font and Material Icons

**Prompt**: "Add Google Fonts and Material Icons to the HTML head"

Update `public/index.html`:
```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

### Step 2.3: Create Sample MUI Application

**Prompt**: "Create a comprehensive React component using Material-UI components with TypeScript interfaces"

Key components to include:
- ThemeProvider with light/dark mode
- AppBar and Toolbar
- Cards and Grid layout
- Forms with TextField validation
- Lists with avatars and actions
- Snackbar notifications
- Floating Action Button

---

## 3. ESLint Configuration

### Step 3.1: Configure ESLint Rules in package.json

**Prompt**: "Add ESLint configuration to enforce code quality standards"

Add to `package.json`:
```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules": {
      "no-console": "error",
      "no-debugger": "error"
    }
  }
}
```

### Step 3.2: Create Standalone ESLint Configuration

**Prompt**: "Create a standalone ESLint configuration file for better team collaboration"

Create `.eslintrc.json`:
```json
{
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "no-console": "error",
    "no-debugger": "error"
  }
}
```

### Step 3.3: Test ESLint Rules

**Prompt**: "Verify ESLint rules are working by testing with prohibited statements"

```bash
npm start
```

Add `console.log("test");` to any component and verify it shows as an error.

---

## 4. Pre-commit Hooks Setup

### Step 4.1: Install Husky and Lint-staged

**Prompt**: "Install development dependencies for git hooks and staged file linting"

```bash
npm install --save-dev husky lint-staged
```

### Step 4.2: Initialize Husky

**Prompt**: "Initialize Husky for git hooks management"

```bash
npx husky init
```

### Step 4.3: Configure Package.json Scripts

**Prompt**: "Add Husky prepare script and lint-staged configuration to package.json"

Add to `package.json`:
```json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --fix"
    ]
  }
}
```

### Step 4.4: Configure Pre-commit Hook

**Prompt**: "Set up pre-commit hook to run ESLint on staged files"

Update `.husky/pre-commit`:
```bash
npx lint-staged
```

### Step 4.5: Test Pre-commit Hook

**Prompt**: "Test pre-commit hook by attempting to commit code with ESLint violations"

```bash
# Add debugger statement to any file
git add .
git commit -m "Test commit with violations"
# Should fail with ESLint errors
```

---

## 5. VS Code Configuration

### Step 5.1: Create VS Code Settings

**Prompt**: "Configure VS Code for automatic ESLint fixing and TypeScript support"

Create `.vscode/settings.json`:
```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript", 
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.quoteStyle": "single",
  "javascript.preferences.quoteStyle": "single",
  "editor.rulers": [80],
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}
```

---

## 6. Git Repository Setup

### Step 6.1: Initialize Git Repository

**Prompt**: "Initialize git repository and set up remote origin"

```bash
git init
git add .
git commit -m "Initial commit: React MUI TypeScript application with ESLint enforcement"
```

### Step 6.2: Add Remote Repository

**Prompt**: "Connect local repository to GitHub remote"

```bash
git remote add origin https://github.com/username/repository-name.git
git push -u origin master
```

---

## 7. Team Onboarding

### Step 7.1: Clone and Setup Instructions

**Prompt**: "Provide team members with repository setup instructions"

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
npm install
npm start
```

### Step 7.2: Verify Team Setup

**Prompt**: "Ensure team members have proper ESLint enforcement"

Team members should verify:
- ESLint errors appear in IDE
- Pre-commit hooks prevent commits with violations
- Auto-fixing works on save

---

## 8. Troubleshooting

### Common Issues and Solutions

#### Issue: Pre-commit hook not running
**Solution**: 
```bash
npx husky install
chmod +x .husky/pre-commit
```

#### Issue: ESLint not showing errors in IDE
**Solution**: 
- Install ESLint VS Code extension
- Restart VS Code
- Check `.vscode/settings.json` configuration

#### Issue: Commits still going through with violations
**Solution**: 
- Verify `.husky/pre-commit` contains `npx lint-staged`
- Check `lint-staged` configuration in `package.json`
- Test with `npx lint-staged` manually

---

## Professional Prompts Summary

### For AI Assistants:

1. **Project Creation**: "Create a React TypeScript application with Material-UI integration, including comprehensive component examples and proper TypeScript interfaces"

2. **ESLint Setup**: "Configure ESLint with no-console and no-debugger rules, create both package.json and standalone configurations for team collaboration"

3. **Pre-commit Hooks**: "Set up Husky and lint-staged to prevent commits with ESLint violations, ensuring code quality enforcement at the git level"

4. **VS Code Integration**: "Configure VS Code settings for automatic ESLint fixing, import organization, and TypeScript development optimization"

5. **Team Setup**: "Create comprehensive documentation and configuration files that ensure consistent development environment across all team members"

### For Manual Setup:

Each step includes specific commands, expected outputs, and verification steps to ensure proper configuration.

---

## Success Criteria

✅ React TypeScript project with MUI components  
✅ ESLint rules enforced during development  
✅ Pre-commit hooks prevent rule violations  
✅ VS Code auto-fixes ESLint issues  
✅ Team members get consistent setup  
✅ Git repository with all configurations  

This setup ensures professional-grade code quality and team collaboration standards.
