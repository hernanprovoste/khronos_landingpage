/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Clock, Instagram, Menu, X, ChevronRight } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import { Coach } from './types';
import KCoach1 from './images/david.jpg';
import KCoach2 from './images/benja.jpg';
import KCoach3 from './images/yeni.jpg';

// Data
const COACHES: Coach[] = [
  {
    id: '1',
    name: 'DAVID NORAMBUENA',
    specialty: 'FUERZA & HIPERTROFIA & ESTETICA',
    image: KCoach1,
    instagram: 'https://www.instagram.com/davidfnorambuena'
  },
  {
    id: '2',
    name: 'BENJAMÍN WEBER',
    specialty: 'FUERZA & HIPERTROFIA & RENDIMIENTO DEPORTIVO',
    image: KCoach2,
    instagram: 'https://www.instagram.com/coachbenjaweber'
  },
  {
    id: '3',
    name: 'YENIFER QUINCHAO',
    specialty: 'FUERZA & HIPERTROFIA & SALUD',
    image: KCoach3,
    instagram: 'https://www.instagram.com/coach_yeniferale'
  },
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to hide broken images (useful for the logo if file is missing)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#F4E028] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <img
            src="Klogo.png"
            alt="Khronos Logo"
            className="h-12 w-auto object-contain"
            onError={handleImageError}
          />
          <span className="hidden md:block font-heading font-bold text-xl tracking-tighter">KHRONOS</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 text-sm font-bold tracking-widest uppercase">
          {['Inicio', 'Entrenadores', 'Ubicación'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'inicio' ? 'hero' : item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="hover:text-[#F4E028] transition-colors cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
          {/* <button
            className="bg-[#F4E028] text-black px-6 py-3 font-bold hover:bg-white transition-colors uppercase tracking-widest text-xs"
            data-hover="true"
          >
            Agenda Tu Clase
          </button> */}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-8 md:hidden">
          {['Inicio', 'Entrenadores', 'Ubicación'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'inicio' ? 'hero' : item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="text-3xl font-heading font-black text-white hover:text-[#F4E028] uppercase"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <header id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          {/* Using a high quality Unsplash gym image as base since specific hero wasn't provided, filtered to look dark/intense */}
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Gym Background"
            className="w-full h-full object-cover opacity-60 grayscale-[50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          {/* Yellow LED accents overlay */}
          <div className="absolute inset-0 bg-[#F4E028]/5 mix-blend-overlay" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center md:text-left pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <h2 className="text-[#F4E028] font-bold tracking-[0.2em] mb-4 text-sm md:text-base uppercase">
              Centro de Alto Rendimiento
            </h2>
            <h1 className="font-heading font-black text-5xl md:text-8xl leading-[0.9] mb-6">
              TU POTENCIAL.<br />
              <span className="text-[#F4E028]">NUESTRA MISIÓN.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl">
              Entrena personalizado. Supera tus límites con los mejores profesionales.
            </p>

            <button
              className="group bg-transparent border border-[#F4E028] text-[#F4E028] px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#F4E028] hover:text-black transition-all duration-300 flex items-center gap-2 mx-auto md:mx-0"
              data-hover="true"
            >
              Comienza Ahora
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[#F4E028]">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#F4E028] to-transparent" />
        </div>
      </header>

      {/* COACHES SECTION */}
      <section id="entrenadores" className="py-24 bg-[#0a0a0a] relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase text-center">
              Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E028] to-yellow-600">Entrenadores</span>
            </h2>
            <div className="w-24 h-1 bg-[#F4E028] mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COACHES.map((coach, index) => (
              <motion.a
                href={coach.instagram}
                target="_blank"
                rel="noopener noreferrer"
                key={coach.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative h-[500px] overflow-hidden bg-[#111] border-b-4 border-[#F4E028] block cursor-pointer"
              >
                <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-heading text-2xl font-bold text-[#F4E028] mb-1 italic">
                    {coach.name}
                  </h3>
                  <p className="text-white text-sm font-mono tracking-wider uppercase border-l-2 border-[#F4E028] pl-3">
                    {coach.specialty}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="ubicacion" className="py-24 bg-black relative border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
            {/* Map Column */}
            <div className="relative h-[400px] lg:h-[500px] bg-[#111] overflow-hidden group">
              {/* CSS Filtered Google Map Embed - Pointing to Valdivia */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1312.7331641539577!2d-73.24936766484782!3d-39.821029993621266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9615ee7230caded1%3A0x11bb9e0e4340eec4!2sVicente%20P%C3%A9rez%20Rosales%201077%2C%205090000%20Valdivia%2C%20Los%20R%C3%ADos!5e1!3m2!1ses!2scl!4v1764606584930!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="map-filter opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Custom Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <div className="w-4 h-4 bg-[#F4E028] rounded-full animate-ping absolute top-0 left-0" />
                  <MapPin className="w-10 h-10 text-[#F4E028] relative z-10 drop-shadow-[0_0_10px_rgba(244,224,40,0.8)]" fill="black" />
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="bg-[#0f0f0f] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <img
                  src="Klogo.png"
                  className="w-64 h-auto"
                  onError={handleImageError}
                />
              </div>

              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#F4E028] mb-8">UBICACIÓN</h2>

              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F4E028] text-black">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Dirección</h4>
                    <p className="text-gray-400">Vicente Pérez Rosales 1077<br />Valdivia, Los Ríos</p>
                  </div>
                </div>

                {/* Contact removed as requested */}

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 text-[#F4E028] border border-[#F4E028]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Horario</h4>
                    <p className="text-gray-400">Lun - Vie: 09:00 - 22:00<br />Sáb: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="Klogo.png"
              className="h-8 w-auto grayscale"
              onError={handleImageError}
            />
            <span className="font-heading font-bold text-gray-500 tracking-widest">KHRONOS</span>
          </div>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/khronos_centroentrenamiento/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#F4E028] transition-colors"><Instagram /></a>
          </div>

          <p className="text-gray-600 text-xs font-mono">
            © 2025 KHRONOS CENTRO ENTRENAMIENTO
          </p>
        </div>
      </footer>

      {/* <AIChat /> */}
    </div>
  );
};

export default App;