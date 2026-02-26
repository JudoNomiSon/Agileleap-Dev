import { useState, useEffect } from "react";

// ─── Design Tokens ────────────────────────────────────────────────────────────

const c = {
  bg: "#080d19",
  bgAlt: "#0c1222",
  card: "#0f1729",
  cardHover: "#141e34",
  accent: "#00e5c8",
  accentDim: "rgba(0,229,200,0.12)",
  accentBorder: "rgba(0,229,200,0.25)",
  gold: "#c9a227",
  goldDim: "rgba(201,162,39,0.12)",
  goldBorder: "rgba(201,162,39,0.3)",
  white: "#ffffff",
  g100: "#f1f5f9",
  g300: "#cbd5e1",
  g400: "#94a3b8",
  g500: "#64748b",
  g700: "#1e293b",
  navy: "#0a1025",
};

const f = {
  h: "'Merriweather', 'Georgia', 'Times New Roman', serif",
  b: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  m: "'SF Mono', 'Fira Code', 'Consolas', monospace",
};

// ─── Badge Component ──────────────────────────────────────────────────────────

function Badge({ children, gold }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 14px",
        borderRadius: 3,
        border: `1px solid ${gold ? c.goldBorder : c.accentBorder}`,
        background: gold ? c.goldDim : c.accentDim,
        fontSize: 11,
        color: gold ? c.gold : c.accent,
        fontFamily: f.m,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHead({ badge, badgeGold, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      {badge && (
        <div style={{ marginBottom: 20 }}>
          <Badge gold={badgeGold}>{badge}</Badge>
        </div>
      )}
      <h2 style={{ fontFamily: f.h, fontSize: 40, fontWeight: 700, color: c.white, lineHeight: 1.2, marginBottom: subtitle ? 16 : 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: f.b, fontSize: 17, color: c.g400, maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>{subtitle}</p>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Home", "Services & Software", "AI Product Catalog", "Industries", "About Us", "Contact"];
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 72,
        background: scrolled ? "rgba(8,13,25,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.g700}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36, border: `2px solid ${c.accent}`, transform: "rotate(45deg)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ transform: "rotate(-45deg)", fontFamily: f.h, fontWeight: 700, fontSize: 15, color: c.accent }}>AL</span>
        </div>
        <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: 17, color: c.white, letterSpacing: 0.5 }}>AgileLeap.AI</span>
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {links.map((l) => (
          <a key={l} href="#" style={{ color: c.g300, fontFamily: f.b, fontSize: 13.5, fontWeight: 500, textDecoration: "none", letterSpacing: 0.3, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = c.accent)} onMouseLeave={(e) => (e.target.style.color = c.g300)}>{l}</a>
        ))}
        <a href="#" style={{ padding: "10px 22px", background: c.accent, color: c.navy, fontFamily: f.b, fontWeight: 700, fontSize: 13.5, borderRadius: 4, textDecoration: "none" }}>
          Request a Briefing
        </a>
      </div>
    </nav>
  );
}

// ─── Logo Splash (Brand Identity) ────────────────────────────────────────────

