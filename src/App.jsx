import { useEffect, useState } from 'react'
import ContactFab from './ContactFab.jsx'
import './App.css'
import {
  yogaStudio,
  vibrantVibez,
  yogaTestimonials,
  eventTestimonials,
  yogaPackages,
  eventPackages,
  schedule,
  eventTypes,
} from './siteConfig.js'

const TABS = { yoga: 'yoga', events: 'events' }

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const [tab, setTab] = useState(TABS.yoga)
  const [panelVisible, setPanelVisible] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.theme = tab
  }, [tab])

  function handleTab(next) {
    if (next === tab) return
    setPanelVisible(false)
    window.setTimeout(() => {
      setTab(next)
      setPanelVisible(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 280)
  }

  return (
    <div className="shell">
      <div className="spot-field" aria-hidden="true">
        <span className="spot spot-a" />
        <span className="spot spot-b" />
        <span className="spot spot-c" />
        <span className="spot spot-d" />
      </div>

      <header className="top-bar glass">
        <div className="brand-row">
          <p className="eyebrow">Welcome</p>
          <h1 className="site-title">{tab === TABS.yoga ? yogaStudio.name : vibrantVibez.name}</h1>
          <p className="tagline">{tab === TABS.yoga ? yogaStudio.tagline : vibrantVibez.tagline}</p>
        </div>

        <div className="tab-switch" role="tablist" aria-label="Choose experience">
          <button
            type="button"
            role="tab"
            aria-selected={tab === TABS.yoga}
            className={`tab-btn ${tab === TABS.yoga ? 'active' : ''}`}
            onClick={() => handleTab(TABS.yoga)}
          >
            The Yoga Journey
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === TABS.events}
            className={`tab-btn ${tab === TABS.events ? 'active' : ''}`}
            onClick={() => handleTab(TABS.events)}
          >
            Vibrant Vibez
          </button>
        </div>
      </header>

      <main className={`content-panel ${panelVisible ? 'visible' : ''}`}>
        {tab === TABS.yoga ? <YogaView onNav={scrollToId} /> : <EventsView onNav={scrollToId} />}
      </main>

      <ContactFab tab={tab} />
    </div>
  )
}

function YogaView({ onNav }) {
  return (
    <>
      <nav className="section-nav glass" aria-label="Yoga sections">
        {[
          ['yoga-classes', 'Classes'],
          ['yoga-schedule', 'Schedule'],
          ['yoga-packages', 'Packages'],
          ['yoga-pricing', 'Pricing'],
          ['yoga-testimonials', 'Stories'],
          ['yoga-contact', 'Contact'],
        ].map(([id, label]) => (
          <button key={id} type="button" className="nav-chip" onClick={() => onNav(id)}>
            {label}
          </button>
        ))}
      </nav>

      <section id="yoga-classes" className="section card-surface">
        <h2>Class experience</h2>
        <p className="lead">
          Small-group sessions focused on alignment, breath, and sustainable strength. Styles include
          gentle flow, vinyasa, yin, and foundations for every body.
        </p>
        <ul className="feature-list">
          <li>Props and modifications always offered</li>
          <li>Beginner-friendly cues and progressions</li>
          <li>Calm studio atmosphere with natural light</li>
        </ul>
      </section>

      <section id="yoga-schedule" className="section card-surface">
        <h2>Schedule</h2>
        <div className="schedule-grid">
          {schedule.map((row) => (
            <div key={row.day} className="schedule-card">
              <h3>{row.day}</h3>
              <ul>
                {row.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="yoga-packages" className="section card-surface">
        <h2>Packages</h2>
        <div className="package-row">
          {yogaPackages.map((p) => (
            <article key={p.title} className="package-card">
              <h3>{p.title}</h3>
              <p className="price">{p.price}</p>
              <p className="muted">{p.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="yoga-pricing" className="section card-surface">
        <h2>Pricing notes</h2>
        <p className="lead">
          New students enjoy a welcome week. Ask about community tiers and family add-ons at the desk
          or by email.
        </p>
      </section>

      <section id="yoga-testimonials" className="section card-surface">
        <h2>Testimonials</h2>
        <div className="testimonial-grid">
          {yogaTestimonials.map((t) => (
            <blockquote key={t.author} className="quote-card">
              <p>“{t.quote}”</p>
              <footer>— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="yoga-contact" className="section card-surface contact-block">
        <h2>Visit & contact</h2>
        <address className="contact-lines">
          <p><strong>Studio address</strong><br />{yogaStudio.address}</p>
          <p>
            <strong>Phone</strong>{' '}
            <a href={`tel:${yogaStudio.phone.replace(/\s/g, '')}`}>{yogaStudio.phone}</a>
          </p>
          <p>
            <strong>Email</strong>{' '}
            <a href={`mailto:${yogaStudio.email}`}>{yogaStudio.email}</a>
          </p>
          <p className="muted">{yogaStudio.hours}</p>
        </address>
      </section>
    </>
  )
}

function EventsView({ onNav }) {
  const doubled = [...eventTestimonials, ...eventTestimonials]

  return (
    <>
      <nav className="section-nav glass" aria-label="Events sections">
        {[
          ['events-types', 'Events'],
          ['events-pricing', 'Pricing'],
          ['events-testimonials', 'Stories'],
          ['events-contact', 'Contact'],
        ].map(([id, label]) => (
          <button key={id} type="button" className="nav-chip" onClick={() => onNav(id)}>
            {label}
          </button>
        ))}
      </nav>

      <section id="events-types" className="section card-surface">
        <h2>Event types</h2>
        <p className="lead">
          From intimate gatherings to full-scale celebrations — design, vendors, and day-of flow
          handled with warmth and precision.
        </p>
        <div className="event-grid">
          {eventTypes.map((e) => (
            <article key={e.title} className="event-card">
              <h3>{e.title}</h3>
              <p className="muted">{e.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events-pricing" className="section card-surface">
        <h2>Packages & pricing</h2>
        <div className="package-row">
          {eventPackages.map((p) => (
            <article key={p.title} className="package-card">
              <h3>{p.title}</h3>
              <p className="price">{p.price}</p>
              <p className="muted">{p.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="events-testimonials" className="section card-surface marquee-section">
        <h2>Testimonials</h2>
        <div className="marquee-wrap" aria-label="Client testimonials scrolling">
          <div className="marquee-track">
            {doubled.map((t, i) => (
              <div key={`${t.author}-${i}`} className="marquee-item">
                <span className="marquee-quote">“{t.quote}”</span>
                <span className="marquee-author">— {t.author}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events-contact" className="section card-surface contact-block">
        <h2>Book Vibrant Vibez</h2>
        <address className="contact-lines">
          <p><strong>Office</strong><br />{vibrantVibez.address}</p>
          <p>
            <strong>Phone</strong>{' '}
            <a href={`tel:${vibrantVibez.phone.replace(/\s/g, '')}`}>{vibrantVibez.phone}</a>
          </p>
          <p>
            <strong>Email</strong>{' '}
            <a href={`mailto:${vibrantVibez.email}`}>{vibrantVibez.email}</a>
          </p>
        </address>
      </section>
    </>
  )
}
