import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { HOTEL_INFO } from '../../constants';
import { formatPhoneDisplay } from '../../utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Hotel Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold mb-4 text-primary-400">
              Hotel Diva
            </h3>
            <p className="text-secondary-300 mb-4">
              Tu hogar lejos de casa en Mar del Plata. Comodidad, elegancia y atención personalizada.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a 
                href={`tel:${HOTEL_INFO.phone}`}
                className="flex items-center gap-3 text-secondary-300 hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{formatPhoneDisplay(HOTEL_INFO.phone)}</span>
              </a>
              
              <a 
                href={`mailto:${HOTEL_INFO.email}`}
                className="flex items-center gap-3 text-secondary-300 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{HOTEL_INFO.email}</span>
              </a>
              
              <div className="flex items-center gap-3 text-secondary-300">
                <MapPin className="w-4 h-4" />
                <span>{HOTEL_INFO.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <div className="space-y-2">
              {[
                { name: 'Habitaciones', id: 'rooms' },
                { name: 'Servicios', id: 'services' },
                { name: 'Galería', id: 'gallery' },
                { name: 'Contacto', id: 'contact' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    // ✅ SEGURIDAD: Validar ID antes de usarlo
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      console.warn(`❌ SEGURIDAD: Elemento ${link.id} no encontrado`);
                    }
                  }}
                  className="block text-secondary-300 hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                  aria-label={`Ir a ${link.name}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-secondary-700 rounded-full flex items-center justify-center text-secondary-300 hover:bg-primary-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="#"
                className="w-10 h-10 bg-secondary-700 rounded-full flex items-center justify-center text-secondary-300 hover:bg-primary-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-secondary-700 mt-12 pt-8 text-center text-secondary-400"
        >
          <p>&copy; {currentYear} Hotel Diva. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">
            Desarrollado con ❤️ para brindar la mejor experiencia
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;