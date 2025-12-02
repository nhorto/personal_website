import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug } from '../data/projectsData';
import { FaGithub, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';

// Import styles
import '../styles/globals.css';
import '../styles/components/Cards.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/Projects')}
          className="form-button"
          style={{ marginTop: '2rem' }}
        >
          Back to Projects
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/Projects')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--accent)',
          cursor: 'pointer',
          fontSize: '1rem',
          marginBottom: '3rem',
          padding: '0.5rem 0',
          transition: 'color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.color = 'var(--text)'}
        onMouseOut={(e) => e.target.style.color = 'var(--accent)'}
      >
        <FaArrowLeft /> Back to Projects
      </button>

      {/* Single unified card for entire project */}
      <div className="card" style={{ padding: '2.5rem' }}>
          {/* Header */}
          <h1 style={{ color: 'var(--accent)', marginTop: 0, marginBottom: '1rem', fontSize: '2.5rem' }}>
            {project.title}
          </h1>

          {/* Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {project.categories.map((category, i) => (
              <span key={i} className="tech-tag" style={{ fontSize: '0.9rem' }}>
                {category}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="form-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                width: 'auto'
              }}
            >
              <FaGithub size={20} /> View on GitHub
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="form-button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  width: 'auto'
                }}
              >
                <FaExternalLinkAlt size={18} /> Live Demo
              </a>
            )}
          </div>

          {/* Divider */}
          <hr style={{
            border: 'none',
            borderTop: '1px solid var(--border)',
            margin: '2rem 0'
          }} />

          {/* Project Description */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--accent)', marginTop: 0, marginBottom: '1rem' }}>
              About This Project
            </h2>
            <div style={{ color: '#d7e0ea', lineHeight: '1.8', whiteSpace: 'pre-line', fontSize: '1.05rem' }}>
              {project.fullDescription}
            </div>
          </div>

          {/* Key Achievements */}
          {project.achievements && project.achievements.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ color: 'var(--accent)', marginTop: 0, marginBottom: '1rem' }}>
                Key Achievements
              </h2>
              <ul style={{ color: '#d7e0ea', lineHeight: '1.8', paddingLeft: '1.5rem', margin: 0 }}>
                {project.achievements.map((achievement, i) => (
                  <li key={i} style={{ marginBottom: '0.75rem' }}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h2 style={{ color: 'var(--accent)', marginTop: 0, marginBottom: '1rem' }}>
              Technologies Used
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.map((tech, i) => (
                <span key={i} className="tech-tag" style={{ fontSize: '0.9rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
      </div>
    </main>
  );
}
