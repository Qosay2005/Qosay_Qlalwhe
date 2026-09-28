import { useEffect, useState } from 'react'

const texts = [
  'Front-End Developer',
  'Ceo Of Solver Academy',
]

export default function TypingText() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    let timeout

    if (!isDeleting && displayedText === currentText) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 1500)
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayedText(
            isDeleting
              ? currentText.slice(0, displayedText.length - 1)
              : currentText.slice(0, displayedText.length + 1),
          )
        },
        isDeleting ? 50 : 90,
      )
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, textIndex])

  return (
    <span className="inline-flex items-center text-primary-action">
      {displayedText}

      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1em] w-0.5 animate-pulse bg-primary-action"
      />
    </span>
  )
}