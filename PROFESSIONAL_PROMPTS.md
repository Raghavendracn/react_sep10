# Professional Prompts for React MUI TypeScript Setup

## Quick Reference Guide

### 🚀 Project Initialization Prompts

```bash
# Create React TypeScript project
"Create a new React application with TypeScript template using Create React App"
npx create-react-app my-app --template typescript

# Install Material-UI dependencies
"Install Material-UI core packages and emotion styling for React TypeScript"
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### 🎨 MUI Integration Prompts

```bash
# AI Assistant Prompt
"Create a comprehensive React TypeScript component using Material-UI that demonstrates:
- ThemeProvider with light/dark mode switching
- AppBar, Toolbar, and Typography components
- Card layouts with Grid system
- Form handling with TextField validation
- List components with avatars and actions
- Snackbar notifications for user feedback
- Proper TypeScript interfaces for all props and state"
```

### 🔧 ESLint Configuration Prompts

```bash
# Package.json ESLint setup
"Configure ESLint in package.json with no-console and no-debugger rules for React TypeScript project"

# Standalone ESLint config
"Create a standalone .eslintrc.json file with React app extensions and strict code quality rules"
```

### 🛡️ Pre-commit Hooks Prompts

```bash
# Install dependencies
"Install Husky and lint-staged as development dependencies for git hook management"
npm install --save-dev husky lint-staged

# Initialize Husky
"Initialize Husky git hooks and configure pre-commit ESLint checking"
npx husky init

# Configure lint-staged
"Set up lint-staged in package.json to run ESLint --fix on staged TypeScript files"
```

### 💻 VS Code Configuration Prompts

```bash
# AI Assistant Prompt
"Create VS Code settings.json configuration for:
- ESLint validation on TypeScript files
- Auto-fix ESLint issues on save
- Import organization on save
- Consistent formatting and code style
- TypeScript preferences for single quotes"
```

### 📦 Git Repository Prompts

```bash
# Repository setup
"Initialize git repository, commit all files, and push to GitHub remote"
git init
git add .
git commit -m "Initial commit: React MUI TypeScript with ESLint enforcement"
git remote add origin https://github.com/username/repo.git
git push -u origin master
```

### 👥 Team Onboarding Prompts

```bash
# Team setup instructions
"Provide team members with complete setup instructions for cloning and running the React MUI TypeScript project with automatic ESLint enforcement"

# Verification prompt
"Verify that team members have proper ESLint enforcement by testing commits with console.log or debugger statements"
```

## 🎯 AI Assistant Master Prompts

### Complete Project Setup
```
"Create a production-ready React TypeScript application with Material-UI integration that includes:

1. Comprehensive MUI component showcase (AppBar, Cards, Forms, Lists, Themes)
2. ESLint configuration with no-console and no-debugger rules
3. Pre-commit hooks using Husky and lint-staged to prevent rule violations
4. VS Code settings for automatic code fixing and formatting
5. Complete TypeScript interfaces and proper type safety
6. Git repository setup with all configuration files
7. Team collaboration documentation

Ensure that no commits can be made with ESLint violations and provide step-by-step setup instructions for team members."
```

### ESLint Enforcement Setup
```
"Set up bulletproof ESLint enforcement for a React TypeScript project that:

1. Prevents console.log and debugger statements in production code
2. Blocks git commits containing ESLint violations
3. Auto-fixes issues in VS Code on save
4. Works consistently across all team members
5. Includes both package.json and standalone ESLint configurations

Provide complete configuration files and test the setup by attempting to commit code with violations."
```

### Team Collaboration Setup
```
"Configure a React TypeScript project for professional team collaboration with:

1. Consistent code quality standards using ESLint
2. Automated pre-commit hooks that prevent bad code from being committed
3. VS Code settings that work the same for all developers
4. Clear documentation for onboarding new team members
5. Git repository with all necessary configuration files

Ensure the setup is foolproof and works immediately after cloning the repository."
```

## 🔍 Verification Commands

```bash
# Test ESLint rules
npm start  # Should show errors for console.log/debugger

# Test pre-commit hooks
git add .
git commit -m "test"  # Should fail if violations exist

# Verify team setup
npm install  # Should set up hooks automatically
```

## 📋 Success Checklist

- ✅ React TypeScript project created
- ✅ Material-UI components integrated
- ✅ ESLint rules configured and enforced
- ✅ Pre-commit hooks prevent violations
- ✅ VS Code auto-fixes issues
- ✅ Git repository with all configs
- ✅ Team documentation complete
- ✅ Setup tested and verified
