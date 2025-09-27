# OSC INTERNAL EVENT MANAGEMENT TOOL

A scalable platform to streamline event organization, content creation, social media management, logistics, and student attendance tracking.

This system supports multiple user roles (Students, Team Admins, Social Media, Content, Organising, and Logistics teams) to enable seamless collaboration and efficient event execution.

## Project Information

- **Data Flow Diagram:** [View on Miro](https://miro.com/app/board/uXjVJFNPJLE=/?share_link_id=893640861608)
- **Project Requirement Details:** [View on Docs](https://docs.google.com/document/d/1blOG6nZYnFMEGScKpHMvuBXcNOxC6co4l9ds6379obc/edit?usp=sharing)

## 🚀 Features

### 🔑 Authentication & Access

- Secure registration and login for Students and Team Admins
- Password reset/recovery
- Role-Based Access Control (RBAC)

### 🎟 Attendance Management

- QR code generation for attendance
- Real-time attendance capture
- Walk-in entry tracking
- Automatic attendance generation linked to student profiles

### 👩‍🎓 Student Management (Team Admin)

- Manage student profiles
- View student list
- Record disciplinary actions

### 📱 Social Media Team

- Post generation (text, image, video)
- Drafting, editing, and reworking posts
- Post scheduling with calendar view & reminders
- Version control for social posts

### ✍️ Content Team

- Collaborative speech drafting with version history
- Blog/article/write-up creation with rich text formatting
- Documentation generator for event briefs, reports, and summaries

### 📅 Organising Team

- Event planning (dates, venues, descriptions)
- Task & milestone tracking
- Idea box with voting and comments
- Meeting scheduler with calendar integration
- Hiring portal for onboarding new students into teams

### 🚚 Logistics Team

- Collect and analyze event feedback & surveys
- Social media engagement analysis
- Online event monitoring (participants, engagement, etc.)
- Attendance logistics coordination with real-time updates

## 🛠️ Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB
- **ORM/ODM:** Prisma
- **Monorepo Management:** Turborepo
- **Containerization:** Docker

## 📂 Project Structure

```
apps/
├── client/                 # Next.js frontend
│   ├── public/            # Static assets
│   ├── src/               # Frontend source code
│   ├── package.json
│   └── tsconfig.json
│
├── server/                # Express.js backend
│   ├── src/               # Backend source code
│   ├── package.json
│   └── tsconfig.json
│
docker/                    # Docker-related configs
packages/                  # Shared libraries/configs
node_modules/
.env.example
.gitignore
.npmrc
bun.lock
CODE_OF_CONDUCT.md
Contributions.md
docker-compose.yml
License.md
package*.json
README.md
turbo.json
```

## ⚙️ Setup & Installation

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- MongoDB instance

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Open-Source-Chandigarh/osc-internal-tool.git

cd osc-internal-tool

# 2. Bun Install dependencies (monorepo)
npm install -g bun
bun install

# 3. Start development
bun run dev
```

## 📖 Usage

- **Students:** Register, log in, and mark attendance
- **Team Admins:** Manage students, disciplinary actions, and oversee activities
- **Social Media Team:** Create, edit, and schedule posts
- **Content Team:** Draft speeches, generate docs, and write posts
- **Organising Team:** Plan events, manage ideas, schedule meetings, and handle hiring
- **Logistics Team:** Collect feedback, analyze online events, and manage attendance logistics

## 🔮 Future Enhancements

- Payment gateway for ticket sales
- Push notifications for event updates
- Advanced analytics dashboards
- Integration with 3rd-party social media platforms for direct publishing

## 🤝 Contribution

We welcome contributions! Please fork the repo, create a feature branch, and open a pull request.

## 📜 License

This project is licensed under the terms of the MIT License.
