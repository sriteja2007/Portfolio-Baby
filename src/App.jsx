import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import Hero from './components/Hero.jsx';
import MeetPip from './components/MeetPip.jsx';
import OriginStory from './components/OriginStory.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  return (
    <div className="app">
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main className="main-content">
        <Hero />
        <MeetPip />
        <OriginStory />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;
