import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsData, getAllCategories } from '../data/projectsData';
import { FaGithub } from 'react-icons/fa';

// Import styles
import '../styles/globals.css';
import '../styles/layout/sections.css';
import '../styles/layout/grid.css';
import '../styles/components/Cards.css';

export default function Projects() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const allCategories = ['All', ...getAllCategories()];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(project => project.categories.includes(selectedCategory));

  return (
    <main style={{ padding: '2rem 1rem' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title reveal">My Projects</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          A collection of data science, machine learning, and development projects showcasing my skills and expertise.
        </p>
      </div>

      {/* Category Filter */}
      {/* <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '3rem'
      }}>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '20px',
              border: selectedCategory === category
                ? '2px solid var(--accent)'
                : '2px solid var(--border)',
              background: selectedCategory === category
                ? 'rgba(123,175,212,0.2)'
                : 'transparent',
              color: selectedCategory === category ? 'var(--accent)' : 'var(--text)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.3s ease',
              fontWeight: selectedCategory === category ? 'bold' : 'normal'
            }}
            onMouseOver={(e) => {
              if (selectedCategory !== category) {
                e.target.style.borderColor = 'var(--accent)';
                e.target.style.background = 'rgba(123,175,212,0.1)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== category) {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.background = 'transparent';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div> */}

      {/* Projects Grid */}
      <div className="consistent-grid" style={{ gap: '2rem' }}>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card reveal"
            style={{
              padding: '0',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            {/* Project Image */}
            <div style={{
              width: '100%',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(123,175,212,0.2), rgba(22,28,40,0.5))',
              overflow: 'hidden'
            }}>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Project Content */}
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ color: 'var(--accent)', marginTop: 0, marginBottom: '0.75rem' }}>
                {project.title}
              </h3>
              <p style={{ color: '#d7e0ea', marginBottom: '1rem', lineHeight: '1.6' }}>
                {project.shortDescription}
              </p>

              {/* Categories */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {project.categories.map((category, i) => (
                  <span key={i} className="tech-tag" style={{ fontSize: '0.75rem' }}>
                    {category}
                  </span>
                ))}
              </div>

              {/* Technologies */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                marginBottom: '1rem'
              }}>
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--muted)',
                      background: 'rgba(123,175,212,0.1)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--muted)',
                      padding: '0.25rem 0.5rem'
                    }}
                  >
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* View Details Button */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.slug}`);
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    transition: 'opacity 0.3s ease',
                    flex: 1
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  View Details
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: '2px solid var(--accent)',
                    borderRadius: '6px',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'var(--accent)';
                    e.target.style.color = 'var(--bg)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--accent)';
                  }}
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <p>No projects found in this category.</p>
        </div>
      )}
    </main>
  );
}