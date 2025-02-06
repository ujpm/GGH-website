import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/home'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<div>Services</div>} />
          <Route path="/about" element={<div>About Us</div>} />
          <Route path="/support" element={<div>Support Us</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
