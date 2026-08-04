import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, MotionConfig, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDown, ArrowUpRight, Menu, X,
  Code2, Database, Layers3, Sparkles, Terminal
} from 'lucide-react'
import './styles.css'

const projects = [
  {
    number: '01',
    title: 'School\nManagement',
    type: 'Full-stack platform',
    description: 'A role-based operations hub for attendance, student records, and secure day-to-day school administration.',
    stack: ['Spring Boot', 'React', 'MySQL'],
    className: 'project-red',
    visual: 'school'
  },
  {
    number: '02',
    title: 'Finance\nManager',
    type: 'Financial dashboard',
    description: 'A focused money management system for tracking budgets, expenses, and clear financial reports.',
    stack: ['PHP', 'Oracle PL/SQL', 'CSS'],
    className: 'project-dark',
    visual: 'finance'
  },
  {
    number: '03',
    title: 'Pizza\nDelivery',
    type: 'Android application',
    description: 'A smooth mobile ordering journey with map-powered delivery, cart management, and dependable offline storage.',
    stack: ['Android', 'Google Maps', 'SQLite'],
    className: 'project-blue',
    visual: 'pizza'
  }
]

const stackGroups = [
  { label: 'Languages', icon: Code2, items: ['Java', 'JavaScript', 'PHP', 'Python', 'C#'] },
  { label: 'Frontend', icon: Layers3, items: ['React', 'Next.js', 'HTML / CSS', 'Tailwind'] },
  { label: 'Backend & data', icon: Database, items: ['Spring Boot', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB'] }
]

function TiltCard({ children, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-.5, .5], [7, -7]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-7, 7]), { stiffness: 180, damping: 22 })

  const move = event => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - .5)
    y.set((event.clientY - rect.top) / rect.height - .5)
  }

  const reset = () => { x.set(0); y.set(0) }

  return <motion.article className={className} style={{ rotateX, rotateY }} onMouseMove={move} onMouseLeave={reset} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ opacity: { duration: .65 }, y: { duration: .65 } }}>{children}</motion.article>
}

