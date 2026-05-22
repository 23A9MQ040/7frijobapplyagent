# Contributing Guide

## Getting Started

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes
4. Run tests: `npm test` (frontend) / `pytest` (backend)
5. Commit: `git commit -m "Add feature"`
6. Push: `git push origin feature/your-feature`
7. Open pull request

## Code Style

### Frontend (TypeScript/React)
- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Max line length: 100

### Backend (Python)
- Follow PEP 8
- Use type hints
- Write docstrings
- Max line length: 100

## Testing Requirements

- Frontend: Jest + React Testing Library
- Backend: pytest
- Minimum coverage: 80%

## Commit Messages

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## Pull Request Process

1. Update documentation
2. Add tests
3. Ensure all tests pass
4. Link related issues
5. Request review from maintainers

## Issues

- Report bugs with reproduction steps
- Suggest features with use cases
- Label appropriately (bug, feature, documentation)

Thank you for contributing! 🚀
