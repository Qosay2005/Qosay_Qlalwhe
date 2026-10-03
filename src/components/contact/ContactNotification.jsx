import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ContactNotification({ type, title, message, onClose }) {
  const isSuccess = type === 'success'

  useEffect(() => {
    if (!isSuccess) return
    const timeout = setTimeout(onClose, 4500)
    return () => clearTimeout(timeout)
  }, [isSuccess, onClose])

  // The portal keeps the toast above the Contact section's isolated stacking context.
  return createPortal(
    <div className={`fixed top-4 right-4 left-4 z-[100] rounded-2xl border bg-primary-dark p-4 text-white shadow-lg shadow-text-primary/20 transition-[opacity,transform] duration-350 ease-out starting:-translate-y-2 starting:opacity-0 motion-reduce:transform-none motion-reduce:transition-none sm:top-6 sm:right-6 sm:left-auto sm:w-96 sm:starting:translate-x-2 ${isSuccess ? 'border-primary-light/40' : 'border-rose-300/40'}`}>
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full text-lg ${isSuccess ? 'bg-primary/20 text-primary-light' : 'bg-rose-300/10 text-rose-200'}`}>{isSuccess ? '✓' : '!'}</span>
        <div role={isSuccess ? 'status' : 'alert'} aria-live={isSuccess ? 'polite' : 'assertive'} aria-atomic="true" className="min-w-0 flex-1 pt-1 [overflow-wrap:anywhere]">
          <p className="font-heading text-base leading-6 font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-6 text-primary-light">{message}</p>
        </div>
        <button type="button" aria-label="Close notification" onClick={onClose} className="-mt-1 -mr-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-xl text-primary-light transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-primary-light motion-reduce:transition-none">×</button>
      </div>
    </div>,
    document.body,
  )
}
