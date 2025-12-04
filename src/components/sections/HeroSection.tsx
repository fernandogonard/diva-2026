import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { ReservationCTA } from '../whatsapp';
import { useHeadMetadata, useReducedMotion } from '../../hooks';

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  useHeadMetadata({
    title: 'Hotel Diva - Alojamiento Premium en Mar del Plata',
    description: 'Descubre la perfecta combinación de elegancia y comodidad en Hotel Diva, Mar del Plata. Habitaciones matrimonial, twin, triple y cuádruple.',
    ogImage: '/images/hero.jpg',
    keywords: ['hotel mar del plata', 'alojamiento', 'hospedaje'],
  });

  const duration = prefersReducedMotion ? 0 : 0.8;
  const delay = prefersReducedMotion ? 0 : 0.2;
  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-label="Sección de bienvenida del Hotel Diva"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Hotel Diva Mar del Plata - Fachada y entrada principal con vistas al mar"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center" aria-label="5 estrellas - Hotel de excelencia">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={`star-${i}`}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400" 
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-lg font-medium">Hotel de Excelencia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            Hotel{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Diva
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay }}
          className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed"
        >
          Descubre la perfecta combinación de elegancia y comodidad en el corazón de Mar del Plata
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay * 2 }}
          className="flex items-center justify-center gap-2 mb-12 text-lg"
        >
          <MapPin className="w-5 h-5 text-primary-300" aria-hidden="true" />
          <span>Mar del Plata, Buenos Aires</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay * 3 }}
          className="max-w-2xl mx-auto"
        >
          <ReservationCTA 
            title="¡Bienvenido a tu hogar lejos de casa!"
            subtitle="Reservá ahora y viví una experiencia inolvidable"
            className="bg-white/10 backdrop-blur-md border border-white/20"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, delay: delay * 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;