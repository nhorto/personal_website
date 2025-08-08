// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SiPython } from 'react-icons/si';
import { SiJavascript } from 'react-icons/si';
import { SiEsri } from "react-icons/si";
import { SiScikitlearn } from "react-icons/si";


// ====== ASSETS (update filenames as needed) ======
import portraitImg from './assets/4.jpeg';
import signatureImg from './assets/Nicholas-Horton-white-high-res.png';

// ====== THEME (CSS variables for quick color swaps) ======
const ThemeStyles = () => (
  <style>{`
    :root {
      /* UNC Chapel Hill palette */
      --bg: #0b0d12;                /* deep charcoal background */
      --bg-soft: #10131a;
      --text: #ffffff;
      --muted: #cbd5e1;
      --accent: #7BAFD4;            /* UNC blue */
      --accent-strong: #4D9FD0;     /* slightly deeper UNC blue */
      --accent-soft: rgba(123,175,212,0.2);
      --card: rgba(28, 32, 44, 0.8);
      --border: rgba(123,175,212,0.28);
    }

    * { box-sizing: border-box; }
    html, body, #root { height: 100%; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
    }

    a { color: inherit; text-decoration: none; }

    .app {
      min-height: 100vh;
      width: 100vw;
      background:
        radial-gradient(1100px 600px at 10% 100%, #0f1420 0%, var(--bg) 60%),
        radial-gradient(900px 500px at 80% -10%, #0e1727 0%, var(--bg) 55%);
    }

    /* ===== Header ===== */
    .header {
      position: sticky;
      top: 0;
      backdrop-filter: blur(8px);
      background: linear-gradient(180deg, rgba(11,13,18,0.85) 0%, rgba(11,13,18,0.55) 100%);
      border-bottom: 1px solid var(--border);
      z-index: 50;
    }
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.75rem 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand img.signature {
      height: 96px;
      width: auto;
      display: block;
      filter: drop-shadow(0 2px 8px rgba(123,175,212,0.35));
    }
    .nav {
      display: flex;
      gap: 1.25rem;
      align-items: center;
    }
    .nav a {
      color: var(--muted);
      padding: 0.4rem 0.65rem;
      border-radius: 8px;
      transition: 200ms ease;
      border: 1px solid transparent;
    }
    .nav a:hover {
      color: var(--text);
      border-color: var(--border);
      background: rgba(123,175,212,0.08);
    }
    .divider {
      color: var(--muted);
      opacity: 0.6;
      margin: 0 0.5rem;
      user-select: none;
    }

    /* ===== Sections ===== */
    .section {
      padding: 5rem 5%;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section.fullheight {
      min-height: 100vh;
      display: grid;
      align-items: center;
    }
    .section-title {
      font-size: clamp(2rem, 2.5vw, 2.5rem);
      text-align: center;
      color: var(--accent);
      margin-bottom: 2.5rem;
    }

    /* ===== Hero ===== */
    .hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 3rem;
      align-items: center;
    }
    .headline {
      font-size: clamp(2.6rem, 7vw, 5rem);
      line-height: 1.05;
      font-weight: 800;
      margin: 0 0 0.75rem 0;
      background: linear-gradient(45deg, #fff 0%, var(--accent) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .tagline {
      font-size: 1.25rem;
      color: var(--muted);
      margin-bottom: 1rem;
    }
    .intro {
      color: #d7e0ea;
      line-height: 1.6;
      max-width: 48ch;
    }

    .portrait-wrap {
      justify-self: center;
      display: grid;
      place-items: center;
      gap: 0.75rem;
    }
    .portrait {
      width: clamp(240px, 32vw, 360px);
      aspect-ratio: 1/1;
      border-radius: 18px;
      object-fit: cover;
      box-shadow: 0 12px 40px rgba(0,0,0,0.45);
      border: 1px solid var(--border);
    }
    .sig-under {
      width: clamp(320px, 18vw, 500px);
      opacity: 0.95;
      filter: drop-shadow(0 2px 8px rgba(123,175,212,0.25));
    }

    /* ===== Cards / common ===== */
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      backdrop-filter: blur(10px);
    }

    /* Keep your previous components styling but swap colors to variables */
    .skill-card { 
      padding: 2rem; 
      cursor: pointer; 
      transition: 200ms ease;
      text-align: center;
    }
    .skill-card:hover { transform: translateY(-6px); }
    .tech-tag {
      background: var(--accent-soft);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 0.3rem 0.8rem;
      border-radius: 18px;
      font-size: 0.85rem;
    }
    .project-card { padding: 2rem; transition: 250ms ease; }
    .project-card:hover { transform: translateY(-6px); border-color: rgba(123,175,212,0.55); }

    .timeline::before {
      background: linear-gradient(to bottom, var(--accent), transparent);
    }
    .timeline-marker { background: var(--accent); border: 4px solid var(--bg); }

    .timeline-item:nth-child(even) .timeline-content {
      justify-content: flex-start;
    }
    .timeline-item:nth-child(even) .timeline-card {
      margin-left: 55%;
    }
    .timeline-item:nth-child(odd) .timeline-card {
      margin-right: 55%;
    }

    .project-link {
      color: var(--text);
      border: 1px solid var(--border);
      padding: 0.55rem 0.9rem;
      border-radius: 10px;
      transition: 200ms ease;
    }
    .project-link:hover {
      background: rgba(123,175,212,0.08);
      border-color: var(--accent);
    }

    /* ===== Responsive ===== */
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .portrait-wrap { order: -1; }
      .header-inner { padding: 0.5rem 1rem; }
      .nav { gap: 0.75rem; }
      .divider { display: none; }
      
      .timeline-item:nth-child(even) .timeline-card,
      .timeline-item:nth-child(odd) .timeline-card {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
      }
      .timeline-item .timeline-content {
        justify-content: center !important;
      }
    }
  `}</style>
);

