
const { profile, stats, highlights, skills, featuredProjects, repoArchive, cyber, leadership, journey, education, experience, otherProjects } = window.portfolioData;
const { useEffect, useMemo, useState } = React;

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    const setCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvas();
    window.addEventListener("resize", setCanvas);

    const letters = "0101010101<>[]{}$#";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(3, 8, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(80, 255, 180, 0.55)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(() => {
      columns = Math.floor(canvas.width / fontSize);
      if (drops.length !== columns) drops = Array(columns).fill(1);
      draw();
    }, 42);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvas);
    };
  }, []);

  return <canvas id="matrix" aria-hidden="true"></canvas>;
}

function App() {
  const [filter, setFilter] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(featuredProjects.map(item => item.type))], []);
  const projects = useMemo(() => {
    if (filter === "All") return featuredProjects;
    return featuredProjects.filter(item => item.type === filter);
  }, [filter]);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MatrixRain />
      <div className="noise"></div>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      <div className="orb orb-c"></div>

      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-mark">AS</span>
          <span className="brand-text">Aayush Sapkota</span>
        </a>

        <nav className="site-nav">
          <a href="#projects">Projects</a>
          <a href="#cybersecurity">Cybersecurity</a>
          <a href="#leadership">Leadership</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero" id="home">
          <div className="hero-copy" data-reveal>
            <div className="section-kicker">Cybersecurity • Computing • Product Thinking</div>
            <h1>{profile.title}</h1>
            <p className="hero-subtitle">{profile.subtitle}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">See my work</a>
              <a className="button button-secondary" href={profile.cv} target="_blank" rel="noreferrer">Open CV</a>
              <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>

            <div className="badge-row">
              {profile.heroBadges.map((badge) => <span key={badge} className="badge">{badge}</span>)}
            </div>

            <div className="intro-card">
              <p>
                I’m Aayush Sapkota. I’m currently studying Computer Science with Cyber Security,
                and I’m building toward roles where I can solve technical problems, think like a
                builder, and grow deeper into cybersecurity engineering and security-focused work.
              </p>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="portrait-shell">
              <img src={profile.photo} alt="Portrait of Aayush Sapkota" className="portrait" />
              <div className="portrait-glow"></div>
            </div>

            <div className="stats-panel">
              {stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="highlights-grid">
          {highlights.map((item) => (
            <article className="glass-card" key={item.title} data-reveal>
              <p className="section-tag">{item.title}</p>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="section" id="projects">
          <div className="section-head" data-reveal>
            <div>
              <p className="section-tag">Featured Projects</p>
              <h2>Projects that best represent how I build</h2>
            </div>

            <div className="filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={filter === category ? "chip active" : "chip"}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card accent-${project.accent}`} key={project.name} data-reveal>
                <div className="project-top">
                  <div>
                    <div className="project-meta">
                      <span>{project.type}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3>{project.name}</h3>
                  </div>
                </div>

                <p className="project-summary">{project.summary}</p>
                <p className="project-detail">{project.detail}</p>

                <div className="tag-row">
                  {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                </div>

                <div className="project-actions">
                  <a href={project.repo} target="_blank" rel="noreferrer">Repository</a>
                  {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live Site</a> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="two-column">
          <article className="glass-card" id="cybersecurity" data-reveal>
            <p className="section-tag">Cybersecurity</p>
            <h2>How I’m building my security foundation</h2>
            <div className="stacked-list">
              {cyber.map((item) => (
                <div className="stack-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-card" id="leadership" data-reveal>
            <p className="section-tag">Leadership</p>
            <h2>What scouting taught me about responsibility</h2>
            <div className="stacked-list">
              {leadership.map((item) => (
                <div className="stack-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="section">
          <div className="skills-layout">
            <article className="glass-card" data-reveal>
              <p className="section-tag">Languages</p>
              <div className="skill-cloud">
                {skills.languages.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>

            <article className="glass-card" data-reveal>
              <p className="section-tag">Tools</p>
              <div className="skill-cloud">
                {skills.tools.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>

            <article className="glass-card" data-reveal>
              <p className="section-tag">Concepts</p>
              <div className="skill-cloud">
                {skills.concepts.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          </div>
        </section>

        <section className="two-column" id="education">
          <article className="glass-card" data-reveal>
            <p className="section-tag">Education</p>
            <h2>My academic path so far</h2>
            <div className="timeline">
              {education.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <div className="timeline-dot"></div>
                  <div>
                    <div className="timeline-meta">{item.meta}</div>
                    <h3>{item.title}</h3>
                    <h4>{item.place}</h4>
                    <p>{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-card" data-reveal>
            <p className="section-tag">Experience & Other Builds</p>
            <h2>What else shapes how I work</h2>

            <div className="stacked-list">
              {experience.map((item) => (
                <div className="stack-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="muted-label">{item.place}</p>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="other-projects">
              <p className="mini-heading">Other projects from my coursework and practice</p>
              <ul>
                {otherProjects.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </article>
        </section>

        <section className="two-column">
          <article className="glass-card" data-reveal>
            <p className="section-tag">GitHub Archive</p>
            <h2>Extra repositories from my public trail</h2>
            <div className="repo-list">
              {repoArchive.map((repo) => (
                <a className="repo-item" href={repo.repo} target="_blank" rel="noreferrer" key={repo.name}>
                  <div>
                    <strong>{repo.name}</strong>
                    <p>{repo.summary}</p>
                  </div>
                  <div className="tag-row compact">
                    {repo.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </a>
              ))}
            </div>
          </article>

          <article className="glass-card" data-reveal>
            <p className="section-tag">Journey</p>
            <h2>How I’ve been leveling up</h2>
            <div className="journey">
              {journey.map((item) => (
                <div className="journey-item" key={item.year + item.title}>
                  <div className="journey-year">{item.year}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="contact-shell" id="contact" data-reveal>
          <div className="contact-card">
            <div>
              <p className="section-tag">Contact</p>
              <h2>I’m open to internships, collaborations, and opportunities that let me build and grow.</h2>
              <p className="contact-copy">
                If you’re looking for someone who learns fast, works hard, and genuinely cares about secure systems and practical execution, let’s talk.
              </p>
            </div>

            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`mailto:${profile.universityEmail}`}>{profile.universityEmail}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={profile.cv} target="_blank" rel="noreferrer">Download CV</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-frame">
        <div>AS™</div>
        <div>Built by Aayush Sapkota</div>
        <div>Secure. Build. Adapt.</div>
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
