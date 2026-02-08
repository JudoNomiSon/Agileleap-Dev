import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

const useInView = (ref, threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!ref.current || hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          setIsInView(true);
          hasTriggered.current = true;
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return isInView;
};

const useCounter = (finalValue, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * finalValue));

      if (progress === 1) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, finalValue, duration]);

  return count;
};

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  root: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    backgroundColor: '#0A1628',
    color: '#ffffff',
    overflow: 'hidden',
  },
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(10, 22, 40, 0.8)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '0 40px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navLogo: {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  navCta: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
    border: 'none',
    borderRadius: '24px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  hero: {
    paddingTop: '120px',
    paddingBottom: '80px',
    paddingLeft: '40px',
    paddingRight: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '600px',
    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(255, 107, 53, 0.05) 100%)',
  },
  heroContent: {
    flex: 1,
    maxWidth: '600px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '24px',
  },
  heroPills: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  pill: {
    padding: '8px 16px',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#00D4FF',
    border: '1px solid rgba(0, 212, 255, 0.3)',
  },
  heroCtas: {
    display: 'flex',
    gap: '16px',
  },
  cta: {
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  ctaOutline: {
    padding: '14px 32px',
    background: 'transparent',
    border: '1.5px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  heroImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sherpaImage: {
    maxWidth: '400px',
    width: '100%',
    height: 'auto',
    filter: 'drop-shadow(0 20px 40px rgba(0, 212, 255, 0.2))',
  },
  audienceSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(0, 212, 255, 0.02) 0%, transparent 100%)',
  },
  audienceSectionTitle: {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '60px',
  },
  audienceButtonsContainer: {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    alignItems: 'stretch',
    maxWidth: '1200px',
    margin: '0 auto 60px',
  },
  audienceButton: {
    flex: 1,
    padding: '40px 32px',
    borderRadius: '60px',
    backgroundColor: '#0d1b30',
    border: '1.5px solid',
    textDecoration: 'none',
    color: '#fff',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  audienceButtonLabel: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  audienceButtonSubtitle: {
    fontSize: '14px',
    fontWeight: '500',
    opacity: 0.8,
  },
  sherpaAvatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',
  },
  sherpaAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '3px solid #00D4FF',
    objectFit: 'cover',
  },
  whoWeAreSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '40px',
    fontWeight: '700',
    marginBottom: '40px',
  },
  videoPlaceholder: {
    width: '100%',
    maxWidth: '800px',
    height: '450px',
    backgroundColor: '#020712',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  aiSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  tabs: {
    display: 'flex',
    gap: '0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    marginBottom: '40px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  tabActive: {
    borderBottomColor: '#FF6B35',
    color: '#ffffff',
  },
  tabContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  contentBullets: {
    textAlign: 'left',
    marginBottom: '24px',
  },
  bullet: {
    padding: '12px 0',
    paddingLeft: '24px',
    position: 'relative',
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: '1.6',
  },
  tabCta: {
    marginTop: '24px',
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  partnerSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    padding: '32px',
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#00D4FF',
  },
  cardBullets: {
    textAlign: 'left',
  },
  cardBullet: {
    padding: '8px 0',
    paddingLeft: '20px',
    position: 'relative',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  workSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  step: {
    padding: '40px 32px',
    backgroundColor: '#020712',
    borderRadius: '12px',
    border: '1px solid rgba(255, 107, 53, 0.2)',
    textAlign: 'center',
  },
  stepNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: '16px',
  },
  stepTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  stepDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.6',
  },
  statsSection: {
    paddingTop: '100px',
    paddingBottom: '100px',
    paddingLeft: '40px',
    paddingRight: '40px',
    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '1000px',
    margin: '0 auto 80px',
  },
  stat: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  successCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  successCard: {
    padding: '32px',
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 212, 255, 0.2)',
  },
  successTitle: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  successDesc: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: '1.6',
  },
  footer: {
    paddingTop: '60px',
    paddingBottom: '40px',
    paddingLeft: '40px',
    paddingRight: '40px',
    backgroundColor: '#020712',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerBrand: {
    fontSize: '16px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  },
  footerText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
  },
  footerLink: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '24px',
    textAlign: 'center',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
};

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Product Catalog', href: '/ai-product-catalog' },
    { label: 'Services & Software', href: '/services' },
    { label: 'Industries', href: '/industries-served' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Thinking', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.navLogo}>AgileLeap.AI</div>
      <div style={styles.navLinks}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} style={styles.navLink}>
            {item.label}
          </a>
        ))}
      </div>
      <button style={styles.navCta}>Book a Consultation</button>
      <button
        style={styles.mobileMenu}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
    </nav>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Instant AI Adoption, Custom-Built. Fully Supported.</h1>
        <div style={styles.heroPills}>
          <div style={styles.pill}>Strategic Consulting</div>
          <div style={styles.pill}>Intelligent Solutions</div>
          <div style={styles.pill}>Real Results</div>
        </div>
        <div style={styles.heroCtas}>
          <button style={styles.cta}>Book a Consultation</button>
          <button style={styles.ctaOutline}>Explore Our Solutions</button>
        </div>
      </div>
      <div style={styles.heroImage}>
        <img
          src="/images/sherpa-thumbsup.png"
          alt="Sherpa - Your AI Guide"
          style={styles.sherpaImage}
          className="sherpa-float"
        />
      </div>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-12px); }
        }
        .sherpa-float {
          animation: float 3s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
};

