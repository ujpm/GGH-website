import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/home'
import About from './pages/About'
import ComingSoon from './components/common/ComingSoon'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {/* Routes with ComingSoon */}
          <Route path="/grants" element={<ComingSoon />} />
          <Route path="/scholarships" element={<ComingSoon />} />
          <Route path="/services" element={<ComingSoon />} />
          <Route path="/support" element={<ComingSoon />} />
          <Route path="/contact" element={<ComingSoon />} />
          {/* Catch all unknown routes */}
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
