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

# 3. Create Changeset
echo -e "${YELLOW}❓ Select release type for @jiujue/react-canvas-fiber:${NC}"
echo "1) patch (bug fixes)"
echo "2) minor (new features)"
echo "3) major (breaking changes)"
echo "4) manual (interactive changeset cli)"
echo "5) skip (use existing changesets)"

read -r release_type

case $release_type in
  1) type="patch";;
  2) type="minor";;
  3) type="major";;
  4) type="manual";;
  *) type="skip";;
esac

if [[ "$type" == "patch" || "$type" == "minor" || "$type" == "major" ]]; then
  echo -e "${YELLOW}📝 Enter release summary:${NC}"
  read -r summary
  
  # Generate random filename
  filename=".changeset/$(date +%s)-release.md"
  
  # Write changeset file
  echo "---" > "$filename"
  echo "\"@jiujue/react-canvas-fiber\": $type" >> "$filename"
  echo "---" >> "$filename"
  echo "" >> "$filename"
  echo "$summary" >> "$filename"
  
  echo -e "${GREEN}✅ Created changeset ($type): $filename${NC}"
  
  echo -e "${YELLOW}💾 Committing changeset...${NC}"
  git add "$filename"
  git commit -m "chore: add $type changeset"

elif [[ "$type" == "manual" ]]; then
  pnpm changeset
  echo -e "${GREEN}✅ Changeset created.${NC}"
  
  echo -e "${YELLOW}💾 Committing changeset...${NC}"
  git add .changeset/*.md
  git commit -m "chore: add changeset" || true
fi

# 4. Bump Versions
echo -e "${YELLOW}⬆️  Bumping versions...${NC}"
pnpm version-packages

# Check if any files changed
if [[ -z $(git status -s) ]]; then
  echo -e "${YELLOW}⚠️  No changes detected after versioning. Aborting release.${NC}"
  exit 0
fi

echo -e "${YELLOW}🧾 Generating release notes...${NC}"
node ./scripts/generate-release-notes.mjs

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
