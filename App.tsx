
import React, { useState, useEffect, useMemo } from 'react';
import { BIBLE_VERSES } from './constants';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';
import { InstagramIcon, WebsiteIcon, WhatsAppIcon } from './components/Icons';

// Background Marble Veins Component
const MarbleVein = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/20 filter blur-xl animate-subtle-float"
    style={style}
  ></div>
);

const AnimatedBackground: React.FC = () => {
    const veins = useMemo(() => Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 250 + 50; // 50px to 300px
        const position = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        };
        const animationDelay = `${Math.random() * -15}s`;
        const animationDuration = `${Math.random() * 10 + 15}s`;

        return {
            id: i,
            style: {
                width: `${size}px`,
                height: `${size}px`,
                ...position,
                animationDelay,
                animationDuration,
                opacity: Math.random() * 0.3 + 0.05, // 0.05 to 0.35
            },
        };
    }), []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-gray-950">
            {veins.map(vein => <MarbleVein key={vein.id} style={vein.style} />)}
        </div>
    );
};


const App: React.FC = () => {
  const [verseIndex, setVerseIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const LOGOS = ['/logo.png', '/logo2.png'];

  useEffect(() => {
    const verseInterval = setInterval(() => {
      setVerseIndex(prevIndex => (prevIndex + 1) % BIBLE_VERSES.length);
    }, 5000);

    const logoInterval = setInterval(() => {
      setCurrentLogoIndex(prevIndex => (prevIndex + 1) % LOGOS.length);
    }, 5000);

    return () => {
      clearInterval(verseInterval);
      clearInterval(logoInterval);
    };
  }, []);

  const handleScheduleClick = () => {
    setModalOpen(true);
  };

  const currentLogo = LOGOS[currentLogoIndex];
  const isPrimaryLogo = currentLogo === '/logo.png';
  const logoClasses = isPrimaryLogo
    ? "w-full h-full rounded-full object-cover border-4 border-amber-400 shadow-lg shadow-amber-500/10"
    : "w-full h-full rounded-full object-cover";

  return (
    <>
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden antialiased">
        <AnimatedBackground />
        
        <main className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto">
            <div className="w-full bg-gradient-to-br from-gray-900/70 via-black/60 to-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/20 p-6 md:p-8 text-center border border-amber-500/20">

                <header className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                        <img 
                            key={currentLogo}
                            src={currentLogo} 
                            alt="Logo Darany Luiz Advogado"
                            className={`${logoClasses} animate-fade-in-logo`}
                        />
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient-bg">
                        Darany Luiz Advogado
                    </h1>
                    <p className="text-sm text-amber-100/70 mt-1">OAB/PR: 130.714</p>
                </header>
                
                <div className="h-16 flex items-center justify-center mb-6">
                     <p key={verseIndex} className="text-gray-300 italic text-sm md:text-base animate-fade-in-out px-4">
                        "{BIBLE_VERSES[verseIndex]}"
                    </p>
                </div>
                
                <div className="flex flex-col space-y-4">
                    <LinkButton 
                        href="https://www.instagram.com/darany_oliveira/"
                        icon={<InstagramIcon />}
                        text="Instagram"
                    />
                    <LinkButton 
                        href="https://drdarany.vercel.app/"
                        icon={<WebsiteIcon />}
                        text="Website"
                    />
                     <LinkButton 
                        onClick={handleScheduleClick}
                        icon={<WhatsAppIcon />}
                        text="Agende seu Horário"
                    />
                </div>
            </div>
            <Footer />
        </main>
      </div>
      <WhatsAppModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default App;