import React from 'react';
import { createRoot } from 'react-dom/client';
import { Mail, Phone, MapPin, ExternalLink, Code2, Award, Briefcase, GraduationCap, Sparkles, ShieldCheck, Database, Cloud, Rocket, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import './styles.css';

const profile = {
  name: 'Ponduri Venkata Sai Lakshmi Deepthi',
  roles: ['SOC Analyst Cyber Security', 'Applied AI/ML Engineer', 'MERN Stack Developer', 'Full Stack Developer'],
  location: 'Kavali, Nellore, India',
  email: 'pvslakshmideepthi@gmail.com',
  phone: '+91 7396796839',
  tagline: 'I build secure, intelligent web products with React, Node.js, MongoDB, Python, AI integrations, cloud deployment, and clean UI experiences.',
  links: {
    github: 'https://github.com/pvslakshmideepthi',
    linkedin: 'https://www.linkedin.com/in/ponduri-venkata-sai-lakshmi-deepthi-291787324/',
    leetcode: 'https://leetcode.com/u/pvslakshmideepthi/',
    hackerrank: 'https://www.hackerrank.com/profile/pvsldeepthi',
    credly: 'https://www.credly.com/users/ponduri-venkata-sai-lakshmi-deepthi.9f317eb6',
    hive: 'https://hive.smartinterviews.in/profile/pvsldeepthi'
  }
};

const skills = [
  { title: 'Frontend', icon: Code2, items: ['React.js', 'Next.js basics', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Responsive UI', 'Tailwind CSS', 'UI/UX'] },
  { title: 'Backend & APIs', icon: Database, items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Authentication', 'Middleware', 'Postman', 'API Testing'] },
  { title: 'Databases', icon: Database, items: ['MongoDB', 'MongoDB Atlas', 'MySQL', 'SQL Queries', 'CRUD', 'Schema Design'] },
  { title: 'AI & Cloud', icon: Cloud, items: ['OpenAI APIs', 'Azure Speech SDK', 'IBM AI Model', 'Vercel', 'Azure Services', 'GitHub', 'CI/CD basics'] },
  { title: 'Security', icon: ShieldCheck, items: ['Cybersecurity', 'OWASP Basics', 'VAPT Basics', 'SOC Fundamentals', 'Ethical Hacking Basics'] },
];

const stats = [
  ['20+', 'GitHub Repositories'], ['Since 2023', 'MERN Stack Intern'], ['94%', 'Cybersecurity AI Score'], ['90%', 'B.Tech Current Score']
];

const projects = [
  {
    title: 'Interview Skills - AI Mock Interview Platform',
    badge: 'Professional Project',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Azure Speech SDK', 'WebRTC', 'Razorpay', 'Vercel'],
    desc: 'AI-powered platform for technical and behavioral interview practice with voice interaction, AI feedback, interview history, analytics, authentication, subscription workflows, and production deployment support.',
    links: [{ label: 'Live Platform', url: 'https://interviewskills.in' }]
  },
  {
    title: 'Sustainable Smart City Assistant',
    badge: 'NASSCOM Gen AI Internship',
    tech: ['FastAPI', 'Python', 'IBM AI Model', 'Uvicorn', 'CSS'],
    desc: 'Web assistant that provides AI-powered smart city interaction workflows using clean backend routes, IBM AI integration, and responsive styling.',
    links: [{ label: 'GitHub Repo', url: 'https://github.com/pvslakshmideepthi/SustainableSmartCityAssistant' }]
  },
  {
    title: 'Web Development Practice Hub',
    badge: 'Learning Project',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    desc: 'Collection of frontend practice projects showing design fundamentals, page layouts, styling consistency, and web development learning progress.',
    links: [{ label: 'GitHub Repo', url: 'https://github.com/pvslakshmideepthi/Web-development' }]
  }
];

const certifications = [
  'MongoDB Certified: CRUD Operations in MongoDB - Credly Verified',
  'IBM SkillsBuild: Generative AI in Action',
  'Cyber Security with AI - Internshala, 94% final assessment',
  'Python Training - VCR Tech Solutions Pvt. Ltd.'
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
};

const scrollReveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } }
};

function Pill({children}) {
  return <span className="pill">{children}</span>;
}

function SectionTitle({eyebrow, title, children}) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function RevealSection({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={scrollReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.section>
  );
}

function RoleCloud() {
  return (
    <div className="role-cloud" aria-label="Primary roles">
      {profile.roles.map((role, index) => (
        <motion.span
          key={role}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 + index * 0.08 }}
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
}

function App(){
  const [open, setOpen] = React.useState(false);
  const nav = ['About','Skills','Projects','Experience','Profiles','Contact'];
  return <>
    <header className="nav">
      <a className="brand" href="#home"><span>PVSL</span>Deepthi</a>
      <button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'show' : ''}>{nav.map(n => <a key={n} onClick={()=>setOpen(false)} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-glow" />
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="hero-copy">
          <Pill><Sparkles size={16}/> Open to SOC, AI/ML, MERN and Full-Stack roles</Pill>
          <h1 className="typing-headline">{profile.name}</h1>
          <RoleCloud />
          <p>{profile.tagline}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">View Projects </a>
            <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">GitHub <Code2 size={18}/></a>
            <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={18}/></a>
          </div>
          <div className="contact-mini"><span><Mail size={16}/>{profile.email}</span><span><Phone size={16}/>{profile.phone}</span><span><MapPin size={16}/>{profile.location}</span></div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:.95,y:16}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.6,delay:.1}} className="hero-card">
          <div className="status-dot">Portfolio profile</div>
          <div className="avatar">D</div>
          <h2>Security-minded AI Web Engineer</h2>
          <p>Threat-aware interfaces | REST APIs | AI feedback systems | MongoDB analytics | Cloud deployment</p>
          <div className="metric-grid">{stats.map(([a,b])=><div key={b}><strong>{a}</strong><small>{b}</small></div>)}</div>
        </motion.div>
      </section>

      <RevealSection id="about" className="panel about">
        <SectionTitle eyebrow="About" title="Engineering student building real products">
          B.Tech CSE AI & ML student with hands-on MERN stack experience, strong problem-solving practice, and interest in scalable product engineering.
        </SectionTitle>
        <div className="about-grid">
          <div><h3>What I do</h3><p>I design frontend flows, build APIs, connect databases, integrate AI services, test workflows, debug production issues, and present feature demos clearly.</p></div>
          <div><h3>Career focus</h3><p>SOC Analyst Cyber Security, Applied AI/ML Engineer, MERN Stack Developer, and Full Stack Developer roles.</p></div>
          <div><h3>Strength</h3><p>Fast learning, ownership mindset, clean UI building, API integration, coding practice, and communication with technical/non-technical teams.</p></div>
        </div>
      </RevealSection>

      <RevealSection id="skills">
        <SectionTitle eyebrow="Skills" title="Technical toolbox" />
        <div className="skills-grid">{skills.map(({title,icon:Icon,items}) => <article className="skill-card" key={title}><Icon/><h3>{title}</h3><div>{items.map(i=><span key={i}>{i}</span>)}</div></article>)}</div>
      </RevealSection>

      <RevealSection id="projects">
        <SectionTitle eyebrow="Projects" title="Selected work" />
        <div className="project-grid">{projects.map((p, index) => <article className="project" key={p.title}><div className="project-visual"><span>0{index + 1}</span><strong>{p.badge}</strong></div><div className="project-overlay"><span>{p.badge}</span><p>{p.tech.slice(0, 4).join(' / ')}</p></div><Pill>{p.badge}</Pill><h3>{p.title}</h3><p>{p.desc}</p><div className="tech">{p.tech.map(t=><span key={t}>{t}</span>)}</div><div className="project-links">{p.links.map(l=><a href={l.url} target="_blank" rel="noreferrer" key={l.label}>{l.label}<ExternalLink size={16}/></a>)}</div></article>)}</div>
      </RevealSection>

      <RevealSection id="experience" className="timeline-wrap">
        <SectionTitle eyebrow="Experience & Education" title="Professional journey" />
        <div className="timeline">
          <div className="timeline-item"><Briefcase/><div><h3>MERN Stack Intern - VCR Tech Solutions Pvt. Ltd.</h3><small>Since Jul 2025 | Virtual| ONGOING</small><p>Worked on full-stack web features, React UI, Node/Express APIs, MongoDB workflows, AI integrations, payments, deployment, and debugging.</p></div></div>
          <div className="timeline-item"><GraduationCap/><div><h3>B.Tech CSE AI & ML - Seshadri Rao Gudlavalleru Engineering College</h3><small>Aug 2023 - Present | 90%</small><p>Focused on software development, AI/ML foundations, database systems, web technologies, and coding practice.</p></div></div>
          <div className="timeline-item"><Award/><div><h3>Achievements</h3><small>NSS | Sports | Presentation</small><p>NSS volunteer, district-level poster presentation 2nd place, and 1st place in ball badminton for 2 years in JNTUK central zone.</p></div></div>
        </div>
      </RevealSection>

      <RevealSection id="profiles">
        <SectionTitle eyebrow="Profiles" title="Coding and verification links" />
        <div className="profile-grid">
          {Object.entries(profile.links).map(([k,u]) => <a className="profile-card" href={u} target="_blank" rel="noreferrer" key={k}><strong>{k[0].toUpperCase()+k.slice(1)}</strong><span>{u.replace('https://','')}</span><ExternalLink size={18}/></a>)}
        </div>
      </RevealSection>

      <RevealSection className="certs">
        <SectionTitle eyebrow="Certifications" title="Verified learning" />
        <div className="cert-grid">{certifications.map(c=><div key={c}><Award size={20}/>{c}</div>)}</div>
      </RevealSection>

      <RevealSection id="contact" className="contact-card">
        <h2>Let's build something useful.</h2>
        <p>Open to internships, full-stack projects, frontend roles, AI web apps, and collaborative product work.</p>
        <div className="hero-actions center"><a className="btn primary" href={`mailto:${profile.email}`}>Email Me</a><a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a></div>
      </RevealSection>
    </main>
    <footer>Copyright {new Date().getFullYear()} Ponduri Venkata Sai Lakshmi Deepthi. Built with React + Vite.</footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
