# Workspace Rules Management System

## Overview

This workspace rules system provides a modular, reusable approach to maintaining consistent development standards across multiple projects. Instead of duplicating configuration files, you can maintain centralized rules and apply them to any project.

## 📁 Folder Structure

```
workspace-rules/
├── eslint/                    # ESLint rule modules
│   ├── base.json             # Base ESLint rules
│   ├── react.json            # React-specific rules
│   ├── typescript.json       # TypeScript rules
│   └── import-rules.json     # Import organization rules
├── prettier/                  # Prettier configurations
│   ├── base.json             # Base formatting rules
│   └── react.json            # React/JSX formatting
├── typescript/                # TypeScript configurations
│   ├── base.json             # Base TypeScript config
│   └── react.json            # React TypeScript config
├── vscode/                    # VS Code settings
│   ├── base-settings.json    # Base editor settings
│   ├── react-settings.json   # React development settings
│   └── extensions.json       # Recommended extensions
├── templates/                 # Project templates
│   ├── react-typescript.json # React TypeScript template
│   └── vanilla-typescript.json # Basic TypeScript template
└── scripts/                   # Automation scripts
    ├── apply-rules.js        # Node.js rule applier
    └── setup-workspace.ps1   # PowerShell setup script
```

## 🚀 Quick Start

### Method 1: Using Node.js Script

```bash
# List available templates
node workspace-rules/scripts/apply-rules.js list

# Apply React TypeScript template to current directory
node workspace-rules/scripts/apply-rules.js apply react-typescript

# Apply to specific directory
node workspace-rules/scripts/apply-rules.js apply react-typescript ./my-new-project
```

### Method 2: Using PowerShell Script (Windows)

```powershell
# Apply template to current directory
.\workspace-rules\scripts\setup-workspace.ps1 -Template react-typescript

# Apply to specific directory
.\workspace-rules\scripts\setup-workspace.ps1 -Template react-typescript -TargetPath "C:\Projects\MyApp"
```

## 📋 Available Templates

### `react-typescript`
Complete setup for React TypeScript projects with:
- ESLint with React and TypeScript rules
- Prettier with JSX support
- TypeScript with React configuration
- VS Code settings optimized for React development
- Import organization and path mapping

### `vanilla-typescript`
Basic TypeScript project setup with:
- ESLint with TypeScript rules
- Prettier formatting
- TypeScript configuration
- VS Code settings for TypeScript development

## 🔧 Manual Configuration

### Applying Individual Rule Modules

You can manually copy and merge specific rule modules:

```bash
# Copy base ESLint rules
cp workspace-rules/eslint/base.json .eslintrc.json

# Merge React rules (manual merge required)
# Copy content from workspace-rules/eslint/react.json and merge
```

### Creating Custom Templates

1. Create a new template file in `workspace-rules/templates/`:

```json
{
  "name": "My Custom Template",
  "description": "Description of the template",
  "files": {
    ".eslintrc.json": {
      "source": "../eslint/base.json",
      "merge": ["../eslint/import-rules.json"]
    },
    ".prettierrc.json": {
      "source": "../prettier/base.json"
    }
  },
  "scripts": {
    "lint": "eslint . --ext .ts",
    "format": "prettier --write ."
  },
  "dependencies": {
    "devDependencies": ["eslint", "prettier"]
  }
}
```

2. Apply your custom template:

```bash
node workspace-rules/scripts/apply-rules.js apply my-custom-template
```

## 📝 Rule Modules Explained

### ESLint Modules

- **`base.json`**: Core ESLint rules (no-console, no-debugger, etc.)
- **`react.json`**: React-specific rules (hooks, JSX best practices)
- **`typescript.json`**: TypeScript rules (type safety, unused variables)
- **`import-rules.json`**: Import organization and sorting rules

### Prettier Modules

- **`base.json`**: Standard formatting (semicolons, quotes, indentation)
- **`react.json`**: JSX-specific formatting options

### TypeScript Modules

- **`base.json`**: Strict TypeScript configuration
- **`react.json`**: React-specific TypeScript settings with path mapping

### VS Code Modules

- **`base-settings.json`**: General editor settings
- **`react-settings.json`**: React development optimizations
- **`extensions.json`**: Recommended VS Code extensions

## 🔄 Updating Rules

### Centralized Updates

1. Modify rules in the appropriate module file
2. Re-apply templates to existing projects:

```bash
node workspace-rules/scripts/apply-rules.js apply react-typescript
```

### Version Control

Keep the `workspace-rules` folder in version control to:
- Track rule changes over time
- Share consistent rules across team members
- Maintain rule history and rollback capability

## 🎯 Benefits

✅ **Centralized Management**: Maintain all rules in one location  
✅ **Consistency**: Apply same rules across all projects  
✅ **Modularity**: Mix and match rule modules as needed  
✅ **Automation**: Scripts handle complex merging and setup  
✅ **Scalability**: Easy to add new templates and rules  
✅ **Team Collaboration**: Share rules via version control  

## 🛠️ Advanced Usage

### Custom Rule Combinations

Create project-specific combinations by merging modules:

```json
{
  "files": {
    ".eslintrc.json": {
      "merge": [
        "../eslint/base.json",
        "../eslint/react.json", 
        "../eslint/typescript.json",
        "../eslint/import-rules.json"
      ]
    }
  }
}
```

### Environment-Specific Rules

Create different rule sets for different environments:

```
workspace-rules/
├── eslint/
│   ├── development.json
│   ├── production.json
│   └── testing.json
```

### Integration with CI/CD

Add workspace rule validation to your CI pipeline:

```yaml
# .github/workflows/validate-rules.yml
- name: Validate Workspace Rules
  run: |
    node workspace-rules/scripts/apply-rules.js apply react-typescript --dry-run
    npm run lint
    npm run format:check
```

## 📚 Examples

### Setting up a new React project

```bash
# Create new project
npx create-react-app my-app --template typescript
cd my-app

# Apply workspace rules
node ../workspace-rules/scripts/apply-rules.js apply react-typescript

# Install required dependencies
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks prettier

# Verify setup
npm run lint
npm run format:check
```

### Updating existing project

```bash
# Backup current configuration
cp .eslintrc.json .eslintrc.json.backup

# Apply updated rules
node workspace-rules/scripts/apply-rules.js apply react-typescript

# Review and commit changes
git diff
git add .
git commit -m "Update workspace rules"
```

This modular approach ensures consistent, maintainable development standards across your entire workspace while providing flexibility for project-specific needs.
