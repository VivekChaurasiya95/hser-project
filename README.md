# hser-project
# 🎯 HSER - Human Skill Extinction Radar

> AI-powered platform predicting which software & IT skills are at risk of extinction

![HSER Banner](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-18+-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)

## 🌟 Overview

HSER is the world's first **skill-level extinction radar** for software and IT professionals. Unlike traditional job market tools, HSER analyzes individual technical skills to predict:

- 📊 **Extinction Risk (%)** - How likely a skill will become obsolete
- ⏱️ **Skill Half-Life (years)** - Time until 50% relevance decline
- 🛡️ **Protection Score** - Human creativity advantage
- ⚡ **Replacement Force** - Automation velocity

## 🎯 Key Features

✅ Tracks **50+ Software & IT Skills**  
✅ **Explainable AI** - Clear why/how/when predictions  
✅ Beautiful **Dark/Light Mode** interface  
✅ **Interactive Charts** - Visual skill comparisons  
✅ **Real-time Analytics** - Dashboard with insights  
✅ **Google OAuth** - One-click authentication  

## 🎓 Target Users

- 🏫 **Universities** - Curriculum planning based on skill longevity
- 🏢 **Corporates** - Strategic workforce reskilling
- 🏛️ **Government** - Education & labor policy development

## 🧮 Core Formulas
```
Replacement Force Score (RFS) = (Automation + Tool Growth + Adoption) ÷ 3
Protection Score (PS) = Human Creativity Requirement
Extinction Risk (%) = RFS × (1 − PS) × 100
Skill Half-Life (years) = 5 ÷ Tool Growth Speed
```

## 🛠️ Tech Stack

**Backend:**
- Python 3.9+
- FastAPI
- SQLAlchemy
- Pandas & NumPy

**Frontend:**
- React 18
- Tailwind CSS
- Recharts
- Lucide React Icons

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Visit: http://localhost:3000

## 📊 Sample Skills Tracked

- Manual SQL Reporting (Risk: 76%)
- Manual Software Testing (Risk: 81%)
- Prompt Engineering (Risk: 25%)
- System Debugging (Risk: 35%)
- DevOps Automation (Risk: 42%)
- ...and 45 more!

## 🎬 Demo

[Live Demo](Coming Soon) | [Video Walkthrough](Coming Soon) | [Slides](Coming Soon)

## 📸 Screenshots

### Landing Page
![Landing](https://via.placeholder.com/800x400?text=Landing+Page)

### Skill Explorer
![Explorer](https://via.placeholder.com/800x400?text=Skill+Explorer)

### Comparison Tool
![Comparison](https://via.placeholder.com/800x400?text=Skill+Comparison)

## 📝 API Documentation

### Get All Skills
```bash
GET /api/skills
```

### Get Skill Detail
```bash
GET /api/skills/{skill_id}
```

### Compare Skills
```bash
POST /api/compare
Body: {"skill_ids": [1, 6]}
```

## 🏆 Innovation Highlights

1. **Skill-Level Analysis** - Not jobs, but individual skills
2. **Explainable AI** - Transparent reasoning for every prediction
3. **Half-Life Metric** - Quantify skill decay over time
4. **Protection Score** - Measure human creativity advantage
5. **Timeline Projections** - 7-year forecasts (2024-2030)

## 👨‍💻 Author

**Vivek Chaurasiya**  
BTech CSE Student | AI/ML & Data Science Enthusiast  
📧 Email: vivekchaurasiya9589@gmail.com  
🔗 LinkedIn: linkedin.com/in/vivek-chaurasiya-722037315
💼 Portfolio: [Your Website](#)

## 📄 License

MIT License - See [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- AI tools were used for ideation and productivity support.
- Open source community
- Hackathon organizers

---

**⭐ Star this repo if you find it useful!**

Built by Vivek Chaurasiya for the future of work
```