// ============================================================================
// AUDIENCE BUTTONS SECTION
// ============================================================================

const AudienceButtonsSection = () => {
  const buttons = [
    {
      label: 'Vibe Coders',
      subtitle: 'Ship with confidence',
      color: '#00D4FF',
      href: '/vibe-coders',
    },
    {
      label: 'Small & Medium Business',
      subtitle: 'Scale smarter with AI',
      color: '#F2B134',
      href: '/smb',
    },
    {
      label: 'Federal & GovCon',
      subtitle: 'Mission-ready solutions',
      color: '#ff5c7a',
      href: '/federal',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section style={styles.audienceSection}>
      <h2 style={styles.audienceSectionTitle}>Who Are You?</h2>
      <div style={styles.audienceButtonsContainer}>
        {buttons.map((btn, idx) => {
          const isHovered = hoveredIndex === idx;
          const buttonStyle = {
            ...styles.audienceButton,
            borderColor: btn.color,
            boxShadow: isHovered
              ? `0 0 40px ${btn.color}80, inset 0 0 20px ${btn.color}20`
              : `0 0 20px ${btn.color}80, inset 0 0 20px ${btn.color}10`,
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          };

          return (
            <a
              key={btn.label}
              href={btn.href}
              style={buttonStyle}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{ ...styles.audienceButtonLabel, color: btn.color }}>
                {btn.label}
              </div>
              <div style={styles.audienceButtonSubtitle}>{btn.subtitle}</div>
            </a>
          );
        })}
      </div>
      <div style={styles.sherpaAvatarContainer}>
        <img
          src="/images/sherpa-avatar.png"
          alt="Sherpa Avatar"
          style={styles.sherpaAvatar}
        />
      </div>
    </section>
  );
};

// ============================================================================
// WHO WE ARE SECTION
// ============================================================================

const WhoWeAreSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      style={{
        ...styles.whoWeAreSection,
        opacity: isInView ? 1 : 0.5,
        transition: 'opacity 0.6s ease',
      }}
    >
      <h2 style={styles.sectionTitle}>AgileLeap.AI Shaping The Future</h2>
      <div style={styles.videoPlaceholder}>
        [Video Placeholder - Product Demo]
      </div>
    </section>
  );
};

// ============================================================================
// AIAAS SECTION
// ============================================================================

