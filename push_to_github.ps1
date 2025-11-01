# Auto push to GitHub for Monika's Rasoi
$RepoUrl = "https://github.com/vikas-pandey1507/monikas-rasoi.git"
$CommitMessage = "Initial commit: Monika's Rasoi site"

Write-Host "Pushing project to GitHub..." -ForegroundColor Green
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git not found. Install from https://git-scm.com/downloads and re-run."
  exit 1
}

git init
git add -A
git commit -m "$CommitMessage"

git branch -M main
git remote remove origin 2>$null
git remote add origin $RepoUrl
git push -u origin main

Write-Host "Done! Open your repo: $RepoUrl" -ForegroundColor Green