function ProjectVisual({ type }) {
  if (type === 'school') return (
    <div className="browser-mock">
      <div className="browser-top"><i /><i /><i /><span>student_overview</span></div>
      <div className="school-grid">
        <div className="side-lines"><b /><b /><b /><b /></div>
        <div className="dash-main"><small>ATTENDANCE</small><strong>92.8%</strong><div className="bar"><i /></div><div className="people">{[1,2,3,4].map(n => <span key={n} />)}</div></div>
      </div>
    </div>
  )
  if (type === 'finance') return (
    <div className="phone-mock">
      <div className="phone-head"><span>Overview</span><i /></div>
      <small>TOTAL BALANCE</small><strong>$12,480</strong>
      <div className="chart"><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="transaction"><b>↗</b><span>Monthly saving<small>August goal</small></span><strong>+18%</strong></div>
    </div>
  )
  return (
    <div className="map-mock">
      <svg viewBox="0 0 420 260" aria-hidden="true">
        <path d="M-10 75 C70 30 92 140 175 104 S300 30 440 84" />
        <path d="M15 280 C45 190 145 235 205 165 S322 145 430 190" />
        <path d="M70 -20 C145 55 95 120 180 170 S280 230 340 285" />
        <circle cx="113" cy="87" r="9" /><circle cx="308" cy="171" r="9" />
      </svg>
      <div className="delivery-card"><span className="pizza-icon">◒</span><span><b>On the way</b><small>12 min away</small></span></div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Colombo' }).format(new Date()))
    update(); const id = setInterval(update, 30000); return () => clearInterval(id)
  }, [])

  const go = () => setMenuOpen(false)

  const reveal = { initial: { opacity: 0, y: 45 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } }

  return (
    <MotionConfig reducedMotion="user">
      <header className="nav-shell">
        <a className="logo" href="#top" aria-label="Imaadh Rushdee home">Imaadh <span>Rushdee</span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a onClick={go} href="#work">Work</a><a onClick={go} href="#about">About</a><a onClick={go} href="#stack">Stack</a>
          <a onClick={go} className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-meta mono reveal"><span className="status-dot" /> Available for internships & collaborations <span className="meta-line" /> Colombo, LK · {time}</div>
          <h1 className="reveal delay-1">I turn ideas<br />into <span className="circled">digital products.</span></h1>
          <div className="hero-bottom reveal delay-2">
            <p>Full-stack software engineering student turning complex problems into <em>simple, dependable</em> digital experiences.</p>
            <a className="scroll-link" href="#work"><span>Explore my work</span><i><ArrowDown size={20} /></i></a>
          </div>
          <motion.div className="orbit-mark" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}><div className="orbit-one" /><div className="orbit-two" /><span>&lt;/&gt;</span></motion.div>
          <motion.div className="hero-cube" aria-hidden="true" animate={{ y: [0, -18, 0], rotateX: [12, 25, 12], rotateY: [-18, 8, -18] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><i /><i /><i /></motion.div>
          <div className="hero-index mono">PORTFOLIO / 2026</div>
        </section>

        <section className="work section-pad" id="work">
          <div className="section-heading">
            <p className="eyebrow mono">Selected work / 03</p>
            <h2>Built with purpose.<br /><span>Shipped with care.</span></h2>
          </div>
          <div className="project-list">
            {projects.map(project => (
              <TiltCard className={`project-card ${project.className}`} key={project.number}>
                <div className="project-copy">
                  <div className="project-kicker mono"><span>{project.number}</span>{project.type}</div>
                  <h3>{project.title.split('\n').map((line, i) => <React.Fragment key={line}>{line}{i === 0 && <br />}</React.Fragment>)}</h3>
                  <p>{project.description}</p>
                  <ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
                  <a href="https://github.com/Imaadh-Rushdee" target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={18} /></a>
                </div>
                <div className="project-art"><ProjectVisual type={project.visual} /></div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="about section-pad" id="about">
          <motion.div {...reveal} className="about-aside">
            <p className="eyebrow mono">A little about me</p>
            <div className="portrait-stage">
              <motion.div className="portrait-shape" whileHover={{ rotateY: -8, rotateX: 5, scale: 1.025 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }}>
                <img src="/imaadh-profile.png" alt="Portrait of Imaadh Rushdee" />
                <motion.i className="shape-star" animate={{ y: [0, -10, 0], rotate: [8, 14, 8] }} transition={{ duration: 3.5, repeat: Infinity }}>✦</motion.i>
                <motion.i className="shape-code" animate={{ y: [0, 8, 0], rotate: [-6, -10, -6] }} transition={{ duration: 4, repeat: Infinity }}>{`{ }`}</motion.i>
                <div className="portrait-shine" />
              </motion.div>
              <div className="portrait-shadow" />
            </div>
          </motion.div>
          <motion.div {...reveal} className="about-copy">
            <h2>I’m Imaadh — a developer who cares about the <span>whole product.</span></h2>
            <div className="about-columns">
              <p>I enjoy working across the stack, from shaping an intuitive interface to designing the API and data model that keep it running.</p>
              <p>Right now, I’m deepening my knowledge of cloud systems, scalable architecture, and the craft behind software that feels effortless.</p>
            </div>
            <div className="principles">
              <div><b>01</b><span>Think clearly</span></div><div><b>02</b><span>Build simply</span></div><div><b>03</b><span>Keep learning</span></div>
            </div>
          </motion.div>
        </section>

        <section className="stack section-pad" id="stack">
          <div className="stack-intro">
            <p className="eyebrow mono">The toolkit</p>
            <h2>Tools I use to<br />make ideas <span>real.</span></h2>
            <div className="terminal-chip mono"><Terminal size={15} /> currently_learning: cloud + system design</div>
          </div>
          <div className="stack-groups">
            {stackGroups.map(({ label, icon: Icon, items }, i) => (
              <div className="stack-group" key={label}>
                <div className="stack-title"><span>0{i + 1}</span><Icon size={22} /><h3>{label}</h3></div>
                <div className="pills">{items.map(item => <span key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <Sparkles className="contact-spark" />
          <p className="eyebrow mono">Have a project, role, or bright idea?</p>
          <h2>Let’s make<br /><span>something great.</span></h2>
          <a className="email-link" href="mailto:rushdeeimaadh@gmail.com">rushdeeimaadh@gmail.com <ArrowUpRight /></a>
          <div className="contact-footer">
            <div><a href="https://github.com/Imaadh-Rushdee" target="_blank" rel="noreferrer"><span className="social-mark">GH</span> GitHub</a><a href="https://linkedin.com/in/imaadh-rushdee" target="_blank" rel="noreferrer"><span className="social-mark">IN</span> LinkedIn</a></div>
            <p className="mono">Designed & built by Imaadh Rushdee · © 2026</p>
          </div>
        </section>
      </main>
    </MotionConfig>
  )
}

createRoot(document.getElementById('root')).render(<App />)
