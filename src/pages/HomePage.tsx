import React from 'react';
import { Header, Footer } from '../components/layout';
import { HeroSection, RoomsSection, GallerySection, GroupsSection } from '../components/sections';
import { WhatsAppButton } from '../components/whatsapp';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <RoomsSection />
        <GroupsSection />
        <GallerySection />
        {/* Aquí se añadirán más secciones */}
      </main>
      
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton variant="floating" />
    </div>
  );
};

export default HomePage;