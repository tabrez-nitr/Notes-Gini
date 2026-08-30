import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: 'ri-quill-pen-line',
    title: 'Distraction-Free Canvas',
    description: 'A focused, clutter-free rich text editor built on TipTap. Write without friction and keep your ideas front and center.',
    tag: 'Editor',
  },
  {
    icon: 'ri-sparkling-fill',
    title: 'Gemini AI Polishing',
    description: 'Enhance your writing with one click. Gemini AI refines messy drafts into concise, articulate notes instantly.',
    tag: 'Intelligence',
  },
  {
    icon: 'ri-file-list-3-line',
    title: 'Instant Summarization',
    description: 'Extract key takeaways from long meetings, research, and stream-of-consciousness notes in seconds.',
    tag: 'Synthesis',
  },
  {
    icon: 'ri-cloud-line',
    title: 'Realtime Cloud Sync',
    description: 'Secured with Firebase authentication and Firestore. Your private notes stay synced across all your devices.',
    tag: 'Sync',
  },
  {
    icon: 'ri-search-2-line',
    title: 'Instant Search & Filter',
    description: 'Find any thought in milliseconds with responsive real-time keyword search across titles and body text.',
    tag: 'Organization',
  },
  {
    icon: 'ri-contrast-2-line',
    title: 'Pure Black & White',
    description: 'Obsidian void for late-night inspiration, pure white for daytime clarity. Zero chromatic noise.',
    tag: 'Design',
  },
]

function HomePage() {
  const { user, signIn } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="landing-shell">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill Badge */}
            <div className="hero-gradient-badge">
              <i className="ri-sparkling-fill text-xs" />
              <span>Powered by Gemini 3.1 Flash</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Make room for <br />
              <span>clearer thinking.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mx-auto">
              Notes Gini is a minimalist note-taking canvas. Zero clutter, pure focus, and Google Gemini AI right where you need it.
            </p>

            {/* Hero CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {user ? (
                <Link to="/note" className="btn-primary">
                  <span>Open Your Workspace</span>
                  <i className="ri-arrow-right-line" />
                </Link>
              ) : (
                <button type="button" className="btn-primary" onClick={signIn}>
                  <span>Start Writing Free</span>
                  <i className="ri-arrow-right-line" />
                </button>
              )}
              <a href="#features" className="btn-secondary">
                <span>See Features</span>
                <i className="ri-arrow-down-s-line" />
              </a>
            </div>

            <p className="mt-4 text-xs text-[var(--text-muted)] flex items-center justify-center gap-1.5">
              <i className="ri-shield-check-line" />
              Private & encrypted · Instant Google Sign-In
            </p>
          </div>

          {/* Interactive Hero Mockup */}
          <div className="mt-14 max-w-3xl mx-auto">
            <div className="editor-card p-6 md:p-8 relative">
              <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-[var(--border-main)] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full border border-[var(--border-main)] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full border border-[var(--border-main)] inline-block" />
                  <span className="ml-2 text-xs font-mono text-[var(--text-muted)]">notes.gini/minimal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 border border-[var(--border-main)] rounded font-medium text-[var(--text-secondary)]">
                    <i className="ri-sparkling-fill text-[10px]" /> Gemini Ready
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                  Architecture Principles for 2026
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                  Simplicity is the ultimate sophistication. When designing tools for thought, remove every visual distraction. Let typography breathe, interactions feel instantaneous, and augment human intuition with AI on demand.
                </p>
              </div>

              {/* Gemini AI preview callout */}
              <div className="summary-drawer mt-5 flex items-start gap-3">
                <div className="w-5 h-5 rounded border border-[var(--border-main)] bg-[var(--text-primary)] text-[var(--bg-canvas)] flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                  <i className="ri-sparkling-fill text-[10px]" />
                </div>
                <div className="flex-1 text-xs leading-relaxed">
                  <span className="font-bold text-[var(--text-primary)] block mb-0.5">AI Summary</span>
                  Focus on extreme simplicity and distraction-free design. Leverage Gemini AI seamlessly to augment thinking without adding friction.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 border-t border-[var(--border-main)] bg-[var(--bg-canvas)]">
        <div className="landing-shell">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Everything you need. Nothing you don’t.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)]">
              Crafted meticulously to keep you in flow state with zero cognitive overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature.title} className="minimal-grid-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded border border-[var(--border-main)] bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--text-primary)]">
                    <i className={`${feature.icon} text-base`} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalist CTA */}
      <section className="py-20 border-t border-[var(--border-main)]">
        <div className="landing-shell">
          <div className="max-w-2xl mx-auto text-center p-8 sm:p-10 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)]">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Start writing with clarity today.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              Join thinkers, writers, and builders organizing their mind with Notes Gini.
            </p>
            <div className="mt-6 flex justify-center">
              {user ? (
                <Link to="/note" className="btn-primary">
                  <span>Go to My Notes</span>
                  <i className="ri-arrow-right-line" />
                </Link>
              ) : (
                <button type="button" className="btn-primary" onClick={signIn}>
                  <span>Get Started Free</span>
                  <i className="ri-arrow-right-line" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border-main)] text-center text-xs text-[var(--text-muted)]">
        <div className="landing-shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[var(--text-primary)]">
            <span className="brand-symbol !w-5 !h-5 !text-[10px]">
              <i className="ri-quill-pen-line" />
            </span>
            <span>Notes Gini</span>
          </div>
          <div>
            © {new Date().getFullYear()} Notes Gini. Distraction-Free.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
