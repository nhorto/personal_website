// src/pages/Home.jsx - FINAL FIXED VERSION
import React, { useState } from 'react';
import { SiPython, SiJavascript, SiEsri, SiScikitlearn } from 'react-icons/si';

// Import CSS files
import '../styles/globals.css';
import '../styles/layout/sections.css';
import '../styles/layout/grid.css';  // Make sure this is imported
import '../styles/components/Header.css';
import '../styles/components/Hero.css';
import '../styles/components/Cards.css';
import '../styles/components/TimeLine.css';
import '../styles/components/Forms.css';
import '../styles/utilities/responsive.css';

// ====== ASSETS (update filenames as needed) ======
import portraitImg from '../assets/one.jpeg';
import signatureImg from '../assets/Nicholas-Horton-white-high-res.png';

// ====== Skills/Technologies Matrix ======
const SkillsMatrix = () => {
  const skillCategories = {
    'Languages': ['Python', 'JavaScript', 'R', 'SQL', 'Julia'],
    'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
    'GIS/Spatial': ['ArcGIS', 'QGIS', 'Leaflet', 'Geopandas', 'Shapely'],
    'Visualization': ['Tableau', 'D3.js', 'Plotly', 'Matplotlib', 'React, Next.js']
  };

  return (
    <div className="reveal" style={{ marginTop: '3rem' }}>
      <h2 className="section-title">Tools &amp; Technologies</h2>
      <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem' }}>
        The stack I use day to day
      </p>
      {/* Using the grid class from grid.css */}
      <div className="consistent-grid">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="card reveal" style={{ padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--accent)', margin: '0 0 1rem 0', textAlign: 'center' }}>
              {category}
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              {skills.map((skill, i) => (
                <span key={i} className="tech-tag" style={{ fontSize: '0.8rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillCard = ({ title, subtitle, icon }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="card skill-card reveal"
      style={{
        background: hover ? 'rgba(22,28,40,0.95)' : undefined,
        borderColor: hover ? 'rgba(123,175,212,0.48)' : undefined,
        transform: hover ? 'translateY(-6px) scale(1.01)' : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem', color: hover ? 'var(--text)' : 'var(--accent)' }}>
        {icon}
      </div>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ color: 'var(--muted)', marginTop: '0.3rem' }}>{subtitle}</p>
    </div>
  );
};

const ProjectCard = ({ title, description, tech }) => (
  <div className="card project-card reveal">
    <h3 style={{ color: 'var(--accent)', marginTop: 0 }}>{title}</h3>
    <p style={{ color: '#d7e0ea' }}>{description}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
    </div>
  </div>
);

const TimelineItem = ({ position, company, period, points, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="timeline-item">
      <div className="timeline-content" style={{ 
        justifyContent: isEven ? 'flex-end' : 'flex-start' 
      }}>
        <div className="timeline-marker" />
        <div className="card timeline-card reveal" style={{
          marginLeft: isEven ? 0 : '55%',
          marginRight: isEven ? '55%' : 0
        }}>
          <h3 style={{ color: 'var(--accent)', margin: 0 }}>{position}</h3>
          <h4 style={{ margin: '0.25rem 0 0.25rem 0' }}>{company}</h4>
          <p className="period" style={{ color: 'var(--muted)', marginTop: 0 }}>{period}</p>
          <ul style={{ margin: 0, paddingLeft: '1rem', color: '#d7e0ea' }}>
            {points.map((p, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{p}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://formspree.io/f/xblkbldw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="What's your name?"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="What's your email?"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="What do you want to say?"
          required
        />
      </div>
      
      {submitStatus === 'success' && (
        <div style={{ color: 'var(--accent)', marginBottom: '1rem', textAlign: 'center' }}>
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>
          Sorry, there was an error sending your message. Please try again.
        </div>
      )}
      
      <button 
        type="submit" 
        className="form-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default function Home() {
  const skills = [
    { title: 'Machine Learning', subtitle: 'Predictive modeling & AI systems', icon: <SiScikitlearn size={70}/> },
    { title: 'Python Development', subtitle: 'Data Science, automation & scripting', icon: <SiPython size={70}/> },
    { title: 'Geospatial Analysis', subtitle: 'Spatial modeling, mapping & remote sensing', icon: <SiEsri size={70}/> },
    { title: 'JavaScript & Frontend', subtitle: 'UI & data visualization', icon: <SiJavascript size={70}/> },
  ];

  const specializations = [
    { 
      title: 'Data Science Specializations',
      items: ['Predictive Analytics', 'Statistical Modeling', 'Time Series Analysis', 'Exploratory Data Analysis ', 'Feature Engineering', 'Data cleaning & Preprocessing', 'Deep Learning']
    },
    { 
      title: 'Geospatial Expertise', 
      items: ['Remote Sensing', 'Spatial Statistics', 'Cartographic Design', 'Location Intelligence', 'Spatio-temporal modeling','Spatio-temporal forecasting']
    }
  ];

  const projects = [
    { title: 'AI-Powered Data Analytics Platform', description: 'Automated analysis/visualization with ML for insights.', tech: ['Python', 'TensorFlow', 'React', 'Flask', 'Postgres'] },
    { title: 'Real-time Recommendation Engine', description: 'Collaborative filtering + DL for real-time personalization.', tech: ['Python', 'PyTorch', 'Redis', 'Docker', 'AWS'] },
    { title: 'MLOps Pipeline Automation', description: 'E2E training, validation, deploy, monitoring.', tech: ['Kubernetes', 'MLflow', 'Airflow', 'Terraform'] },
  ];

  const experience = [
    {
      position: 'Geographic Information Systems Analyst',
      company: 'United States Marine Corps',
      period: 'Nov 2018 - Nov 2023',
      points: [
        'Collected, processed, and analyzed geospatial, topographic, and multispectral imagery datasets to support terrain and hydrographic assessments.',
        'Developed custom Python scripts and geoprocessing tools to automate data cleaning, spatial analysis, and visualization, reducing processing time and improving analytical accuracy.',
        'Designed and delivered map-based visualizations, dashboards, and statistical reports to stakeholders, translating complex geospatial datasets into actionable insights for mission planning.',
        'Applied cartographic and GIS techniques to generate accurate and detailed topographic maps, supporting operational risk assessments.'
      ],
    },
    {
      position: 'Geospatial Data Scientist',
      company: 'EpochGeo',
      period: 'Nov 2023 - Present',
      points: [
        'Conduct EDA, regression analysis, principal component analysis (PCA), and feature engineering on datasets containing millions of geospatial points and polygons.',
        'Extract, clean, and analyze data from SQL/PostgreSQL databases using Python (pandas, NumPy, matplotlib, seaborn, scikit-learn) and geospatial libraries (ArcGIS Pro, GeoPandas, Shapely).',
        'Collaborate with ML engineers to test, validate, and optimize supervised learning models, improving predictive accuracy and reliability.',
        'Identify and integrate new geospatial and temporal datasets into data pipelines to enhance model performance.',
        'Create geospatial dashboards, interactive maps, and visual reports to communicate findings to technical and non-technical stakeholders.',
        'Recognized for contributions that directly led to securing an additional contract position, expanding team capacity and increasing company revenue.'
      ],
    },
  ];

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="section fullheight" id="home">
        <div className="hero">
          <div>
            <h1 className="headline reveal">Hi, I'm Nick</h1>
            <p className="tagline reveal">I humanize data</p>
            <p className="intro reveal">
              GIS Developer turned Data Scientist. I tailor and implement data-driven solutions to help breakthrough domains.
            </p>
          </div>

          <div className="portrait-wrap reveal">
            <img className="portrait" src={portraitImg} alt="Portrait" />
            <img className="sig-under" src={signatureImg} alt="Signature" />
          </div>
        </div>
      </section>

      {/* ===== Overview ===== */}
      <section className="section" id="overview">
        <h2 className="section-title reveal">What I Do</h2>
        <p className="reveal" style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem' }}>
          Blending data science and GIS to deliver outcomes
        </p>
        
        {/* Core Skills - Using grid class */}
        <div className="grid-skills">
          {skills.map((s, i) => <SkillCard key={i} {...s} />)}
        </div>

        {/* Specializations */}
        <h2 className="section-title reveal" style={{ marginBottom:'2rem' }}>Focus Areas</h2>
        <p className="reveal" style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '2rem' }}>
          Experience across data science and geospatial technologies
        </p>
        <div className="consistent-grid" style={{ marginBottom: '2rem' }}>
          {specializations.map((spec, i) => (
            <div key={i} className="card reveal" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--accent)', margin: '0 0 1rem 0', fontSize: '1.1rem' }}>
                {spec.title}
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                justifyContent: 'center'
              }}>
                {spec.items.map((item, j) => (
                  <span key={j} className="tech-tag" style={{ fontSize: '0.8rem' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Stack Matrix */}
        <SkillsMatrix />
      </section>

      {/* ===== Experience ===== */}
      <section className="section" id="experience">
        <h2 className="section-title reveal">Experience</h2>
        <div className="timeline" style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            content: '""', position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 2, transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, var(--accent), transparent)'
          }} />
          {experience.map((e, i) => <TimelineItem key={i} {...e} index={i} />)}
        </div>
      </section>

      {/* ===== Education ===== */}
      <section className="section" id="education">
        <h2 className="section-title reveal">Education</h2>
        <div className="grid-education">
          <div className="card reveal" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              background: 'linear-gradient(135deg, var(--accent-soft), var(--accent))', 
              borderRadius: '50%', 
              margin: '0 auto 1rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--border)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              MS
            </div>
            <h3 style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>Master of Science</h3>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Geographic Information Systems</h4>
            <p style={{ color: 'var(--muted)', margin: '0 0 1rem 0' }}>Northwest Missouri State University • 2023</p>
            <p style={{ color: '#d7e0ea', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Advanced coursework in spatial analysis, image processing, and geospatial data processing.
            </p>
          </div>
          
          <div className="card reveal" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              background: 'linear-gradient(135deg, var(--accent-soft), var(--accent))', 
              borderRadius: '50%', 
              margin: '0 auto 1rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--border)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              MS
            </div>
            <h3 style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>Master of Science</h3>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Data Science</h4>
            <p style={{ color: 'var(--muted)', margin: '0 0 1rem 0' }}>University of North Carolina at Chapel Hill • 2025</p>
            <p style={{ color: '#d7e0ea', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Advanced coursework in machine learning, database management, and statistical analysis.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Projects ===== */}
      <section className="section" id="projects">
        <h2 className="section-title reveal">Featured Projects</h2>
        <div className="grid-projects">
          {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="section" id="contact">
        <h2 className="section-title reveal">Contact</h2>
        <div className="card reveal" style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
