# Contribution Guidelines 🤝

Thank you for your interest in contributing to OSC Internal Tool!
We welcome contributions from everyone. By participating in this project, you agree to abide by our Code of Conduct.

## 🚀 How to Contribute

### 1. Fork the Repository

Click the **Fork** button on the top right of this repository page.

Clone your fork locally:

```bash
git clone https://github.com/Open-Source-Chandigarh/osc-internal-tool.git
cd osc-internal-tool
```

### 2. Create a New Branch

Always work on a separate branch for your changes:

```bash
git checkout -b workby/<your_name>
```

### 3. Make Your Changes

- Follow the existing code style and commit message guidelines.
- Keep pull requests focused and concise.

### 4. Run Tests

- Ensure your changes do not break existing functionality.
- If applicable, write tests for new features.

### 5. Commit & Push

Use clear commit messages:

```bash
git commit -m "[BACKEND] |  add Google OAuth integration"
git push origin workby/<your_name>
```

### 6. Open a Pull Request (PR)

1. Go to the original repository on GitHub.
2. Click **New Pull Request**.
3. Provide a clear description of:
   - What you changed
   - Why the change was needed
   - Any additional context (screenshots, test evidence, etc.)

## 🧾 Code of Conduct

We are committed to creating a welcoming and inclusive environment.
Please:

- Be respectful and constructive.
- Avoid personal attacks or unprofessional behavior.
- Help foster a positive and collaborative community.

## 📂 Project Setup (For Contributors)

### Prerequisites

- Node.js 20+
- Backend Architechture & NextJS
- Docker & Docker Compose

### Run Locally

```bash
# Backend services
npm i -g bun
bun i
bun run dev

```

## 📝 Commit Message Format

```
[<type>]: <short summary>
```

### Types:

- `BACKEND`
- `FRONTEND`
- `FULLSTACK`
- `DEPLOYMENT`
- `PACKAGE`

### Example:

```
[FULLSTACK] |  add support for Microsoft login
[BACKEND] |  handle missing college data gracefully
```

## 🙌 Ways to Contribute

- Add new features or improve existing ones
- Report and fix bugs
- Write or improve documentation
- Add tests and improve test coverage
- Share feedback and suggestions

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project: [MIT License](LICENSE).
