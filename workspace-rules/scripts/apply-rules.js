#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class WorkspaceRulesApplier {
  constructor() {
    this.rulesDir = path.join(__dirname, '..');
    this.templatesDir = path.join(this.rulesDir, 'templates');
  }

  async applyTemplate(templateName, targetDir = process.cwd()) {
    const templatePath = path.join(this.templatesDir, `${templateName}.json`);
    
    if (!fs.existsSync(templatePath)) {
      console.error(`❌ Template '${templateName}' not found`);
      process.exit(1);
    }

    const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    console.log(`🚀 Applying template: ${template.name}`);
    console.log(`📝 ${template.description}`);

    // Create directories if they don't exist
    this.ensureDirectories(targetDir, template.files);

    // Apply configuration files
    await this.applyFiles(template.files, targetDir);

    // Update package.json if needed
    if (template.scripts || template.dependencies) {
      await this.updatePackageJson(template, targetDir);
    }

    console.log('✅ Workspace rules applied successfully!');
    
    if (template.dependencies && template.dependencies.devDependencies) {
      console.log('\n📦 Install required dependencies:');
      console.log(`npm install --save-dev ${template.dependencies.devDependencies.join(' ')}`);
    }
  }

  ensureDirectories(targetDir, files) {
    Object.keys(files).forEach(filePath => {
      const fullPath = path.join(targetDir, filePath);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async applyFiles(files, targetDir) {
    for (const [filePath, config] of Object.entries(files)) {
      const targetPath = path.join(targetDir, filePath);
      
      if (config.source) {
        // Copy from source
        const sourcePath = path.join(this.rulesDir, config.source);
        let content = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
        
        // Merge additional files if specified
        if (config.merge) {
          for (const mergePath of config.merge) {
            const mergeSource = path.join(this.rulesDir, mergePath);
            const mergeContent = JSON.parse(fs.readFileSync(mergeSource, 'utf8'));
            content = this.deepMerge(content, mergeContent);
          }
        }
        
        fs.writeFileSync(targetPath, JSON.stringify(content, null, 2));
        console.log(`📄 Created ${filePath}`);
      } else if (config.merge) {
        // Merge multiple files
        let content = {};
        for (const mergePath of config.merge) {
          const mergeSource = path.join(this.rulesDir, mergePath);
          const mergeContent = JSON.parse(fs.readFileSync(mergeSource, 'utf8'));
          content = this.deepMerge(content, mergeContent);
        }
        
        fs.writeFileSync(targetPath, JSON.stringify(content, null, 2));
        console.log(`📄 Created ${filePath}`);
      }
    }
  }

  async updatePackageJson(template, targetDir) {
    const packagePath = path.join(targetDir, 'package.json');
    
    if (!fs.existsSync(packagePath)) {
      console.log('⚠️  No package.json found, skipping script updates');
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    if (template.scripts) {
      packageJson.scripts = { ...packageJson.scripts, ...template.scripts };
      console.log('📝 Updated package.json scripts');
    }

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }

  deepMerge(target, source) {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  listTemplates() {
    const templates = fs.readdirSync(this.templatesDir)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    console.log('📋 Available templates:');
    templates.forEach(template => {
      const templatePath = path.join(this.templatesDir, `${template}.json`);
      const config = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
      console.log(`  • ${template}: ${config.description}`);
    });
  }
}

// CLI Interface
const applier = new WorkspaceRulesApplier();

const args = process.argv.slice(2);
const command = args[0];

if (command === 'list') {
  applier.listTemplates();
} else if (command === 'apply') {
  const template = args[1];
  const targetDir = args[2] || process.cwd();
  
  if (!template) {
    console.error('❌ Please specify a template name');
    console.log('Usage: node apply-rules.js apply <template-name> [target-directory]');
    process.exit(1);
  }
  
  applier.applyTemplate(template, targetDir);
} else {
  console.log('🔧 Workspace Rules Applier');
  console.log('');
  console.log('Usage:');
  console.log('  node apply-rules.js list                    # List available templates');
  console.log('  node apply-rules.js apply <template> [dir]  # Apply template to directory');
  console.log('');
  console.log('Examples:');
  console.log('  node apply-rules.js apply react-typescript');
  console.log('  node apply-rules.js apply vanilla-typescript ./my-project');
}
