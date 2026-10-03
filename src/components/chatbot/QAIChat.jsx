import { useEffect, useRef, useState } from 'react'
import './qai.css'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '')
// Put your photo at public/images/qai/qai-avatar.jpg and set this to '/images/qai/qai-avatar.jpg'.
const AVATAR_SOURCE = ''
const welcome = "مرحباً! أنا QAI، المساعد الذكي الخاص بقصي 👋\nبقدر أساعدك تتعرف على مشاريعه، مهاراته، خبراته، إنجازاته وخدماته. شو حاب تعرف عنه؟";const questions = [
  ['Projects', "Tell me about Qosay's projects."],
  ['Skills', 'What technologies and skills does Qosay have?'],
  ['Experience', "Tell me about Qosay's experience."],
  ['Achievements', "Tell me about Qosay's achievements and activities."],
]

function Avatar() {
  const [failed, setFailed] = useState(false)
  return <span className="qai-avatar" aria-hidden="true">{AVATAR_SOURCE && !failed
    ? <img src={AVATAR_SOURCE} alt="" onError={() => setFailed(true)} />
    : <span>QAI</span>}</span>
}

export default function QAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: welcome }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const launcher = useRef(null)
  const composer = useRef(null)
  const messageList = useRef(null)
  const sending = useRef(false)
  const pending = useRef(null)
  const lastQuestion = useRef('')

  useEffect(() => {
    if (isOpen) composer.current?.focus({ preventScroll: true })
  }, [isOpen])

  useEffect(() => {
    const list = messageList.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages, isLoading, error, isOpen])

  useEffect(() => () => pending.current?.abort(), [])

  useEffect(() => {
    if (!isOpen || !window.visualViewport) return
    const viewport = window.visualViewport
    const root = launcher.current?.parentElement
    const update = () => {
      root?.style.setProperty('--qai-viewport-height', `${viewport.height}px`)
      root?.style.setProperty('--qai-keyboard-offset', `${Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px`)
    }
    update()
    viewport.addEventListener('resize', update)
    viewport.addEventListener('scroll', update)
    return () => {
      viewport.removeEventListener('resize', update)
      viewport.removeEventListener('scroll', update)
      root?.style.removeProperty('--qai-viewport-height')
      root?.style.removeProperty('--qai-keyboard-offset')
    }
  }, [isOpen])

  function close() {
    setIsOpen(false)
    // On mobile the launcher becomes visible again after React closes the panel.
    requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }))
  }

  async function send(question, retry = false) {
    const message = question.trim()
    if (!message || message.length > 2000 || sending.current) return
    sending.current = true
    lastQuestion.current = message
    setIsLoading(true)
    setError('')
    setInput('')
    if (!retry) setMessages((previous) => [...previous, { role: 'user', content: message }])
    const controller = new AbortController()
    pending.current = controller
    const timeout = setTimeout(() => controller.abort(), 40000)
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }), signal: controller.signal,
      })
      if (!response.ok) throw new Error('Request failed')
      const data = await response.json()
      if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('Invalid answer')
      setMessages((previous) => [...previous, { role: 'assistant', content: data.answer.trim() }])
    } catch {
      setError("Sorry, QAI couldn't respond right now. Please try again.")
    } finally {
      clearTimeout(timeout)
      pending.current = null
      sending.current = false
      setIsLoading(false)
    }
  }

  return (
    <aside className="qai" aria-label="QAI portfolio assistant">
      {isOpen && (
        <section id="qai-panel" className="qai-panel" role="dialog" aria-labelledby="qai-heading" aria-describedby="qai-subtitle" onKeyDown={(event) => {
          if (event.key === 'Escape') { event.stopPropagation(); close() }
        }}>
          <header className="qai-header">
            <Avatar />
            <div className="min-w-0 flex-1">
              <h2 id="qai-heading" className="font-heading text-lg font-semibold">QAI</h2>
              <p id="qai-subtitle" className="text-xs text-primary-light">Qosay&apos;s AI Assistant</p>
            </div>
            <button type="button" className="qai-icon-button" aria-label="Close QAI assistant" onClick={close}>×</button>
          </header>
          <div ref={messageList} className="qai-messages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text">
            {messages.map((message, index) => (
              <div key={index} className={`qai-message qai-message-${message.role}`}>
                <span className="sr-only">{message.role === 'user' ? 'You' : 'QAI'}: </span>
                <p dir="auto">{message.content}</p>
              </div>
            ))}
            {messages.length === 1 && <div className="qai-suggestions">{questions.map(([label, question]) => (
              <button key={label} type="button" disabled={isLoading} onClick={() => send(question)}>{label}</button>
            ))}</div>}
            {isLoading && <p role="status" className="qai-thinking">QAI is thinking…</p>}
          </div>
          {error && <div className="qai-error"><p role="alert">{error}</p><button type="button" disabled={isLoading} onClick={() => send(lastQuestion.current, true)}>Retry</button></div>}
          <form className="qai-composer" onSubmit={(event) => { event.preventDefault(); send(input) }}>
            <label htmlFor="qai-input" className="sr-only">Ask QAI about Qosay</label>
            <textarea ref={composer} id="qai-input" dir="auto" rows={2} maxLength={2000} value={input} placeholder="Ask QAI about Qosay..." aria-describedby="qai-input-hint" onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault(); send(input)
              }
            }} />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message" className="qai-send">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" /></svg>
            </button>
            <p id="qai-input-hint" className="qai-hint">Enter to send · Shift + Enter for a new line</p>
          </form>
        </section>
      )}
      <button ref={launcher} type="button" className="qai-launcher" aria-label={isOpen ? 'Close QAI assistant' : 'Open QAI assistant'} aria-expanded={isOpen} aria-controls={isOpen ? 'qai-panel' : undefined} title="Ask QAI" onClick={() => isOpen ? close() : setIsOpen(true)}><Avatar /></button>
    </aside>
  )
}