function LogoSplash() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: c.white, position: "relative", overflow: "hidden",
    }}>
      {/* Subtle grid background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(8,13,25,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(8,13,25,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Large diamond monogram */}
        <div style={{ display: "inline-block", marginBottom: 48 }}>
          <div style={{
            width: 200, height: 200, border: `3px solid ${c.bg}`, transform: "rotate(45deg)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              transform: "rotate(-45deg)", fontFamily: f.h, fontWeight: 900, fontSize: 72,
              color: c.bg, letterSpacing: -2,
            }}>AL</span>
          </div>
        </div>
        {/* Brand name */}
        <h1 style={{
          fontFamily: f.h, fontSize: 28, fontWeight: 700, color: c.bg,
          letterSpacing: 3, textTransform: "uppercase", marginBottom: 32,
        }}>
          AgileLeap.AI
        </h1>
        {/* Tagline */}
        <p style={{
          fontFamily: f.h, fontSize: 22, fontWeight: 400, fontStyle: "italic",
          color: c.bg, lineHeight: 1.5, maxWidth: 600,
        }}>
          Governed AI Delivery, Custom-Built. Fully Supported.
        </p>
        {/* SDVOSB badge */}
        <div style={{ marginTop: 36 }}>
          <span style={{
            fontFamily: f.m, fontSize: 11, color: c.g500, letterSpacing: 2,
            textTransform: "uppercase", borderBottom: `2px solid ${c.accent}`, paddingBottom: 4,
          }}>
            SBA SDVOSB Certified &bull; DOD-Grade AI Solutions
          </span>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: f.m, fontSize: 10, color: c.g500, letterSpacing: 1.5, textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${c.g500}, transparent)` }} />
      </div>
    </section>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function Hero() {
  const certs = ["SBA SDVOSB Certified", "CMMC 2.0 Compliant", "SOC 2 Certified", "ISO 27001"];
  return (
    <section style={{
      position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
      background: `linear-gradient(160deg, ${c.bg} 0%, #0b1428 50%, #091320 100%)`,
      overflow: "hidden", padding: "100px 80px 80px",
    }}>
      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(0,229,200,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,200,0.025) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "5%", right: "0%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,200,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
      {/* Shield watermark */}
      <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)", opacity: 0.05 }}>
        <svg width="420" height="500" viewBox="0 0 420 500" fill="none">
          <path d="M210 20L400 110V300C400 395 315 455 210 490C105 455 20 395 20 300V110L210 20Z" stroke={c.accent} strokeWidth="2" />
          <path d="M210 70L360 140V290C360 365 295 415 210 445C125 415 60 365 60 290V140L210 70Z" stroke={c.accent} strokeWidth="1" />
        </svg>
      </div>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
        {/* Left accent bars */}
        <div style={{ borderLeft: `4px solid ${c.accent}`, paddingLeft: 28, marginBottom: 32 }}>
          <h2 style={{ fontFamily: f.h, fontSize: 52, fontWeight: 700, lineHeight: 1.18, color: c.white }}>
            Governed AI Delivery
          </h2>
          <h2 style={{ fontFamily: f.h, fontSize: 52, fontWeight: 700, lineHeight: 1.18, color: c.accent }}>
            for Federal Agencies
          </h2>
          <h2 style={{ fontFamily: f.h, fontSize: 52, fontWeight: 700, lineHeight: 1.18, color: c.white }}>
            & Government Contractors
          </h2>
        </div>
        <div style={{ paddingLeft: 28, marginBottom: 20 }}>
          <p style={{ fontFamily: f.m, fontSize: 13, color: c.accent, letterSpacing: 2, textTransform: "uppercase" }}>
            Intelligent Solutions &bull; Real Results
          </p>
        </div>
        <div style={{
          borderLeft: `2px solid ${c.accentBorder}`, paddingLeft: 28, marginBottom: 40,
          maxWidth: 560,
        }}>
          <p style={{ fontFamily: f.b, fontSize: 17, lineHeight: 1.65, color: c.g300 }}>
            Eliminate procurement risk. Accelerate AI adoption. Ensure compliance. Transform your federal agency or defense program with DOD-grade AI solutions, expert consulting, and global delivery powered by 25+ years of enterprise leadership.
          </p>
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 56, paddingLeft: 28 }}>
          <a href="#" style={{ padding: "14px 32px", background: c.accent, color: c.navy, fontFamily: f.b, fontWeight: 700, fontSize: 15, borderRadius: 4, textDecoration: "none", border: `2px solid ${c.accent}` }}>
            Book a Consultation &rarr;
          </a>
          <a href="#" style={{ padding: "14px 32px", border: `2px solid ${c.g500}`, color: c.white, fontFamily: f.b, fontWeight: 600, fontSize: 15, borderRadius: 4, textDecoration: "none" }}>
            Explore Our Solutions &rarr;
          </a>
        </div>
        {/* Stat bar */}
        <div style={{ display: "flex", gap: 36, paddingTop: 32, borderTop: `1px solid ${c.g700}` }}>
          {[
            { val: "$10M+", label: "Delivered Federal Performance" },
            { val: "2%", label: "Elite AI SDVOSB Status" },
            { val: "4,000+", label: "Vetted Developers Worldwide" },
            { val: "99.99%", label: "Uptime SLA" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: f.h, fontSize: 26, fontWeight: 700, color: c.accent }}>{s.val}</div>
              <div style={{ fontFamily: f.b, fontSize: 12, color: c.g400, maxWidth: 130, marginTop: 4, lineHeight: 1.35 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {/* Compliance strip */}
        <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
          {certs.map((cert) => (
            <span key={cert} style={{ fontFamily: f.m, fontSize: 10.5, color: c.g500, letterSpacing: 0.8, textTransform: "uppercase" }}>
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Federal Credentials Strip ────────────────────────────────────────────────

function CredentialStrip() {
  const items = [
    { label: "CAGE Code", value: "9ZNN6" },
    { label: "UEI", value: "VC6CSRWJY4N8" },
    { label: "SAM.gov", value: "Active & Verified" },
    { label: "SDVOSB", value: "SBA Certified (2026–2029)" },
    { label: "NAICS Codes", value: "541512 · 541511 · 541513 · 541519 · 541690 · 518210 · 541715" },
  ];
  return (
    <section style={{ background: c.navy, padding: "28px 80px", borderTop: `1px solid ${c.g700}`, borderBottom: `1px solid ${c.g700}` }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
        {items.map((it) => (
          <div key={it.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: f.m, fontSize: 10, color: c.g500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{it.label}</div>
            <div style={{ fontFamily: f.b, fontSize: 14, fontWeight: 600, color: c.g300 }}>{it.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SpecOps.AI Platform Section ──────────────────────────────────────────────

function SpecOps() {
  const agents = [
    {
      name: "SHERPA",
      subtitle: "Scan-to-SOW Engine",
      desc: "Converts vague AI requirements into structured work packages with compliance gates, acceptance criteria, and outcome proof. Eliminates procurement ambiguity for federal contracts.",
      icon: "📋",
    },
    {
      name: "OVERWATCH",
      subtitle: "Three-Model State Comparison",
      desc: "Continuously validates AI agent outputs by comparing three independent model perspectives, ensuring accuracy and trustworthiness for mission-critical decision-making.",
      icon: "🛡️",
    },
    {
      name: "ORCHESTRATOR",
      subtitle: "Compliance Governance Proxy",
      desc: "Manages all AI agent actions through a compliance-tiered governance layer. Scans and governs code against NIST, CMMC, FedRAMP, HIPAA, SOC 2, and ISO 42001 frameworks in real time.",
      icon: "⚙️",
    },
  ];
  return (
    <section style={{ background: c.bg, padding: "100px 80px" }}>
      <SectionHead
        badge="Proprietary Platform"
        title={<>Powered by <span style={{ color: c.accent }}>SpecOps.AI</span></>}
        subtitle="Our governed AI delivery platform provides end-to-end compliance automation, agent governance, and outcome-based accountability — built specifically for federal and DOD environments."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
        {agents.map((a) => (
          <div
            key={a.name}
            style={{
              padding: 36, background: c.card, borderRadius: 8, border: `1px solid ${c.g700}`,
              borderTop: `3px solid ${c.accent}`, transition: "border-color 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accentBorder; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.g700; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderTopColor = c.accent; }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{a.icon}</div>
            <h3 style={{ fontFamily: f.h, fontSize: 20, fontWeight: 700, color: c.accent, marginBottom: 4 }}>{a.name}</h3>
            <div style={{ fontFamily: f.m, fontSize: 11, color: c.g500, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 16 }}>{a.subtitle}</div>
            <p style={{ fontFamily: f.b, fontSize: 14.5, color: c.g400, lineHeight: 1.6 }}>{a.desc}</p>
          </div>
        ))}
      </div>
      {/* Product catalog highlight */}
      <div style={{ maxWidth: 1100, margin: "48px auto 0", padding: 32, background: c.card, borderRadius: 8, border: `1px solid ${c.g700}` }}>
        <div style={{ fontFamily: f.m, fontSize: 11, color: c.g500, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16 }}>Platform Products</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {[
            "Governed AI Delivery Platform",
            "AI Agent & Assistant Builder",
            "Compliance Automation Engine",
            "Outcome Attribution Engine",
            "DevSecOps & CI/CD Platform",
          ].map((p, i) => (
            <div key={p} style={{ padding: "14px 16px", background: c.bgAlt, borderRadius: 6, border: `1px solid ${c.g700}` }}>
              <div style={{ fontFamily: f.h, fontSize: 22, fontWeight: 700, color: c.accentDim, marginBottom: 6 }}>0{i + 1}</div>
              <div style={{ fontFamily: f.b, fontSize: 13, fontWeight: 600, color: c.g300, lineHeight: 1.4 }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <a href="https://www.specops.ai/federal" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 36px", border: `2px solid ${c.accent}`, color: c.accent, fontFamily: f.b, fontWeight: 700, fontSize: 14, borderRadius: 4, textDecoration: "none" }}>
          Explore SpecOps.AI Platform &rarr;
        </a>
      </div>
    </section>
  );
}

// ─── Core Capabilities (Tabbed) ───────────────────────────────────────────────

function Capabilities() {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      label: "AI & Intelligent Automation", icon: "🤖",
      points: [
        "Generative AI & LLM integration, fine-tuning, and RAG implementations",
        "Custom AI agent development and plug-and-play deployment",
        "RPA solutions (UiPath, n8n) with intelligent document processing",
        "Business process mining and AI-driven workflow optimization",
        "Ongoing model governance, monitoring, and compliance alignment",
      ],
    },
    {
      label: "Cybersecurity & Compliance", icon: "🔒",
      points: [
        "CMMC 2.0 Level 1 & Level 2 readiness and compliance",
        "SOC 2, HIPAA, GDPR, and ISO 27001 audit-ready delivery",
        "Penetration testing, vulnerability assessments, and red teaming",
        "24/7 Security Operations Center with incident response",
        "DevSecOps integration and zero-trust architecture",
      ],
    },
    {
      label: "Enterprise Cloud & Infra", icon: "☁️",
      points: [
        "DOD-grade hosting with CMMC 2.0 compliant infrastructure",
        "AWS, Azure, and GCP migration and multi-cloud architecture",
        "Cloud-native application development and containerization",
        "99.99% uptime SLA with 24/7 monitoring and disaster recovery",
        "Infrastructure as Code with Terraform and CloudFormation",
      ],
    },
    {
      label: "Custom Software & Modernization", icon: "💻",
      points: [
        "Enterprise SaaS platform development (React, Angular, Vue, Flutter)",
        "Full-stack engineering in Java, .NET, Python, and Node.js",
        "Mainframe and legacy modernization programs",
        "ERP/CRM integration (SAP, Salesforce, Dynamics 365)",
        "API development, third-party integration, and code refactoring",
      ],
    },
    {
      label: "Data & Analytics", icon: "📊",
      points: [
        "Big data engineering and modern data platform architecture",
        "Business intelligence and data visualization dashboards",
        "Predictive analytics and machine learning model deployment",
        "Data governance, quality management, and compliance frameworks",
        "Snowflake, AWS, and Azure data platform expertise",
      ],
    },
  ];
  return (
    <section style={{ background: c.bgAlt, padding: "100px 80px" }}>
      <SectionHead badge="Full-Spectrum Delivery" title="Core Capabilities" subtitle="Six practice areas delivering end-to-end technology solutions for federal, defense, and enterprise clients." />
      <div style={{ display: "flex", gap: 28, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 280 }}>
          {tabs.map((t, i) => (
            <button key={t.label} onClick={() => setActive(i)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", textAlign: "left", cursor: "pointer",
              background: active === i ? c.card : "transparent", border: active === i ? `1px solid ${c.accentBorder}` : "1px solid transparent",
              borderLeft: active === i ? `3px solid ${c.accent}` : "3px solid transparent", borderRadius: 6, transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              <span style={{ fontFamily: f.b, fontSize: 13.5, fontWeight: active === i ? 600 : 500, color: active === i ? c.white : c.g400 }}>{t.label}</span>
            </button>
          ))}
        </div>
        <div style={{ flex: 1, padding: 40, background: c.card, borderRadius: 8, border: `1px solid ${c.g700}` }}>
          <h3 style={{ fontFamily: f.h, fontSize: 24, fontWeight: 700, color: c.white, marginBottom: 24 }}>{tabs[active].label}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {tabs[active].points.map((p, i) => (
              <li key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <span style={{ color: c.accent, fontSize: 14, marginTop: 3, flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: f.b, fontSize: 14.5, color: c.g300, lineHeight: 1.5 }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Past Performance ─────────────────────────────────────────────────────────

function PastPerformance() {
  const agencies = [
    { name: "U.S. Navy", desc: "AI-driven automation, legacy system modernization, secure infrastructure deployment" },
    { name: "U.S. Air Force", desc: "Cloud migration, cybersecurity hardening, data analytics platforms" },
    { name: "U.S. Army", desc: "Enterprise software development, digital transformation, DevSecOps" },
    { name: "NASA", desc: "Mission-critical AI deployment, secure communications, rapid prototyping" },
    { name: "CDC", desc: "Healthcare data analytics, HIPAA-compliant systems, public health technology" },
  ];
  return (
    <section style={{ background: c.bg, padding: "100px 80px" }}>
      <SectionHead
        badge="Proven Federal Execution"
        title="$10M+ Delivered Across DOD & Civilian"
        subtitle="Past performance spanning the Department of Defense, intelligence community, and civilian agencies."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
        {agencies.map((a) => (
          <div key={a.name} style={{ padding: 28, background: c.card, borderRadius: 8, border: `1px solid ${c.g700}`, borderTop: `3px solid ${c.accent}`, textAlign: "center" }}>
            <h4 style={{ fontFamily: f.h, fontSize: 16, fontWeight: 700, color: c.white, marginBottom: 10 }}>{a.name}</h4>
            <p style={{ fontFamily: f.b, fontSize: 13, color: c.g400, lineHeight: 1.5 }}>{a.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <p style={{ fontFamily: f.m, fontSize: 12, color: c.g500, letterSpacing: 0.8 }}>
          ENGAGEMENT MODELS: Prime &bull; Sub &bull; Team Aug &bull; Staff Aug &bull; Managed Services
        </p>
      </div>
    </section>
  );
}

// ─── SDVOSB Value Proposition ─────────────────────────────────────────────────

function SDVOSBSection() {
  const cards = [
    {
      stat: "5%", label: "Statutory Mandate",
      desc: "FY2024 NDAA increased the federal SDVOSB goal from 3% to 5% — a 67% increase. Primes must demonstrate meaningful SDVOSB subcontracting or risk losing evaluation points.",
      sub: "$31B+ Annual SDVOSB Target",
    },
    {
      stat: "10–15", label: "Evaluation Preference Points",
      desc: "In DOD, VA, and GSA full & open competitions, SDVOSB teaming partners deliver 10–15 evaluation preference points — often the margin between winning and losing a bid.",
      sub: "Decisive Advantage on DOD Bids",
    },
    {
      stat: "2026", label: "DOD Audit Escalation",
      desc: "DOD expanded its audit of all small business set-aside contracts over $20M. Primes must prove compliance with subcontracting limitations. Pass-through abuse is being eliminated.",
      sub: "Compliance Deadline in Effect",
    },
  ];
  return (
    <section style={{ background: c.bgAlt, padding: "100px 80px" }}>
      <SectionHead
        badge="SDVOSB Strategic Advantage"
        badgeGold
        title="Why Primes Need SDVOSB Partners Now"
        subtitle="The DOD small business compliance landscape has changed. SDVOSB is strategic, not optional."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
        {cards.map((card) => (
          <div key={card.label} style={{ padding: 36, background: c.card, borderRadius: 8, border: `1px solid ${c.goldBorder}`, textAlign: "center" }}>
            <div style={{ fontFamily: f.h, fontSize: 48, fontWeight: 700, color: c.gold }}>{card.stat}</div>
            <div style={{ fontFamily: f.m, fontSize: 11, color: c.gold, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16 }}>{card.label}</div>
            <p style={{ fontFamily: f.b, fontSize: 14, color: c.g400, lineHeight: 1.55, marginBottom: 16 }}>{card.desc}</p>
            <div style={{ fontFamily: f.b, fontSize: 12, fontWeight: 600, color: c.g300 }}>{card.sub}</div>
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: 1100, margin: "40px auto 0", padding: "24px 36px", background: c.card, borderRadius: 8,
        border: `1px solid ${c.g700}`, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap",
      }}>
        {["Booz Allen Hamilton", "Leidos", "SAIC", "Lockheed Martin", "CACI", "ManTech", "GDIT", "Peraton"].map((p) => (
          <span key={p} style={{ fontFamily: f.b, fontSize: 13, color: c.g500, fontWeight: 500 }}>{p}</span>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <span style={{ fontFamily: f.m, fontSize: 10.5, color: c.g500, letterSpacing: 0.8, textTransform: "uppercase" }}>
          Target Prime Partners for SDVOSB Subcontracting
        </span>
      </div>
    </section>
  );
}

// ─── How We Work (Process) ────────────────────────────────────────────────────

function Process() {
  const steps = [
    { num: "01", title: "Discovery & Assessment", desc: "Rapid evaluation of current state, mission requirements, compliance posture, and AI readiness." },
    { num: "02", title: "Strategy & Architecture", desc: "Solution roadmap, business case development, and technical architecture aligned to security requirements." },
    { num: "03", title: "Agile Implementation", desc: "Iterative delivery with measurable milestones, SAFe frameworks, and continuous stakeholder visibility." },
    { num: "04", title: "Ongoing Partnership", desc: "Continuous optimization, model governance, platform updates, and dedicated success management." },
  ];
  return (
    <section style={{ background: c.bg, padding: "100px 80px" }}>
      <SectionHead badge="Our Process" title="How We Deliver" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {steps.map((s) => (
          <div key={s.num} style={{ padding: 30, background: c.card, borderRadius: 8, border: `1px solid ${c.g700}`, borderTop: `3px solid ${c.accent}` }}>
            <div style={{ fontFamily: f.m, fontSize: 32, fontWeight: 700, color: c.accentDim, marginBottom: 14 }}>{s.num}</div>
            <h4 style={{ fontFamily: f.h, fontSize: 17, fontWeight: 700, color: c.white, marginBottom: 10 }}>{s.title}</h4>
            <p style={{ fontFamily: f.b, fontSize: 13.5, color: c.g400, lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${c.navy} 0%, ${c.bg} 100%)`, padding: "80px", textAlign: "center",
      borderTop: `1px solid ${c.g700}`, borderBottom: `1px solid ${c.g700}`,
    }}>
      <h2 style={{ fontFamily: f.h, fontSize: 34, fontWeight: 700, color: c.white, marginBottom: 16 }}>
        Let's Build Mission-Critical Solutions Together
      </h2>
      <p style={{ fontFamily: f.b, fontSize: 17, color: c.g400, maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.6 }}>
        Whether you need a trusted SDVOSB partner, a governed AI platform, or a world-class delivery team — we're ready to deploy.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <a href="#" style={{ padding: "14px 36px", background: c.accent, color: c.navy, fontFamily: f.b, fontWeight: 700, fontSize: 15, borderRadius: 4, textDecoration: "none" }}>
          Book a Consultation &rarr;
        </a>
        <a href="#" style={{ padding: "14px 36px", border: `1px solid ${c.g500}`, color: c.white, fontFamily: f.b, fontWeight: 600, fontSize: 15, borderRadius: 4, textDecoration: "none" }}>
          Download Capabilities Brief
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: c.bg, padding: "48px 80px 32px", borderTop: `1px solid ${c.g700}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
        <div>
          <span style={{ fontFamily: f.h, fontWeight: 700, fontSize: 17, color: c.white }}>AgileLeap.AI</span>
          <p style={{ fontFamily: f.b, fontSize: 13, color: c.g500, maxWidth: 300, lineHeight: 1.5, marginTop: 12 }}>
            Governed AI delivery for federal agencies and government contractors. SBA SDVOSB Certified. Atlanta, GA.
          </p>
          <p style={{ fontFamily: f.m, fontSize: 12, color: c.g500, marginTop: 10 }}>
            3343 Peachtree Rd NE, Suite 145<br />Atlanta, GA 30326, USA
          </p>
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          <div>
            <h4 style={{ fontFamily: f.b, fontSize: 12, fontWeight: 600, color: c.g400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>Solutions</h4>
            {["AI & Automation", "SpecOps.AI Platform", "Cybersecurity & Compliance", "Global Delivery", "Strategic Consulting"].map((l) => (
              <a key={l} href="#" style={{ display: "block", fontFamily: f.b, fontSize: 13, color: c.g500, textDecoration: "none", marginBottom: 9 }}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: f.b, fontSize: 12, fontWeight: 600, color: c.g400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>Company</h4>
            {["About Us", "Industries", "Past Performance", "Thinking", "Contact"].map((l) => (
              <a key={l} href="#" style={{ display: "block", fontFamily: f.b, fontSize: 13, color: c.g500, textDecoration: "none", marginBottom: 9 }}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: f.b, fontSize: 12, fontWeight: 600, color: c.g400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 14 }}>Connect</h4>
            <a href="tel:18335706313" style={{ display: "block", fontFamily: f.b, fontSize: 13, color: c.g500, textDecoration: "none", marginBottom: 9 }}>1 (833) 570-6313</a>
            <a href="mailto:Rongriff@agileleap.ai" style={{ display: "block", fontFamily: f.b, fontSize: 13, color: c.g500, textDecoration: "none", marginBottom: 9 }}>Rongriff@agileleap.ai</a>
            <a href="https://www.linkedin.com/in/griffinron" style={{ display: "block", fontFamily: f.b, fontSize: 13, color: c.g500, textDecoration: "none", marginBottom: 9 }}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.g700}`, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontFamily: f.b, fontSize: 12, color: c.g500 }}>&copy; 2026 AgileLeap.AI — All rights reserved.</p>
        <p style={{ fontFamily: f.m, fontSize: 11, color: c.g500, letterSpacing: 0.5 }}>SBA SDVOSB Certified &bull; CMMC 2.0 &bull; SOC 2 &bull; ISO 27001</p>
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function AgileLeapHomepage() {
  return (
    <div style={{ background: c.bg, minHeight: "100vh", margin: 0, padding: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700;900&display=swap" rel="stylesheet" />
      <Navbar />
      <LogoSplash />
      <Hero />
      <CredentialStrip />
      <SpecOps />
      <Capabilities />
      <PastPerformance />
      <SDVOSBSection />
      <Process />
      <CTA />
      <Footer />
    </div>
  );
}
