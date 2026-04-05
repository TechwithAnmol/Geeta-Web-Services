import { useEffect, useId, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yogaStudio, vibrantVibez } from './siteConfig.js'

export default function ContactFab({ tab }) {
  const isYoga = tab === 'yoga'
  const cfg = useMemo(
    () =>
      isYoga
        ? {
            email: yogaStudio.email,
            title: 'Contact The Yoga Journey',
            subject: 'The Yoga Journey — inquiry',
            desc: `Questions about classes or the studio? We will reply at ${yogaStudio.email}.`,
          }
        : {
            email: vibrantVibez.email,
            title: 'Contact Vibrant Vibez',
            subject: 'Vibrant Vibez — inquiry',
            desc: `Tell us about your event. We will reply at ${vibrantVibez.email}.`,
          },
    [isYoga],
  )

  const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(cfg.email)}`
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const descId = useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    reset()
  }, [isYoga, reset])

  async function onSubmit(data) {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone || '—',
      message: data.message,
      _subject: `${cfg.subject} — ${data.name}`,
      _replyto: data.email,
      _template: 'table',
    }

    try {
      const res = await fetch(formSubmitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.message || 'Send failed')
      reset()
      setOpen(false)
      window.alert('Thanks — your message was sent. We will get back to you soon.')
    } catch {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\n\n${data.message}`
      const mailto = `mailto:${cfg.email}?subject=${encodeURIComponent(cfg.subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailto
      reset()
      setOpen(false)
    }
  }

  return (
    <>
      <button type="button" className="contact-fab" onClick={() => setOpen(true)} aria-haspopup="dialog">
        Contact me
      </button>

      {open ? (
        <div
          className="contact-modal-root"
          role="presentation"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="contact-modal glass"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
          >
            <div className="contact-modal-head">
              <h2 id={titleId}>{cfg.title}</h2>
              <p id={descId} className="muted">
                {cfg.desc}
              </p>
              <button
                type="button"
                className="contact-modal-close"
                onClick={() => setOpen(false)}
                aria-label="Close contact form"
              >
                ×
              </button>
            </div>

            <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <label className="contact-field">
                <span>Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  autoFocus
                  aria-invalid={errors.name ? 'true' : 'false'}
                  {...register('name', { required: 'Please enter your name' })}
                />
                {errors.name ? <span className="field-error">{errors.name.message}</span> : null}
              </label>

              <label className="contact-field">
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
                {errors.email ? <span className="field-error">{errors.email.message}</span> : null}
              </label>

              <label className="contact-field">
                <span>
                  Phone <span className="optional">(optional)</span>
                </span>
                <input type="tel" autoComplete="tel" {...register('phone')} />
              </label>

              <label className="contact-field">
                <span>Message</span>
                <textarea
                  rows={4}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  {...register('message', { required: 'Please write a short message' })}
                />
                {errors.message ? <span className="field-error">{errors.message.message}</span> : null}
              </label>

              <button type="submit" className="contact-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
