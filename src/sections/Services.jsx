import ServiceCard from '../components/services/ServiceCard'
import { services } from '../data/services'
import Reveal from '../components/animations/Reveal'

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 xl:px-8">
      <Reveal className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
        <h2 id="services-heading" className="font-heading text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">My Services</h2>
        <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">What I can help you build and learn.</p>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={index * 0.08} className="grid min-w-0">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