const AIaaS = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Next Gen AI Delivery',
      description:
        'New, rapid approach to AI adoption—ready-to-run, expertly customized, and supported throughout the lifecycle.',
      bullets: [
        'Prebuilt for Customization & Integration',
        'Designed for Rapid Adoptions',
        'Plug & Play Agents',
        'On-going Support & Updates',
        'Greater flexibility and Expert Configuration',
      ],
      cta: 'Discover Our Plug & Play AI Agents',
    },
    {
      label: 'Strategic Business & AI Consulting',
      description:
        'From assessment to execution, we turn complexity into clarity—ensuring your AI investments drive measurable results.',
      bullets: [
        'Industry domain experts',
        'In-depth AI readiness assessments',
        'Business process analysis & opportunity mapping',
        'Data strategy development',
        'Road mapping for AI integration at scale',
      ],
      cta: 'Our Consulting Services',
    },
    {
      label: 'Our Platforms and Global Teams',
      description:
        'Powered by secure, enterprise-ready platforms and a global network of cross-functional experts.',
      bullets: [
        'Over 2,000 cross-functional team members',
        'Ready to jump-in and deliver',
        'Localized US Veteran Owned with domain knowledge',
        'Trusted platforms with security focus',
        'Agile & SAFe frameworks',
      ],
      cta: 'Explore Our Platforms',
    },
    {
      label: 'US Veteran-Owned (SDVOSB)',
      description: 'Service-Security & Success: Every Mission, Every Project.',
      bullets: [
        'SDVOSB status helps primes meet small business and diversity goals',
        'Cleared veteran-led teams',
        'Flexible—prime sub or teaming',
        'Seamless collaboration',
      ],
      cta: 'Learn About Our Defense Capabilities',
    },
  ];

  return (
    <section style={styles.aiSection}>
      <h2 style={styles.sectionTitle}>AI as a Service</h2>
      <div style={styles.tabs}>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            style={{
              ...styles.tab,
              ...(activeTab === idx ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.tabContent}>
        <p style={{ fontSize: '16px', marginBottom: '24px', color: 'rgba(255,255,255,0.85)' }}>
          {tabs[activeTab].description}
        </p>
        <div style={styles.contentBullets}>
          {tabs[activeTab].bullets.map((bullet, idx) => (
            <div key={idx} style={styles.bullet}>
              • {bullet}
            </div>
          ))}
        </div>
        <button style={styles.tabCta}>{tabs[activeTab].cta}</button>
      </div>
    </section>
  );
};

// ============================================================================
// HOW WE PARTNER SECTION
// ============================================================================

const HowWePartnerSection = () => {
  const cards = [
    {
      title: 'Personalized Strategic Guidance',
      points: [
        'Executive-level strategic planning',
        'AI readiness assessment',
        'Customized roadmap development',
      ],
    },
    {
      title: 'Flexible Team Extension',
      points: [
        'Augment your existing team',
        'Access specialized AI expertise',
        'Scalable resource allocation',
      ],
    },
    {
      title: 'Embedded Collaboration',
      points: [
        'Direct integration with your workflows',
        'Real-time partnership and guidance',
        'Transparent communication channels',
      ],
    },
    {
      title: 'End-to-End Support',
      points: [
        'From discovery through optimization',
        'Ongoing technical support',
        'Continuous improvement and updates',
      ],
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section style={styles.partnerSection}>
      <h2 style={styles.sectionTitle}>How We Partner With You</h2>
      <div style={styles.cardsGrid}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              ...styles.card,
              transform: hoveredIndex === idx ? 'translateY(-8px)' : 'translateY(0)',
              boxShadow:
                hoveredIndex === idx
                  ? '0 20px 40px rgba(0, 212, 255, 0.2)'
                  : 'none',
            }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={styles.cardTitle}>{card.title}</div>
            <div style={styles.cardBullets}>
              {card.points.map((point, pidx) => (
                <div key={pidx} style={styles.cardBullet}>
                  ✓ {point}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// HOW WE WORK SECTION
// ============================================================================

const HowWeWorkSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Rapid assessment of your current state and goals.',
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Solution roadmap and business case.',
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Agile delivery, measurable milestones.',
    },
    {
      number: '04',
      title: 'Support',
      description: 'Ongoing optimization & success partnership.',
    },
  ];

  return (
    <section style={styles.workSection}>
      <h2 style={styles.sectionTitle}>How We Work</h2>
      <div style={styles.stepsGrid}>
        {steps.map((step, idx) => (
          <div key={idx} style={styles.step}>
            <div style={styles.stepNumber}>{step.number}</div>
            <h3 style={styles.stepTitle}>{step.title}</h3>
            <p style={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// WHAT WE'VE DELIVERED SECTION
// ============================================================================

const WhatWeDeliveredSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const stats = [
    { number: 150, label: 'Projects', suffix: '+' },
    { number: 98, label: 'Satisfaction', suffix: '%' },
    { number: 45, label: 'AI Models', suffix: '+' },
    { number: 30, label: 'Partners', suffix: '+' },
  ];

  const successStories = [
    {
      title: 'Fortune 500 Digital Transformation',
      description:
        'Deployed AI-driven process automation across 12 divisions, reducing operational costs by 35%.',
    },
    {
      title: 'Healthcare AI Integration',
      description:
        'Implemented predictive analytics platform for a leading healthcare provider, improving patient outcomes.',
    },
    {
      title: 'Financial Services Modernization',
      description:
        'Built custom AI agents for risk assessment and compliance, enhancing decision-making capabilities.',
    },
  ];

  return (
    <section ref={ref} style={styles.statsSection}>
      <h2 style={styles.sectionTitle}>What We've Delivered</h2>

      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => {
          const count = useCounter(stat.number, isInView, 2000);
          return (
            <div key={idx} style={styles.stat}>
              <div style={styles.statNumber}>
                {count}
                {stat.suffix}
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div style={styles.successCards}>
        {successStories.map((story, idx) => (
          <div key={idx} style={styles.successCard}>
            <h3 style={styles.successTitle}>{story.title}</h3>
            <p style={styles.successDesc}>{story.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <div style={styles.footerBrand}>AgileLeap.AI</div>
          <p style={styles.footerText}>
            Instant AI Adoption, Custom-Built. Fully Supported.
          </p>
        </div>

        <div style={styles.footerSection}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
            Address
          </div>
          <p style={styles.footerText}>
            3343 Peachtree Rd NE, Suite 145<br />
            Atlanta, GA 30326
          </p>
        </div>

        <div style={styles.footerSection}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
            Contact
          </div>
          <a href="tel:18335706313" style={styles.footerLink}>
            (833) 570-6313
          </a>
          <a href="mailto:Rongriff@agileleap.ai" style={styles.footerLink}>
            Rongriff@agileleap.ai
          </a>
        </div>

        <div style={styles.footerSection}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
            Follow
          </div>
          <a
            href="https://www.linkedin.com/in/griffinron"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div style={styles.footerBottom}>
        © 2025 AgileLeap.AI. All rights reserved.
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AgileLeapHomepage() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      button {
        font-family: inherit;
      }

      @media (max-width: 768px) {
        nav {
          padding: 0 20px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.root}>
      <Navigation />
      <HeroSection />
      <AudienceButtonsSection />
      <WhoWeAreSection />
      <AIaaS />
      <HowWePartnerSection />
      <HowWeWorkSection />
      <WhatWeDeliveredSection />
      <Footer />
    </div>
  );
}
