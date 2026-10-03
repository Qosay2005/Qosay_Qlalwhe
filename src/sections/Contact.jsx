import { useCallback, useRef, useState } from 'react'
import ContactNotification from '../components/contact/ContactNotification'
import Reveal from '../components/animations/Reveal'

const formEndpoint = 'https://formspree.io/f/mppwgvjl'
const emptyForm = { name: '', email: '', message: '' }
const fields = [
  { name: 'name', label: 'Your name', type: 'text', placeholder: 'Your name', autoComplete: 'name', minLength: 2, maxLength: 80 },
  { name: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com', autoComplete: 'email', maxLength: 254 },
  { name: 'message', label: 'Your message', placeholder: 'Tell me about your project, idea, or opportunity...', minLength: 10, maxLength: 1500 },
]

function validateField(name, value) {
  const trimmed = value.trim()
  if (name === 'name') {
    if ([...trimmed.replace(/\s/g, '')].length < 2) return 'Please enter your name using at least 2 characters.'
    if (trimmed.length > 80) return 'Please keep your name within 80 characters.'
  }
  if (name === 'email' && (trimmed.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed))) {
    return 'Please enter a valid email address.'
  }
  if (name === 'message') {
    if (trimmed.length < 10) return 'Please enter at least 10 characters.'
    if (trimmed.length > 1500) return 'Please keep your message within 1500 characters.'
  }
  return ''
}

