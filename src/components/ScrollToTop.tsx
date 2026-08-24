import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Route changes should start at the top, unless the URL targets an anchor. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}
