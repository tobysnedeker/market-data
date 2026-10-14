$apiPath = Join-Path $PSScriptRoot "api"
$appPath = Join-Path $PSScriptRoot "app"

Start-Process powershell.exe `
  -WorkingDirectory $apiPath `
  -ArgumentList @(
    "-NoExit",
    "-Command",
    "npm install; if (`$LASTEXITCODE -eq 0) { node server.js }"
  )

Start-Process powershell.exe `
  -WorkingDirectory $appPath `
  -ArgumentList @(
    "-NoExit",
    "-Command",
    "npm install; if (`$LASTEXITCODE -eq 0) { npm run dev }"
  )