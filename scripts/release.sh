#!/bin/bash

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Starting Release Process...${NC}"

# 1. Check Git Status
if [[ -n $(git status -s) ]]; then
  echo -e "${RED}Error: Git working directory is not clean. Please commit or stash your changes.${NC}"
  exit 1
fi

# 2. Pull latest changes
echo -e "${YELLOW}📦 Pulling latest changes...${NC}"
git pull

# 3. Create Changeset (Optional)
echo -e "${YELLOW}❓ Do you need to create a new changeset? (y/n/enter to skip)${NC}"
read -r create_changeset
if [[ "$create_changeset" == "y" ]]; then
  pnpm changeset
  echo -e "${GREEN}✅ Changeset created.${NC}"
  
  echo -e "${YELLOW}💾 Committing changeset...${NC}"
  git add .
  git commit -m "chore: add changeset"
fi

# 4. Bump Versions
echo -e "${YELLOW}⬆️  Bumping versions...${NC}"
pnpm version-packages

# Check if any files changed
if [[ -z $(git status -s) ]]; then
  echo -e "${YELLOW}⚠️  No changes detected after versioning. Aborting release.${NC}"
  exit 0
fi

# 5. Commit Version Bump
echo -e "${YELLOW}💾 Committing version bump...${NC}"
git add .
git commit -m "chore(release): publish packages"

# 6. Build & Publish
echo -e "${YELLOW}🏗️  Building and Publishing...${NC}"
pnpm release

# 7. Tag
echo -e "${YELLOW}🏷️  Creating git tags...${NC}"
pnpm changeset tag

# 8. Push Changes
echo -e "${YELLOW}☁️  Pushing to remote...${NC}"
git push --follow-tags

echo -e "${GREEN}🎉 Release successfully completed!${NC}"
