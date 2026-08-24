import { ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-dawn text-center">
      <div className="absolute inset-0 bg-blueprint opacity-70" aria-hidden="true" />
      <div className="container-page relative w-full">
        <p className="font-mono text-sm text-brand-600">404</p>
        <h1 className="mt-3 text-4xl text-steel-900 sm:text-6xl">This page slipped the jack</h1>
        <p className="mx-auto mt-4 max-w-md text-steel-600">
          The page you were looking for is not here. The catalogue is a good place to
          start again.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/" variant="outline">
            Back home
          </Button>
          <Button to="/store">
            Browse the store <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