function FormField({ field, number, value, error, onChange, onBlur }) {
  const { name, label, type, placeholder, autoComplete, minLength, maxLength } = field
  const props = {
    id: name,
    name,
    value,
    placeholder,
    autoComplete,
    minLength,
    maxLength,
    required: true,
    onChange,
    onBlur,
    'aria-invalid': Boolean(error),
    'aria-describedby': `contact-${name}-error${name === 'message' ? ' contact-message-count' : ''}`,
    className: `mt-3 block min-h-14 w-full min-w-0 rounded-2xl border bg-white/5 px-4 py-3 text-base leading-7 text-white placeholder:text-primary-light transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-primary-light/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none disabled:opacity-100 ${error ? 'border-rose-300/60 hover:border-rose-200 focus:border-rose-200' : 'border-white/15 hover:border-white/30 focus:border-primary-light'}`,
  }

  return (
    <div className="group/field min-w-0">
      <label htmlFor={props.id} className="flex items-center gap-3 font-mono text-[10px] leading-5 tracking-wider text-primary-light uppercase transition-colors duration-300 ease-out group-focus-within/field:text-white motion-reduce:transition-none sm:text-xs">
        <span aria-hidden="true" className="text-primary-light transition-colors duration-300 group-focus-within/field:text-white motion-reduce:transition-none">{number}</span>
        {label}
      </label>
      {name === 'message' ? <textarea {...props} rows={4} className={`${props.className} max-h-96 min-h-40 resize-y`} /> : <input {...props} type={type} />}
      <div className="mt-2 flex min-h-5 items-start justify-between gap-3">
        <p id={`contact-${name}-error`} aria-live="polite" className="text-xs leading-5 text-rose-200">{error}</p>
        {name === 'message' && <span id="contact-message-count" className="shrink-0 font-mono text-[10px] leading-5 text-primary-light">{value.length} / 1500</span>}
      </div>
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submissionStatus, setSubmissionStatus] = useState('idle')
  // A synchronous guard also blocks two submit events before React renders.
  const sending = useRef(false)
  const isSubmitting = submissionStatus === 'submitting'
  const closeNotification = useCallback(() => setSubmissionStatus('idle'), [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    if (touched[name]) setErrors((previous) => ({ ...previous, [name]: validateField(name, value) }))
    setSubmissionStatus('idle')
  }

  function handleBlur(event) {
    const { name, value } = event.target
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors((previous) => ({ ...previous, [name]: validateField(name, value) }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (sending.current) return

    const form = event.currentTarget
    const payload = Object.fromEntries(Object.entries(formData).map(([name, value]) => [name, value.trim()]))
    const nextErrors = Object.fromEntries(fields.map(({ name }) => [name, validateField(name, payload[name])]))
    // Preserve native email semantics alongside the lightweight format check.
    if (form.elements.email.validity.typeMismatch) nextErrors.email = 'Please enter a valid email address.'
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })
    setSubmissionStatus('idle')
    const firstInvalid = fields.find(({ name }) => nextErrors[name])
    if (firstInvalid) {
      form.elements[firstInvalid.name].focus()
      return
    }

    // Formspree's honeypot is omitted from normal messages; only bots fill it.
    const honeypot = form.elements._gotcha.value
    if (honeypot) payload._gotcha = honeypot
    sending.current = true
    setSubmissionStatus('submitting')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error('Message submission failed')
      setFormData(emptyForm)
      setErrors({})
      setTouched({})
      form.reset()
      setSubmissionStatus('success')
    } catch {
      setSubmissionStatus('error')
    } finally {
      clearTimeout(timeout)
      sending.current = false
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative isolate w-full overflow-hidden bg-primary-dark text-white">
      {(submissionStatus === 'success' || submissionStatus === 'error') && (
        <ContactNotification
          key={submissionStatus}
          type={submissionStatus}
          title={submissionStatus === 'success' ? 'Message sent successfully!' : 'Message couldn’t be sent.'}
          message={submissionStatus === 'success' ? 'Thanks for reaching out. I’ll get back to you soon.' : 'Something went wrong. Please try again.'}
          onClose={closeNotification}
        />
      )}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-primary-light/5 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 xl:px-8">
        <Reveal as="header" className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <p className="mb-4 font-mono text-xs tracking-wider text-primary-light uppercase">Let’s connect</p>
          <h2 id="contact-heading" className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">Let’s Build Something Together.</h2>
          <p className="mt-4 text-sm leading-7 text-primary-light sm:text-base">Have a project, opportunity, collaboration, or idea in mind? Send me a message and I’ll get back to you.</p>
        </Reveal>

        <Reveal delay={0.08} className="mx-auto max-w-3xl">
          <form action={formEndpoint} method="POST" noValidate onSubmit={handleSubmit} aria-label="Contact Qosay" aria-busy={isSubmitting} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-text-primary/10 transition-[border-color,box-shadow] duration-300 ease-out focus-within:border-primary-light/40 focus-within:shadow-text-primary/15 motion-reduce:transition-none sm:p-10">
            <div className="mb-8 sm:mb-10">
              <p className="flex items-center gap-2.5 font-mono text-[10px] leading-5 tracking-wider text-primary-light uppercase sm:text-xs">
                <span aria-hidden="true" className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-light opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary-light" />
                </span>
                Available for new projects
              </p>
              <h3 className="mt-3 font-heading text-xl font-medium text-white sm:text-2xl">Start a conversation.</h3>
            </div>

            <div hidden aria-hidden="true">
              <label htmlFor="contact-honeypot">Leave this field empty</label>
              <input id="contact-honeypot" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <fieldset disabled={isSubmitting} className="m-0 min-w-0 space-y-5 border-0 p-0 sm:space-y-6">
              <legend className="sr-only">Your contact details and message — all fields required</legend>
              {fields.map((field, index) => (
                <FormField key={field.name} field={field} number={`0${index + 1}`} value={formData[field.name]} error={errors[field.name]} onChange={handleChange} onBlur={handleBlur} />
              ))}
            </fieldset>

            <div className="mt-6 flex justify-end sm:mt-8">
              <button type="submit" disabled={isSubmitting} className="group/send inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-primary-action px-6 text-sm font-semibold text-white shadow-sm shadow-text-primary/10 transition-[transform,background-color,box-shadow] duration-300 ease-out enabled:hover:-translate-y-0.5 enabled:hover:bg-primary-action/90 enabled:hover:shadow-md enabled:hover:shadow-text-primary/20 focus-visible:outline-primary-light disabled:cursor-wait disabled:bg-primary-action motion-reduce:transform-none motion-reduce:transition-none sm:w-auto sm:min-w-44">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {isSubmitting ? <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" /> : <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover/send:translate-x-0.5 group-focus-visible/send:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"></span>}
              </button>
            </div>
            <div role="status" aria-live="polite" aria-atomic="true" className="text-sm leading-6 text-primary-light">
              {submissionStatus === 'submitting' && <p className="mt-4">Sending your message…</p>}
            </div>
          </form>
        </Reveal>
        {/* TODO: Add alternative contact links when verified social URLs are available. */}
      </div>
    </section>
  )
}
