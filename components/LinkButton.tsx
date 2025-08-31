import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, icon, text }) => {
  const content = (
    <div className="w-full bg-black/30 border border-amber-500/40 backdrop-blur-sm rounded-xl shadow-md hover:shadow-amber-400/20 hover:scale-[1.03] hover:bg-black/50 hover:border-amber-500/60 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="flex items-center p-3 md:p-4">
        <div className="w-8 text-amber-400">{icon}</div>
        <span className="flex-grow text-center text-sm md:text-base font-semibold text-gray-50 pr-8">{text}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="w-full">
      {content}
    </button>
  );
};

export default LinkButton;