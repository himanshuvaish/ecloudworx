import { useInView } from 'react-intersection-observer'

const FeatureCard = ({ feature, index, inView: parentInView }) => {
  const { ref: cardRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const shouldAnimate = parentInView && inView

  return (
    <div
      ref={cardRef}
      className={`feature-card ${shouldAnimate ? 'animate-in' : ''}`}
      style={{
        animationDelay: `${index * 150}ms`
      }}
    >
      <div className="feature-card__icon">
        {feature.icon}
      </div>
      <h3 className="feature-card__title">
        {feature.title}
      </h3>
      <p className="feature-card__description">
        {feature.description}
      </p>
    </div>
  )
}

export default FeatureCard