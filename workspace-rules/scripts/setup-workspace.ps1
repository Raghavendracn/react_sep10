# PowerShell script for Windows to set up workspace rules

param(
    [Parameter(Mandatory=$true)]
    [string]$Template,
    
    [Parameter(Mandatory=$false)]
    [string]$TargetPath = (Get-Location).Path
)

Write-Host "🔧 Setting up workspace rules..." -ForegroundColor Cyan
Write-Host "Template: $Template" -ForegroundColor Green
Write-Host "Target: $TargetPath" -ForegroundColor Green

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ApplyScript = Join-Path $ScriptDir "apply-rules.js"

# Run the Node.js script
Write-Host "🚀 Applying workspace rules..." -ForegroundColor Yellow
node $ApplyScript apply $Template $TargetPath

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Workspace rules applied successfully!" -ForegroundColor Green
    
    # Check if package.json exists and offer to install dependencies
    $PackageJsonPath = Join-Path $TargetPath "package.json"
    if (Test-Path $PackageJsonPath) {
        $InstallDeps = Read-Host "📦 Install dependencies now? (y/N)"
        if ($InstallDeps -eq 'y' -or $InstallDeps -eq 'Y') {
            Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
            Push-Location $TargetPath
            npm install
            Pop-Location
            Write-Host "✅ Dependencies installed!" -ForegroundColor Green
        }
    }
} else {
    Write-Host "❌ Failed to apply workspace rules" -ForegroundColor Red
    exit 1
}
