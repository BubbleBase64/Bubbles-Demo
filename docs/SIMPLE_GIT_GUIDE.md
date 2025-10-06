# Simple Git Workflow for Bubbles Team

Since we've simplified our setup, here's the straightforward git workflow for the team:

## 🚀 Basic Git Commands

### Making Changes
```bash
# Check what you've changed
git status

# Add files to staging
git add .                    # Add all changes
git add src/component.js     # Add specific file

# Commit your changes
git commit -m "Your commit message here"

# Push to GitHub
git push
```

## 📝 Good Commit Message Format

### With Jira Issues (Recommended)
```bash
git commit -m "BUBB-123: Add news summarization feature"
git commit -m "BUBB-456: Fix bias detection algorithm"
git commit -m "BUBB-789: Update homepage design"
```

### Without Jira Issues
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve mobile responsive issues"
git commit -m "docs: update README with setup instructions"
```

## 🎯 Commit Message Types

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New features | `feat: add news categorization` |
| `fix` | Bug fixes | `fix: resolve login timeout issue` |
| `docs` | Documentation | `docs: update API documentation` |
| `style` | Code formatting | `style: fix indentation in components` |
| `refactor` | Code cleanup | `refactor: simplify database queries` |
| `test` | Adding tests | `test: add unit tests for auth module` |

## 🔄 Daily Workflow

1. **Start working**: `git pull` (get latest changes)
2. **Make changes**: Edit your files
3. **Check status**: `git status`
4. **Stage changes**: `git add .`
5. **Commit**: `git commit -m "BUBB-123: Your description"`
6. **Push**: `git push`

## 🎈 Bubbles Project Specific

### Frontend Work
```bash
git commit -m "BUBB-123: improve news feed UI design"
git commit -m "BUBB-456: add dark mode toggle"
```

### Backend Work
```bash
git commit -m "BUBB-789: implement news summarization API"
git commit -m "BUBB-012: add bias detection endpoint"
```

### AI/ML Work
```bash
git commit -m "BUBB-345: optimize BERT model performance"
git commit -m "BUBB-678: add sentiment analysis feature"
```

## 🛠️ Helpful Commands

```bash
# See your recent commits
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what changed in a file
git diff filename.js

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout develop
```

## 🎯 Tips for Success

1. **Commit often** - Small, focused commits are better
2. **Use descriptive messages** - Help your teammates understand
3. **Include Jira issues** - Helps with project tracking
4. **Pull before you push** - Avoid conflicts
5. **Check status first** - Know what you're committing

## 🚀 That's It!

No complex setup, no wizards, just simple and effective git workflow for your Bubbles project!

Happy coding! 🎈
