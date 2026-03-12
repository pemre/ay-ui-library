# Post-Implementation Checklist

Step-by-step guide for maintaining project documentation and versioning after implementing a feature or fixing a bug.

# Checklist

After completing any feature or bugfix spec:

1. **Update README.md, CHANGELOG.md** — Reflect new features, changed behavior, or updated project structure.
2. **Update steering docs** (`.kiro/steering/`) — Keep all markdown files in sync with any architectural, tooling, or product changes introduced by the implementation.
3. **Update package.json version** as per Semantic Versioning guidelines (patch for bugfixes, minor for new features, major for breaking changes).

These updates should be included as tasks in every spec's `tasks.md`.
