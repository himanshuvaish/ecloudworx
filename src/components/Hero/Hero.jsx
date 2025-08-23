import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <h1 className="hero__title">Your cloud, simplified.</h1>
            <p className="hero__subtitle">
              eCloudWorx helps you see, manage, and automate all your cloud resources across AWS, Azure, and Google Cloud — without needing to be a certified expert.
            </p>
            <div className="hero__actions">
              <a href="#" className="btn btn--primary btn--lg">
                Start Free Trial
              </a>
              <a href="#" className="btn btn--outline btn--lg">
                Watch Demo
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="dashboard-preview">
              <div className="dashboard-preview__header">
                <h3>Multi-Cloud Dashboard</h3>
                <span className="live-indicator">🟢 Live</span>
              </div>

              <div className="mini-stats">
                <div className="mini-stat">
                  <span className="mini-stat__value">247</span>
                  <span className="mini-stat__label">Resources</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat__value">$1,247</span>
                  <span className="mini-stat__label">Monthly Cost</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-stat__value">3</span>
                  <span className="mini-stat__label">Providers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero