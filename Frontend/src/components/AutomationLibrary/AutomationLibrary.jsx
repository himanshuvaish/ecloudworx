import { useState } from 'react'
import './AutomationLibrary.css'

const automations = [
  {
    id: 1,
    title: "Stop Idle EC2 Instances",
    description: "Automatically detect and stop unused instances to save costs",
    category: "cost",
    difficulty: "Easy",
    savings: "Up to 40% savings"
  },
  {
    id: 2,
    title: "S3 Bucket Security Audit",
    description: "Check for public buckets and apply security best practices",
    category: "security",
    difficulty: "Easy",
    savings: "Risk Reduction"
  },
  {
    id: 3,
    title: "Cross-Cloud Backup Setup",
    description: "Automated backup strategy across multiple cloud providers",
    category: "backup",
    difficulty: "Medium",
    savings: "Data Protection"
  }
]

const AutomationLibrary = () => {
  const [deployingId, setDeployingId] = useState(null)

  const handleDeploy = (id) => {
    setDeployingId(id)
    setTimeout(() => setDeployingId(null), 2000)
  }

  return (
    <section className="automation-library">
      <div className="container">
        <div className="section-header">
          <h2 className="section__title">Automation Library</h2>
          <p className="section__subtitle">
            Pre-built templates for common cloud management tasks
          </p>
        </div>

        <div className="automation-grid">
          {automations.map((automation) => (
            <div key={automation.id} className="automation-card">
              <div className="automation-card__header">
                <h4>{automation.title}</h4>
                <span className={`difficulty-badge difficulty--${automation.difficulty.toLowerCase()}`}>
                  {automation.difficulty}
                </span>
              </div>

              <p className="automation-card__description">
                {automation.description}
              </p>

              <div className="automation-card__footer">
                <span className="savings">{automation.savings}</span>
                <button
                  className="btn btn--sm btn--outline"
                  onClick={() => handleDeploy(automation.id)}
                  disabled={deployingId === automation.id}
                >
                  {deployingId === automation.id ? 'Deploying...' : 'Deploy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AutomationLibrary