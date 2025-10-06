# Bubbles News

An AI-driven cross-platform news platform designed to help users consume news more critically, clearly, and consciously. Bubbles aggregates content from multiple sources, provides AI-powered summaries, detects ideological bias, and connects related stories through timeline visualization.

## 🎯 Mission

Enhance media literacy and support balanced information consumption in the age of polarized media through artificial intelligence and smart content curation.

## � Key Features

- **AI-Powered Summarization**: Concise, context-preserving summaries using advanced NLP models
- **Bias Detection**: Real-time ideological bias analysis with visual indicators
- **Timeline Visualization**: Connect related stories chronologically 
- **Cross-Platform**: Available on Web, iOS, and Android
- **Smart Aggregation**: Content from multiple news sources and APIs
- **Media Literacy**: Tools to promote critical thinking about news consumption

## 📱 Live Platform

- **Website**: [bubblesnews.app](https://www.bubblesnews.app)
- **GitHub Organization**: [BubbleBase64](https://github.com/BubbleBase64)

## 🛠 Tech Stack

### Frontend
- **React.js** with Vite for fast development
- **TailwindCSS** for responsive styling
- **Framer Motion** for smooth animations
- **Axios** for API communication
- **TypeScript** for type safety

### Backend & AI
- **Node.js** with Express framework
- **MongoDB Atlas** for cloud database
- **Python AI Worker** with Groq/OpenAI APIs
- **mT5/GPT-4** models for summarization
- **Zero-shot classification** for bias detection

### Infrastructure
- **Cloudflare Pages** for frontend hosting
- **Railway** for backend deployment
- **GitHub Actions** for CI/CD
- **Cloudflare DNS** for domain management
## 📁 Project Architecture

The Bubbles platform follows a modular service-oriented architecture:

```
Bubbles-Demo/
├── backend/                 # Node.js + Express API server
│   ├── server.js           # Main server entry point
│   ├── model/              # MongoDB data models
│   ├── routes/             # API endpoints for articles
│   └── workers/            # Background news fetching workers
├── frontend/               # React Native cross-platform app
│   ├── app/                # Main application screens
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   └── screens/            # Screen implementations
├── ai-worker/              # Python AI processing service (planned)
├── docs/                   # Project documentation
├── demo/                   # Demo assets and sample data
└── scripts/                # Development and deployment scripts
```

### Data Flow Architecture
1. **Data Ingestion**: Backend fetches articles via RSS feeds and APIs
2. **Storage**: Articles stored in MongoDB with processing status
3. **AI Processing**: Python worker generates summaries and bias scores
4. **Client Display**: Frontend presents processed articles with visualizations

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Python 3.8+ (for AI worker)
- MongoDB (local or Atlas)

### Environment Setup

1. **Clone the repository**:
```bash
git clone https://github.com/BubbleBase64/Bubbles-Demo.git
cd Bubbles-Demo
```

2. **Backend setup**:
```bash
cd backend

## 🔧 Development

See [docs/development.md](docs/development.md) for detailed development guidelines.

## 📋 Features

### Current Features
- ✅ AI-powered article summarization
- ✅ Real-time bias detection and visualization
- ✅ Multi-source news aggregation
- ✅ Cross-platform React Native support
- ✅ MongoDB data persistence
- ✅ RESTful API architecture
- ✅ Responsive UI with TailwindCSS

### Roadmap
- 🔄 Timeline visualization for related stories
- 🔄 Community discussion panels
- 🔄 Gamification with badges and XP
- 🔄 Mobile app with push notifications
- 🔄 Turkish language fine-tuning

## 👥 Team

**Bubbles Development Team**:
- **Ece Tuğba Cebeci** - AI & NLP Development, Coordination Support
- **Erdem Erdoğdu** - Frontend Development & NLP Model Support  
- **Hasan Kerem Demirel** - Backend & API Integration
- **İbrahim Erdem Atila** - Backend & Frontend Integration
- **İlhan Bahadır Yavaş** - Scrum Master, DevOps & System Architecture

**Mentors**: Canberk Keleş, Cato Mar

## 📈 Project Management

- **Methodology**: Scrumban with 2-week iterations
- **Tools**: Jira (task tracking), GitHub (version control)
- **Documentation**: GitBook (live docs), Google Drive
- **Communication**: Zoom team meetings

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Organization**: [BubbleBase64](https://github.com/BubbleBase64)
- **Website**: [bubblesnews.app](https://www.bubblesnews.app)
- **Project Repository**: [Bubbles-Demo](https://github.com/BubbleBase64/Bubbles-Demo)