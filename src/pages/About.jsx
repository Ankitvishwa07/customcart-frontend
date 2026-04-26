import { useEffect, useRef, useState } from "react";

const About = () => {
  const countersRef = useRef([]);
  const [stats, setStats] = useState({ activeStudents: 0, itemsListed: 0, verifiedStudents: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
          animateCounters(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
        animateCounters({ activeStudents: 0, itemsListed: 0, verifiedStudents: 0 });
      }
    };
    fetchStats();
  }, []);

  const animateCounters = (data) => {
    const targets = [data.activeStudents, data.itemsListed, data.verifiedStudents];
    const suffixes = ["+", "+", ""];
    const duration = 1800;

    countersRef.current.forEach((el, i) => {
      if (!el) return;
      const target = targets[i];
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffixes[i];
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  return (
    <div className="about-wrapper">

      {}
      <section className="cc-hero">
        <div className="cc-hero-badge">🎓 Made for Engineers, by Engineers</div>
        <h1 className="cc-hero-title">
          The Campus Marketplace<br />
          <span className="cc-accent">Built for You</span>
        </h1>
        <p className="cc-hero-sub">
          CustomCart connects engineering students across campuses — buy, sell, and
          trade textbooks, instruments, components, and gear without the hassle.
        </p>

        <div className="cc-stats-row">
          <div className="cc-stat">
            <span className="cc-stat-num" ref={(el) => (countersRef.current[0] = el)}>0+</span>
            <span className="cc-stat-label">Active Students</span>
          </div>
          <div className="cc-stat-divider" />
          <div className="cc-stat">
            <span className="cc-stat-num" ref={(el) => (countersRef.current[1] = el)}>0+</span>
            <span className="cc-stat-label">Items Listed</span>
          </div>
          <div className="cc-stat-divider" />
          <div className="cc-stat">
            <span className="cc-stat-num" ref={(el) => (countersRef.current[2] = el)}>0</span>
            <span className="cc-stat-label">Students Verified</span>
          </div>
        </div>
      </section>

      {}
      <section className="cc-features">
        <div className="cc-features-header">
          <h2 className="cc-section-title">Everything a student needs</h2>
        </div>
        <div className="cc-feature-grid">
          {[
            { icon: "🔒", title: "Verified Students Only", desc: "Every seller is a verified engineering student, so you know exactly who you're dealing with." },
            { icon: "💬", title: "In-App Messaging", desc: "Negotiate, ask questions, and close deals right inside CustomCart — no WhatsApp needed." },
            { icon: "⚡", title: "Lightning Fast Listings", desc: "List your item in under 2 minutes. Snap a photo, set a price, and go live instantly." },
            { icon: "🎓", title: "Campus-First Design", desc: "Built with the engineering student's workflow in mind — simple, no-fluff, just results." },
            { icon: "💰", title: "Zero Commission", desc: "We take nothing. Every rupee of the sale price goes directly to the seller." },
            { icon: "🛡️", title: "Safe Transactions", desc: "Meet on campus or use our guided exchange protocol for worry-free handoffs." },
          ].map((f, i) => (
            <div className="cc-feature-card" key={i}>
              <div className="cc-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
