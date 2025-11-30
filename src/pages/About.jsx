import React from 'react';
import '../styles/globals.css';
import '../styles/components/Header.css';
import '../styles/layout/sections.css';
import usmc from '../assets/USMC.PNG';
import Graduation from '../assets/Graduation.JPG';
import im_done from '../assets/im_done.png';

// Optional images (uncomment when ready):
// import portrait from '../assets/portrait.jpg';
// import signature from '../assets/Nicholas-Horton-white-high-res.png';

const styles = {
  page: {
    maxWidth: 860,
    margin: '0 auto',
    padding: '2.5rem 1rem 4rem',
  },
  hero: {
    marginBottom: '1.25rem',
  },
  title: {
    margin: 0,
    marginBottom: '2.25rem',
    color: 'var(--accent)',
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    lineHeight: 1.15,
  },
  subtitle: {
    margin: '0.5rem 0 0',
    color: 'var(--muted)',
    fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
  },
  sectionHeading: {
    margin: '2.25rem 0 0.5rem 0',
    color: 'var(--accent)',
    fontWeight: 800,
    letterSpacing: 0.2,
    fontSize: 'clamp(1.05rem, 1.6vw, 1.15rem)',
    textTransform: 'uppercase',
  },
  hr: {
    border: 0,
    height: 1,
    background:
      'linear-gradient(90deg, transparent, var(--border), transparent)',
    margin: '2rem 0',
  },
  figure: {
    margin: '1.25rem 0',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    border: '1px solid var(--border)',
  },
  figcaption: {
    color: 'var(--muted)',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  signatureWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  signature: {
    maxWidth: 220,
    opacity: 0.9,
  },
};

export default function About() {
  return (
    <main>
      {/* Scoped typography tweaks for a blog feel */}
      <style>{`
        .about-prose {
          color: #d7e0ea;
          font-size: 1.02rem;
          line-height: 1.8;
          letter-spacing: 0.15px;
        }
        .about-prose p {
          margin: 0 0 1.1rem 0;
        }
        .about-prose p.lead:first-letter {
          float: left;
          font-size: 3.1rem;
          line-height: 0.9;
          padding-right: 10px;
          font-weight: 700;
          color: var(--accent);
        }
        .about-prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
        .about-prose strong { color: var(--text); }
      `}</style>

      <section className="section" id="about">
        <div style={styles.page}>
          
          {/* HERO */}
          <header style={styles.hero} className="reveal">
            <h2 className="section-title" style={styles.title}>About Me</h2>
            {/* <p style={styles.subtitle}>
              A brief look at my journey and what drives my work.
            </p> */}
          </header>

          <article className="about-prose reveal">
            {/* SECTION: After College */}
            <h3 style={styles.sectionHeading}>After Undergrad</h3> {/* className="lead" */}
            <p section="after-college">
              My journey into adulthood commenced when I started on my college adventure with the dream of playing collegiate soccer. While learning to juggle academics and athletics, it dawned on me that I had left my childhood behind. 
              This evolution accelerated as I found myself as a senior, balancing a 28-hour workweek, 18 credit hours of coursework during soccer season, wishing I could go back to the simpler days of freshman year.
              After graduating from college, I had the opportunity to work as a Field Manager for a flooring contractor. This role really helped me hone in on  my management and leadership skills. Overseeing eight neighborhoods in the 
              North Charlotte area, I quickly realized the importance of effective communication, teamwork, and time management. My responsibilities included supervising subcontractors, liaising with general contractors and homeowners, 
              and ensuring that each project met quality and timeline standards.
            </p>

            <hr style={styles.hr} />

            {/* SECTION: Marine Corps */}
            <h3 style={styles.sectionHeading}>Becoming a Marine & Discovering GIS</h3>
            <p section="marine-corps">
              <figure style={styles.figure} className="reveal">
                <img src={usmc} alt="Caption here" style={styles.image} />
                {/*<figcaption style={styles.figcaption}>Caption text.</figcaption>*/}
              </figure>
              In 2018, I made the decision to enlist in the Marine Corps. My previous experience as a project manager gave me a solid foundation to succeed in such a challenging environment. When I was told I was going to be a 
              "map maker," I thought of myself sitting at a desk with paper and colored pencils and thankfully I was so wrong! Little did I realize how much I would come to appreciate and enjoy the job and want to continue learning 
              as much as I could. So, in 2021 I took the plunge and started on a Master's program in Geographic Information Science at Northwest Missouri State University. This was a surprising for someone who had sworn they would 
              never go back to school again. I can remember telling my mom that I would NEVER go back to school. 
              <figure style={styles.figure} className="reveal">
                <img src={im_done} alt="Caption here" style={styles.image} />
                {/*<figcaption style={styles.figcaption}>Caption text.</figcaption>*/}
              </figure> 
              But here I was enrolled in a Masters program that I wasn’t even sure I would get into. I also had to decide how I was 
              going to pay for this sine the Marine Corps would not pay for all of it. Part way through my first year in the program I decided to get a part time job at Chipotle and use their tuition assistance to pay the rest of 
              the bill. And I thought my senior year of college was busy, but I was wishing I could go back to that!! I worked anywhere from 15-25 hours a week there to maintain my eligibility for tuition assistance. After so many 
              late nights, early mornings, and long days I couldn’t wait for it all to be over! But I knew the hard work would pay off in the end. After I graduated I knew that I wanted to go back to school once I got out of the 
              Marine Corps. During my course work, I had gotten a lot more experience with python, and was introduced to statistics and some machine learning. I didnt really know what data science was but after researching it more, 
              I realized that I was already doing some “data science” things we just didnt call it that. This led me to start applying for a masters in data science for the spring of 2023. This also led me to start applying more 
              data science focused jobs in my transition out of the Marine Corps. Finally all of the hard work had paid off and accepted a geospatial data science position in Washington DC. 
              <p className="pull reveal">
                “I realized I was already doing data science — we just didn’t call it that.”
              </p>
            </p>

            <hr style={styles.hr} />

            {/* OPTIONAL image/figure block */}
            {/* 
            <figure style={styles.figure}>
              <img src={someImage} alt="Relevant caption" style={styles.image} />
              <figcaption style={styles.figcaption}>Caption about the image.</figcaption>
            </figure>
            <hr style={styles.hr} />
            */}

            {/* SECTION: Today */}
            <h3 style={styles.sectionHeading}>Today</h3>
            <p section="current-life">
              While DC was not my preferred destination, the work was exactly where I wanted to be. It was more data science focused and I was learned so much every day. Shortly after I started my new job I also started my new degree 
              and UNC Chapel Hill. This was great timing because I was able to use what I was learning in class and apply it the next day at work. This really helped me progress. Fast forwarding a bit, I finally made it through another 
              degree while working full time. Another long, challenging, but rewarding journey. 
              <figure style={styles.figure} className="reveal">
                <img src={Graduation} alt="Caption here" style={styles.image} />
                {/*<figcaption style={styles.figcaption}>Caption text.</figcaption>*/}
              </figure>
              When I graduated I suddenly had this thing they call “free-time”. I couldn’t even remember what that felt like after working full time and 
              going to school full time for what felt like forever! I quickly realized that I have become addicted to learning and it felt strange not learning a new concept or working on a homework assignment. To fill my time, I 
              started working on a project that would help me and my girlfriend track the wineries and wines we have tried at different wineries. So I have been learning all I can about front end and app development. It has been a 
              slow and sometimes frustrating experience, but I have made lots of progress and finally have a working prototype! After going finishing my degrees and focusing on this project, I have realized that my hobby as become
              learning and im excited to keep pushing my skills and see where they take me next. 
            </p>
            {/* Signature (optional) */}
            {/* <div style={styles.signatureWrap}>
              <img src={signature} alt="Signature" style={styles.signature} />
            </div> */}
          </article>
        </div>
      </section>
    </main>
  );
}
