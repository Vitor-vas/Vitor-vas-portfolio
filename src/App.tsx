import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout.tsx';

import Home from './pages/Home.tsx';
import Aboutme from './pages/Aboutme.tsx';
import Projects from './pages/Projects.tsx';
import Experiences from './pages/Experiences.tsx';
import Curriculum from './pages/Curriculum.tsx';
import Contact from './pages/Contact.tsx';
import NotFound from './pages/NotFound.tsx';

import './styles/index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route: Header, StatusBar and Footer stay mounted,
            only the <Outlet /> inside Layout changes between pages. */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Aboutme />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<Experiences />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
