// import { useState, useEffect } from 'react'
// import './styles/App.css'

// // Import components
// import Header from './components/Header/Header.jsx'
// import Hero from './components/Hero/Hero.jsx'
// import Dashboard from './components/Dashboard/Dashboard.jsx'
// import Features from './components/Features/Features.jsx'
// import AutomationLibrary from './components/AutomationLibrary/AutomationLibrary.jsx'
// import BenefitsSection from './components/Benefits/BenefitsSection.jsx'
// import SocialProof from './components/SocialProof/SocialProof.jsx'
// import Pricing from './components/Pricing/Pricing.jsx'
// import Footer from './components/Footer/Footer.jsx'

// function App() {
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 100)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   useEffect(() => {
//     console.log(`
// 🌩️ eCloudWorx React - Clean Version!

// ✅ Zero dependency conflicts
// ✅ All sections working
// ✅ Modern Vite + React 18

// Ready to manage your multi-cloud infrastructure!
//     `)
//   }, [])

//   return (
//     <div className="App">
//       <Header isScrolled={isScrolled} />
//       <main>
//         <Hero />
//         <Dashboard />
//         <Features />
//         <AutomationLibrary />

//         <BenefitsSection
//           eyebrow="Benefits"
//           heading="Why teams choose ecloudWorx"
//           subheading="A crisp value stack your stakeholders can agree on."
//         />

//         <SocialProof
//           metrics={[
//             { value: '10,000+', label: 'Resources managed' },
//             { value: '40%',    label: 'Average cost savings' },
//             { value: '500+',   label: 'Happy Customers' },
//           ]}
//         />

//         {/* Pricing directly above Footer */}
//         <Pricing />
//       </main>

//       <Footer />
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import './styles/App.css'
import './styles/animations.css' // <-- new: global reveal animations

// Components
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Features from './components/Features/Features.jsx'
import AutomationLibrary from './components/AutomationLibrary/AutomationLibrary.jsx'
import BenefitsSection from './components/Benefits/BenefitsSection.jsx'
import SocialProof from './components/SocialProof/SocialProof.jsx'
import Pricing from './components/Pricing/Pricing.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    console.log(`
🌩️ eCloudWorx React - Clean Version!

✅ Zero dependency conflicts
✅ All sections working
✅ Modern Vite + React 18

Ready to manage your multi-cloud infrastructure!
    `)
  }, [])

  return (
    <div className="App">
      <Header isScrolled={isScrolled} />
      <main>
        <Hero />
        <Dashboard />
        <Features />
        <AutomationLibrary />

        {/* Benefits */}
        <BenefitsSection
          id="benefits"
          eyebrow="Benefits"
          heading="Why teams choose ecloudWorx"
          subheading="A crisp value stack your stakeholders can agree on."
        />

        {/* Social Proof / KPI */}
        <SocialProof
          id="metrics"
          metrics={[
            { value: '10,000+', label: 'Resources managed' },
            { value: '40%',    label: 'Average cost savings' },
            { value: '500+',   label: 'Happy Customers' },
          ]}
        />

        {/* Pricing (has internal #pricing id) */}
        <Pricing />
      </main>

      <Footer />
    </div>
  )
}

export default App
