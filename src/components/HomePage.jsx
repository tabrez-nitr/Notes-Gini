import React from 'react'
import { useAuth } from '../context/AuthContext'

const features = [
  ['ri-magic-line', 'Refine your first draft', 'Turn rough thoughts into clear, considered writing while preserving your voice.'],
  ['ri-file-list-3-line', 'Find the signal', 'Ask for a concise summary when a note grows longer than your attention span.'],
  ['ri-shapes-line', 'A calm place to think', 'A private, distraction-free space for the ideas you want to keep.'],
]

function HomePage() {
  const { signIn } = useAuth()

  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="landing-shell hero-layout">
          <div className="hero-copy animate-fade-up">
            <p className="eyebrow"><span /> A quieter way to work</p>
            <h1>Make room for<br /><em>better thinking.</em></h1>
            <p className="hero-description">Notes Gini is a focused writing space with a little intelligence exactly where you need it.</p>
            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={signIn}>Start writing <i className="ri-arrow-right-up-line" /></button>
              <a href="#how-it-works" className="text-link">See how it works <i className="ri-arrow-down-line" /></a>
            </div>
            <div className="hero-proof"><i className="ri-shield-check-line" /> Private by default · Sign in with Google</div>
          </div>

          <div className="hero-preview animate-fade-up-delay-1" aria-hidden="true">
            <div className="preview-topbar"><span className="preview-mark">N</span><span>Untitled note</span><i className="ri-more-2-fill" /></div>
            <div className="preview-body">
              <p className="preview-date">JULY 13, 2026</p>
              <h2>Ideas for the<br />next small thing</h2>
              <p>Keep the surface calm. Make the important moments feel intentional, not loud.</p>
              <div className="preview-rule" />
              <div className="preview-ai"><span><i className="ri-sparkling-2-fill" /> AI assist</span><p>Ready to make this clearer whenever you are.</p></div>
            </div>
            <div className="preview-float"><i className="ri-magic-line" /> Refined with AI</div>
          </div>
        </div>
      </section>

      <section className="landing-section" id="how-it-works">
        <div className="landing-shell">
          <div className="section-heading"><p className="eyebrow"><span /> Made for momentum</p><h2>Everything has a reason<br />to be here.</h2></div>
          <div className="feature-grid">
            {features.map(([icon, title, description], index) => (
              <article className="feature-card" key={title}><span className="feature-number">0{index + 1}</span><i className={icon} /><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-cta">
        <div className="landing-shell cta-card">
          <div><p className="eyebrow"><span /> Your ideas, uninterrupted</p><h2>Start with one<br /><em>good note.</em></h2></div>
          <button type="button" className="btn-primary" onClick={signIn}>Create your workspace <i className="ri-arrow-right-up-line" /></button>
        </div>
      </section>

      <footer className="landing-footer"><div className="landing-shell"><span className="brand-wordmark"><b>N</b> notesgini</span><span>© {new Date().getFullYear()} Notes Gini</span></div></footer>
    </div>
  )
}

export default HomePage
