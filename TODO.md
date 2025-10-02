# Personal Website Development TODO

## 🎯 Project Overview
Building a 4-page personal website with React + Tailwind CSS frontend, FastAPI backend, Instagram integration, and automated deployment via GitHub Actions and Docker to VPS.

## 📋 Development Phases

### Phase 1: Project Setup & Planning
- [ ] **Plan 4-page website structure**
  - Define About & Projects page layout
  - Design Photography (Instagram) page wireframe
  - Plan Resume & Contact page structure
  - Create navigation flow between pages

- [ ] **Initialize React + Tailwind + FastAPI stack**
  - Set up React with Vite
  - Install and configure Tailwind CSS
  - Initialize FastAPI backend structure
  - Set up Git repository for open-source

### Phase 2: API & Backend Development
- [ ] **Configure Instagram API integration**
  - Set up Instagram Basic Display API
  - Get access tokens from Facebook Developer account
  - Configure environment variables for API keys
  - Test API connection and data fetching

- [ ] **Build backend API with FastAPI**
  - Create `/api/instagram/photos` endpoint
  - Create `/api/contact` endpoint for contact form
  - Create `/api/resume` endpoint for resume download
  - Set up CORS configuration
  - Add error handling and logging

### Phase 3: Frontend Development
- [ ] **Create React frontend foundation**
  - Set up React Router with 4 routes
  - Create base component structure
  - Configure Tailwind CSS theme
  - Implement responsive navigation bar

- [ ] **Develop About & Projects page** (Home page)
  - Personal introduction section
  - Skills and technologies showcase
  - Project cards with descriptions
  - GitHub/demo links integration
  - Responsive design implementation

- [ ] **Build Photography (Instagram) page**
  - Instagram gallery component
  - Responsive photo grid layout
  - Image modal/lightbox functionality
  - Photo captions from Instagram
  - Loading states and error handling

- [ ] **Create Resume & Contact page**
  - Downloadable PDF resume functionality
  - Contact form with validation
  - Professional links section
  - Social media integration
  - Backend form submission

### Phase 4: UX & Interactive Features
- [ ] **Implement interactive features and UX**
  - Loading states throughout app
  - Smooth animations and transitions
  - Form validation and feedback
  - Image lazy loading
  - Mobile responsiveness
  - Error boundary components

### Phase 5: DevOps & Deployment
- [ ] **Set up Docker containerization**
  - Create Dockerfile for React frontend
  - Create Dockerfile for FastAPI backend
  - Set up docker-compose for local development
  - Configure multi-stage builds for production
  - Optimize image sizes

- [ ] **Create GitHub Actions CI/CD pipeline**
  - Set up automated testing workflow
  - Configure Docker image building
  - Set up deployment to VPS on push to main
  - Add environment variable management
  - Configure rollback capabilities

- [ ] **Configure VPS production environment**
  - Set up Docker on VPS
  - Configure Nginx reverse proxy
  - Set up SSL certificates (Let's Encrypt)
  - Configure environment variables
  - Set up monitoring and logging

### Phase 6: Testing & Documentation
- [ ] **Test deployment and finalize project**
  - Test full deployment pipeline
  - Performance optimization
  - SEO optimization
  - Set up analytics (optional)
  - Create comprehensive README
  - Add contributing guidelines
  - License selection and setup

## 🗂️ File Structure
```
PersonalBlog/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AboutProjects.jsx    # Home page
│   │   │   ├── Photography.jsx      # Instagram gallery
│   │   │   └── ResumeContact.jsx    # Resume + Contact
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── PhotoGallery.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   ├── instagram.py
│   │   │   ├── contact.py
│   │   │   └── resume.py
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
├── docker-compose.yml
├── docker-compose.prod.yml
├── .github/workflows/
├── nginx/
├── scripts/
├── static/
│   └── resume.pdf
├── README.md
└── TODO.md
```

## 🎯 Current Focus
**Next Task:** Start building the About & Projects home page with React and Tailwind CSS

## 📝 Notes
- Instagram API requires Facebook Developer account setup
- VPS deployment will use Docker containers
- Open-source repository with comprehensive documentation
- Mobile-first responsive design approach
- Performance optimization throughout development

---
*Last Updated: September 22, 2025*
