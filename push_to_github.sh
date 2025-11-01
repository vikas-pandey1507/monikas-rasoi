#!/usr/bin/env bash
set -e
REPO_URL="https://github.com/vikas-pandey1507/monikas-rasoi.git"
COMMIT_MESSAGE="Initial commit: Monika's Rasoi site"

echo "Pushing project to GitHub..."
if ! command -v git >/dev/null 2>&1; then
  echo "Git not found. Install from https://git-scm.com/downloads and re-run."
  exit 1
fi

git init
git add -A
git commit -m "$COMMIT_MESSAGE"

git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git push -u origin main

echo "Done! Open your repo: $REPO_URL"