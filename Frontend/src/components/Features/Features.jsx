import { useInView } from 'react-intersection-observer'
import { features } from '../../data/features.js'
import FeatureCard from './FeatureCard.jsx'
import './Features.css'

const Features = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px 0px'
  })

  return (
    <section
      id="features"
      className="features"
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section__title">Why Choose eCloudWorx?</h2>
          <p className="section__subtitle">
            Powerful features designed for teams of all sizes
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={`feature-${index}`}
              feature={feature} 
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features