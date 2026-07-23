# Gitutorial Demo

A comprehensive Git learning repository and demonstration project. This repository serves as both a learning resource for Git fundamentals and a template for best practices in version control.

## 🎯 Purpose

This project demonstrates:
- Git fundamentals (commit, branch, merge, rebase)
- Proper repository organization
- Clean commit history practices
- Documentation standards
- Project structure best practices

## 📁 Project Structure

```
gitutorialdemo/
├── README.md              # This file - project overview
├── ARCHITECTURE.md        # Git workflow and architecture documentation
├── CONTRIBUTING.md        # Guidelines for contributions
├── CHANGELOG.md           # Version history and changes
├── CODEBASE_GUIDE.md      # Detailed codebase explanation
├── .gitignore             # Git ignore rules
├── assets/                # Binary assets and documents
│   ├── *.xlsx             # Excel spreadsheets
│   ├── *.docx             # Word documents
│   └── *.pptx             # PowerPoint presentations
├── docs/                  # Documentation files
│   └── git-basics.md      # Git tutorial and basics
├── examples/              # Example files and templates
│   └── sample-data.txt    # Sample data for testing
└── static/                # Static assets
    └── new.txt            # Static content example
```

## 🚀 Quick Start

### Prerequisites

- Git installed on your system
- Basic command line knowledge

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayushrai-hub/gitutorialdemo.git
   cd gitutorialdemo
   ```

2. Explore the structure:
   ```bash
   ls -la
   ```

3. View Git history:
   ```bash
   git log --oneline --graph --all
   ```

## 📚 Learning Resources

### Git Basics Covered

- [ ] Repository initialization
- [ ] Adding and committing files
- [ ] Branching and merging
- [ ] Remote repositories
- [ ] Pull requests and code review
- [ ] Resolving merge conflicts
- [ ] Rebasing vs merging
- [ ] Git hooks
- [ ] Advanced Git workflows

### Documentation

See the `docs/` directory for detailed tutorials:
- `docs/git-basics.md` - Complete Git tutorial

## 🛠️ Common Git Commands

### Basic Operations

```bash
# Clone a repository
git clone <repository-url>

# Check status
git status

# Add files
git add <file>
# or add all files
git add .

# Commit changes
git commit -m "Descriptive commit message"

# Push changes
git push origin <branch-name>

# Pull latest changes
git pull origin <branch-name>
```

### Branching

```bash
# Create a new branch
git branch <branch-name>

# Switch to a branch
git checkout <branch-name>
# or use switch (newer Git versions)
git switch <branch-name>

# Create and switch in one command
git checkout -b <branch-name>

# Merge a branch
git merge <branch-name>
```

### Viewing History

```bash
# View commit history
git log

# Compact one-line history
git log --oneline

# Visual branch history
git log --graph --oneline --all

# View changes in a commit
git show <commit-hash>
```

## 📝 Best Practices

### Commit Messages

Follow the Conventional Commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example:
```
feat: add user authentication system

- Implement login/logout functionality
- Add password hashing with bcrypt
- Create session management

Closes #123
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `hotfix/description` - Urgent production fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## 🔗 Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Flow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Ayush Rai**
- GitHub: [@ayushrai-hub](https://github.com/ayushrai-hub)
- Email: ayushrai0211@gmail.com

---

*This repository is maintained as a learning resource and demonstration of Git best practices.*