// ====== Responsive Three.js Particles (rendered BELOW hero as requested) ======
const ParticleField = () => {
  const mountRef = useRef(null);
  const rafRef = useRef(null);
  const sceneRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer sized to container
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 2.2;

    // Points
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle = (i / particleCount) * Math.PI * 2 * 5;
      const radius = 0.5 + Math.random() * 0.8;
      const height = (Math.random() - 0.5) * 1.5;
      positions[i3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      positions[i3 + 1] = height + Math.sin(angle * 3) * 0.2;
      positions[i3 + 2] = Math.sin(angle) * radius * 0.3 + (Math.random() - 0.5) * 0.3;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x7BAFD4, // UNC blue
      size: 0.02,
      transparent: true,
      opacity: 0.9,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Resize handler
    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      const h = Math.max(220, Math.min(420, Math.floor(clientWidth * 0.35)));
      renderer.setSize(clientWidth, h);
      camera.aspect = clientWidth / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      points.rotation.y += 0.004;
      points.rotation.x += 0.0015;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      mount.removeChild(renderer.domElement);
      geometry.dispose(); material.dispose(); renderer.dispose();
      sceneRef.current = {};
    };
  }, []);

  // Full width, auto height
  return <div ref={mountRef} style={{ width: '100%', marginTop: '1.25rem' }} />;
};

// ====== Skills/Technologies Matrix ======
const SkillsMatrix = () => {
  const skillCategories = {
    'Languages': ['Python', 'JavaScript', 'R', 'SQL', 'TypeScript'],
    'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'],
    'GIS/Spatial': ['ArcGIS', 'QGIS', 'PostGIS', 'GDAL', 'Leaflet'],
    'Cloud/DevOps': ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'MLflow'],
    'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'BigQuery', 'Elasticsearch'],
    'Visualization': ['Tableau', 'D3.js', 'Plotly', 'Matplotlib', 'React']
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{ textAlign: 'center', color: 'var(--accent)', marginBottom: '2rem', fontSize: '1.5rem' }}>
        Technical Stack
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category} className="card" style={{ padding: '1.5rem' }}>
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

