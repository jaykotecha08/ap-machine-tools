import { ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[70vh] place-items-center bg-steel-950 text-center text-white">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="container-page relative">
        <p className="font-mono text-sm text-brand-500">404</p>
        <h1 className="mt-3 text-4xl sm:text-6xl">This page slipped the jack</h1>
        <p className="mx-auto mt-4 max-w-md text-steel-400">
          The page you were looking for is not here. The catalogue is a good place to
          start again.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/" variant="light">
            Back home
          </Button>
          <Button to="/products">
            Browse products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
