import React, { useState, useEffect } from 'react';
import { CloseIcon, SendIcon } from './Icons';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [situation, setSituation] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow for exit animation
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);
  
  const isFormValid = name.trim() && age.trim() && situation.trim();

  const handleSendMessage = () => {
    if (!isFormValid) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    const message = encodeURIComponent(`Olá, meu nome é ${name}, tenho ${age} anos e gostaria de agendar um horário.\n\n*Situação:* ${situation}`);
    const whatsappUrl = `https://wa.me/5541985011382?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };
  
  const handleClose = () => {
    onClose();
    // Short delay to allow animation before clearing form
    setTimeout(() => {
        setName('');
        setAge('');
        setSituation('');
        setError('');
    }, 300);
  }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    if (error) {
      setError('');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
    >
      <div 
        className={`bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl shadow-black/40 p-6 md:p-8 w-full max-w-sm text-center transform transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} border border-amber-500/30 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
          aria-label="Fechar modal"
        >
          <CloseIcon />
        </button>
        <h2 className="text-xl md:text-2xl font-serif font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 bg-clip-text text-transparent mb-2">Agendar Horário</h2>
        <p className="text-sm text-gray-400 mb-6">Preencha os campos abaixo para agilizar seu atendimento.</p>
        
        <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              placeholder="Seu nome completo"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-800/50 text-gray-200 placeholder-gray-500 ${error && !name.trim() ? 'border-red-500/50' : 'border-gray-600'}`}
            />
            <input
              type="number"
              value={age}
              onChange={handleInputChange(setAge)}
              placeholder="Sua idade"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-800/50 text-gray-200 placeholder-gray-500 ${error && !age.trim() ? 'border-red-500/50' : 'border-gray-600'}`}
            />
             <textarea
              value={situation}
              onChange={handleInputChange(setSituation)}
              placeholder="Descreva brevemente sua situação"
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-gray-800/50 text-gray-200 placeholder-gray-500 resize-none ${error && !situation.trim() ? 'border-red-500/50' : 'border-gray-600'}`}
            />
            {error && <p className="text-red-400 text-xs text-center h-4">{error}</p>}
        </div>

        <button
          onClick={handleSendMessage}
          disabled={!isFormValid}
          className="w-full mt-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          <SendIcon />
          <span>Enviar Mensagem</span>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppModal;