// ====== Reusable bits from your previous file (trimmed where unchanged) ======
const SkillCard = ({ title, subtitle, icon }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="card skill-card"
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
  <div className="card project-card">
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
    <div className="timeline-item" style={{ margin: '3rem 0', position: 'relative' }}>
      <div className="timeline-content" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isEven ? 'flex-end' : 'flex-start' 
      }}>
        <div className="timeline-marker" style={{
          position: 'absolute', left: '50%', width: 20, height: 20, borderRadius: '50%', 
          transform: 'translateX(-50%)', zIndex: 2, background: 'var(--accent)', 
          border: '4px solid var(--bg)'
        }} />
        <div className="card timeline-card" style={{
          width: '45%', 
          padding: '1.5rem', 
          borderRadius: 15, 
          border: '1px solid var(--border)',
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

// ====== Page ======
export default function App() {
  const skills = [
    { title: 'Machine Learning', subtitle: 'Predictive modeling & AI systems', icon: <SiScikitlearn size={70}/> },
    { title: 'Python Development', subtitle: 'Data pipelines & automation', icon: <SiPython size={70}/> },
    { title: 'Geospatial Analysis', subtitle: 'Spatial data & mapping solutions', icon: <SiEsri size={70}/> },
    { title: 'Data Engineering', subtitle: 'ETL & data infrastructure', icon: <SiJavascript size={70}/> },
  ];

  const specializations = [
    { 
      title: 'Data Science Specializations',
      items: ['Predictive Analytics', 'Statistical Modeling', 'Time Series Analysis', 'A/B Testing', 'Feature Engineering']
    },
    { 
      title: 'Geospatial Expertise', 
      items: ['Remote Sensing', 'Spatial Statistics', 'Cartographic Design', 'Location Intelligence', 'GPS/Survey Data']
    },
    { 
      title: 'Industry Applications',
      items: ['Healthcare Analytics', 'Urban Planning', 'Environmental Monitoring', 'Business Intelligence', 'Risk Assessment']
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
        'did things',
        'did more things',
        'did more more things',
        'did more more more things',
      ],
    },
    {
      position: 'Geospatial Data Scientist',
      company: 'EpochGeo',
      period: 'Nov 2023 - Present',
      points: [
        'did things',
        'did more things',
        'did more more things',
        'did more more more things',
      ],
    },
  ];

  return (
    <div className="app">
      <ThemeStyles />

      {/* ===== Header with signature | nav ===== */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <img className="signature" src={signatureImg} alt="Signature" />
            <span className="divider">|</span>
            <span style={{ color: 'var(--muted)', fontSize: 18 }}>Data Scientist</span>
          </div>
          <nav className="nav">
            <a href="#overview">Overview</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== Hero (photo + signature, particles BELOW) ===== */}
      <section className="section fullheight" id="home">
        <div className="hero">
          <div>
            <h1 className="headline">Hi, I'm Nick</h1>
            <p className="tagline">I humanize data</p>
            <p className="intro">
              GIS Developer turned Data Scientist. I tailor and implement data-driven solutions to help breakthrough domains.
            </p>

            {/* particles live under the intro/photo per request */}
            <ParticleField />
          </div>

          <div className="portrait-wrap">
            <img className="portrait" src={portraitImg} alt="Portrait" />
            <img className="sig-under" src={signatureImg} alt="Signature" />
          </div>
        </div>
      </section>

      {/* ===== Overview ===== */}
      <section className="section" id="overview">
        <h2 className="section-title">Overview</h2>
        
        {/* Core Skills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {skills.map((s, i) => <SkillCard key={i} {...s} />)}
        </div>

        {/* Specializations */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {specializations.map((spec, i) => (
            <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
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
        <h2 className="section-title">Experience</h2>
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
        <h2 className="section-title">Education</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              background: 'var(--accent-soft)', 
              borderRadius: '50%', 
              margin: '0 auto 1rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--border)'
            }}>
              <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold' }}>LOGO</span>
            </div>
            <h3 style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>Master of Science</h3>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Geographic Information Systems</h4>
            <p style={{ color: 'var(--muted)', margin: '0 0 1rem 0' }}>Northwest Missori State University • 2023</p>
            <p style={{ color: '#d7e0ea', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Advanced coursework in spatial analysis, image processing, and geospatial data processing.
            </p>
          </div>
          
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              background: 'var(--accent-soft)', 
              borderRadius: '50%', 
              margin: '0 auto 1rem auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--border)'
            }}>
              <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold' }}>LOGO</span>
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
        <h2 className="section-title">Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="section" id="contact">
        <h2 className="section-title">Contact</h2>
        <div className="card" style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
          <form onSubmit={(e)=>e.preventDefault()}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <label>Name</label>
                <input style={inputStyle} type="text" placeholder="What's your name?" />
              </div>
              <div>
                <label>Email</label>
                <input style={inputStyle} type="email" placeholder="What's your email?" />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Message</label>
              <textarea style={{ ...inputStyle, minHeight: 120 }} placeholder="What do you want to say?" />
            </div>
            <button type="submit" style={buttonStyle}>send</button>
          </form>
        </div>
      </section>
    </div>
  );
}

// simple inline control styles
const inputStyle = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  color: 'var(--text)',
  outline: 'none'
};
const buttonStyle = {
  marginTop: '1rem',
  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%)',
  color: '#000',
  border: 'none',
  padding: '0.9rem 1.3rem',
  borderRadius: 10,
  fontWeight: 700,
  cursor: 'pointer'
};