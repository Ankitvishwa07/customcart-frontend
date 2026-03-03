const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              About Our <span className="highlight">Marketplace</span>
            </h1>
            <p className="hero-subtitle">
              A student-driven digital marketplace built to make buying and selling
              simple, fast, and secure.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1K+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Secure</span>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="about-section description">
          <div className="section-content">
            <h2>Who We Are</h2>
            <div className="content-grid">
              <p>
                Our platform is a modern eCommerce marketplace designed especially 
                for students and young entrepreneurs. We provide a seamless space 
                where users can upload products, connect with buyers, and manage 
                their purchases — all in one place.
              </p>
              <p>
                Built using modern web technologies like React, Spring Boot, and secure 
                authentication systems, our goal is to create a smooth and reliable 
                digital trading experience.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="about-values">
          <div className="value-card mission">
            <div className="value-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              Empower students by giving them an opportunity to earn, sell, and grow 
              through a simple digital platform. Commerce should be accessible, 
              transparent, and easy for everyone.
            </p>
          </div>
          <div className="value-card vision">
            <div className="value-icon">🚀</div>
            <h3>Our Vision</h3>
            <p>
              Become a trusted campus-level marketplace that connects buyers and 
              sellers efficiently while ensuring security and convenience.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-features">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>Everything you need for a seamless marketplace experience</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card secure">
              <div className="feature-icon">🔒</div>
              <h3>Secure Transactions</h3>
              <p>Safe and reliable system with end-to-end encryption for buyers and sellers.</p>
            </div>
            <div className="feature-card simple">
              <div className="feature-icon">🎨</div>
              <h3>Simple Interface</h3>
              <p>Clean, intuitive design that anyone can use without a learning curve.</p>
            </div>
            <div className="feature-card student">
              <div className="feature-icon">🎓</div>
              <h3>Student Focused</h3>
              <p>Built specifically for campus communities with student needs in mind.</p>
            </div>
            <div className="feature-card fast">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Optimized performance for instant browsing and transactions.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
