# Contributing to Bubbles Demo

We love your input! We want to make contributing to Bubbles Demo as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Contribution Guidelines

### Code Style

- Use TypeScript for type safety
- Follow the existing code style and conventions
- Use meaningful variable and function names
- Write clear, concise comments for complex logic
- Follow the ESLint and Prettier configurations

### Commit Messages

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(backend): add article search functionality
fix(frontend): resolve navigation issue on mobile
docs: update API documentation
```

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include integration tests for API endpoints
- Test on multiple platforms (web, iOS, Android) when applicable

### Documentation

- Update README.md if needed
- Document new API endpoints in `docs/api.md`
- Update architecture documentation for significant changes
- Include inline code comments for complex logic

## Project Structure

```
Bubbles-Demo/
├── backend/          # Node.js/Express backend (DO NOT EDIT)
├── frontend/         # React Native/Expo frontend (DO NOT EDIT)
├── docs/            # Project documentation
├── demo/            # Demo assets and sample data
├── scripts/         # Setup and utility scripts
├── docker/          # Docker configurations
└── .github/         # GitHub workflows and templates
```

## Setting Up Development Environment

1. **Prerequisites**:
   - Node.js (v18 or later)
   - npm or yarn
   - Git
   - Docker (optional)

2. **Setup**:
   ```bash
   git clone https://github.com/BubbleBase64/Bubbles-Demo.git
   cd Bubbles-Demo
   
   # Run setup script
   ./scripts/setup.sh  # or setup.bat on Windows
   ```

3. **Development**:
   ```bash
   # Start backend
   cd backend && npm start
   
   # Start frontend (new terminal)
   cd frontend && npm start
   ```

## Reporting Issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/BubbleBase64/Bubbles-Demo/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists or is planned
2. Open an issue with the `enhancement` label
3. Provide a clear description of the feature
4. Explain the motivation and use case
5. Consider contributing the implementation

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Exercise consideration and empathy
- Focus on what is best for the community
- Show courtesy and respect towards other community members

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.