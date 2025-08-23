import { useState } from 'react'
import { cloudProviders } from '../../data/cloudProviders.js'
import './Dashboard.css'

const Dashboard = () => {
  const [activeProvider, setActiveProvider] = useState('aws')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredResources = cloudProviders[activeProvider].resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="dashboard-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section__title">Unified Multi-Cloud View</h2>
          <p className="section__subtitle">
            See all your resources from AWS, Azure, and GCP in one clean interface
          </p>
        </div>

        <div className="dashboard">
          <div className="dashboard__tabs">
            {Object.entries(cloudProviders).map(([key, provider]) => (
              <button
                key={key}
                className={`dashboard__tab ${activeProvider === key ? 'active' : ''}`}
                onClick={() => setActiveProvider(key)}
              >
                <span className="provider-icon">{provider.icon}</span>
                {provider.name}
              </button>
            ))}
          </div>

          <div className="dashboard__search">
            <input
              type="text"
              placeholder="Search resources..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="provider-panel">
            <div className="resource-grid">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-card__header">
                    <h4>{resource.type}</h4>
                    <span className={`status-badge status--${resource.status.toLowerCase()}`}>
                      {resource.status}
                    </span>
                  </div>

                  <div className="resource-card__content">
                    <p className="resource-name">{resource.name}</p>
                    <div className="resource-details">
                      <span>{resource.details}</span>
                      <span className="cost">{resource.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="no-results">
                No resources found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard