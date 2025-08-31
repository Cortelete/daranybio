import React from 'react';

const Footer: React.FC = () => {
  const developerWhatsAppUrl = "https://wa.me/5541988710303?text=Ol%C3%A1%2C%20vi%20o%20link%20de%20Darany%20Luiz%20Advogado%20e%20quero%20um%20site%20igual%21";
  const developerInstagramUrl = "https://www.instagram.com/inteligenciarte.ia/";

  return (
    <footer className="w-full max-w-md text-center mt-8 space-y-4">
       <a 
        href={developerWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 text-xs md:text-sm"
      >
        Quer um site incrível como esse? Fale comigo! 🚀
      </a>
      <div className="text-xs text-gray-400">
        <p>Desenvolvido por{' '}
          <a href={developerInstagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-amber-400 transition-colors">
            InteligenciArte.IA ✨
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;