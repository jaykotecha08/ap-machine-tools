import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { TabBar } from './components/TabBar'
import { ScrollToTop } from './components/ScrollToTop'
import { QuoteProvider } from './lib/quote'
import Home from './pages/Home'
import Store from './pages/Store'
import ProductDetail from './pages/ProductDetail'
import Quote from './pages/Quote'
import About from './pages/About'
import Quality from './pages/Quality'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <QuoteProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:slug" element={<ProductDetail />} />
          <Route path="/quote" element={<Quote />} />
          {/* The old catalogue path, kept so existing links keep working. */}
          <Route path="/products" element={<Navigate to="/store" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <TabBar />
    </QuoteProvider>
  )
}
