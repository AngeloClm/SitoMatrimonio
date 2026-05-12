"use client";

import Image from "next/image";
import { useState } from "react";
import emailjs from '@emailjs/browser';

// Componente per il form RSVP
function RSVPForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    partecipazione: '',
    restrizioni: false,
    restrizioniDettagli: '',
    commenti: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⚠️ CONFIGURAZIONE EMAILJS - CONFIGURATO! ⚠️
  const EMAIL_SERVICE_ID = 'service_68g1vam';
  const EMAIL_TEMPLATE_ID = 'template_mzw4dmc';  
  const EMAIL_PUBLIC_KEY = '_XhxSBeYC7vN8qz5_';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    
    try {
      // Prepara i dati per l'email
      const templateParams = {
        to_email: 'angeloclemente12@libero.it',
        nome: formData.nome,
        cognome: formData.cognome,
        partecipazione: formData.partecipazione,
        restrizioni: formData.restrizioni ? 'Sì' : 'No',
        restrizioni_dettagli: formData.restrizioniDettagli || 'Nessuna',
        commenti: formData.commenti || 'Nessun commento',
        data_invio: new Date().toLocaleString('it-IT')
      };
      
      // Invia email tramite EmailJS
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID, 
        templateParams,
        EMAIL_PUBLIC_KEY
      );
      
      // Mostra messaggio di successo
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        nome: '',
        cognome: '',
        partecipazione: '',
        restrizioni: false,
        restrizioniDettagli: '',
        commenti: ''
      });
      
      // Nascondi messaggio dopo 5 secondi
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Errore invio RSVP:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-rose-50 p-8 rounded-xl">
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✅ Grazie! La tua RSVP è stata inviata via email con successo!
        </div>
      )}
      
      {showError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ❌ Errore nell'invio. Riprova tra qualche minuto o contattaci direttamente.
        </div>
      )}
      
      <p className="text-lg text-gray-700 mb-8 text-center">
        Non vediamo l'ora di vedervi! Se hai specifiche restrizioni dietetiche, 
        assicurati che sia indicato di seguito. Si prega di rispondere entro il <strong>20 Giugno 2026</strong>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nome *</label>
            <input 
              type="text" 
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-black" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Cognome *</label>
            <input 
              type="text" 
              value={formData.cognome}
              onChange={(e) => setFormData({...formData, cognome: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-black" 
              required 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-3">Parteciperete? *</label>
          <div className="space-y-2">
            {[
              {value: 'yes', label: 'Sì'},
              {value: 'no', label: 'No'}
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input 
                  type="radio" 
                  name="attendance" 
                  value={option.value}
                  checked={formData.partecipazione === option.value}
                  onChange={(e) => setFormData({...formData, partecipazione: e.target.value})}
                  className="mr-3" 
                  required
                />
                <span className="text-black">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="flex items-center mb-3">
            <input 
              type="checkbox" 
              checked={formData.restrizioni}
              onChange={(e) => setFormData({...formData, restrizioni: e.target.checked})}
              className="mr-3" 
            />
            <span className="text-black">Avete delle restrizioni alimentari? (vegetariano, allergie, ecc.)</span>
          </label>
          {formData.restrizioni && (
            <input 
              type="text" 
              placeholder="Specificare le restrizioni..."
              value={formData.restrizioniDettagli}
              onChange={(e) => setFormData({...formData, restrizioniDettagli: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 mt-2 text-black" 
            />
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Commenti o domande</label>
          <textarea 
            value={formData.commenti}
            onChange={(e) => setFormData({...formData, commenti: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-black" 
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia RSVP'}
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 py-4">
            <li><a href="#matrimonio" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">Matrimonio</a></li>
            <li><a href="#storia" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">La nostra storia</a></li>
            <li><a href="#rsvp" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">RSVP</a></li>
            <li><a href="#foto" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">Foto</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-white flex items-center justify-center pt-20">        
        <div className="text-center px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-playfair text-rose-700 mb-4">19 settembre 2026</h2>
          <h2 className="text-3xl md:text-4xl font-playfair text-rose-800 mb-6 font-bold">Ci sposiamo!</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair text-gray-800 font-bold">
            Angelo & Giovanna
          </h1>
          
          {/* Hero Photo Collage */}
          <div className="mt-12 relative mx-auto" style={{width: '420px', height: '500px'}}>
            {/* Foto 1 - centro, leggermente ruotata a sinistra */}
            <div className="absolute bg-white p-3 shadow-2xl" style={{width: '220px', top: '30px', left: '50%', transform: 'translateX(-50%) rotate(-3deg)', zIndex: 5}}>
              <Image src="/Prima Foto Prova.jpeg" alt="Angelo e Giovanna" width={200} height={250} className="object-cover w-full" style={{height: '200px'}} priority />
            </div>
            {/* Foto 2 - sinistra in alto */}
            <div className="absolute bg-white p-3 shadow-xl" style={{width: '190px', top: '0px', left: '0px', transform: 'rotate(-6deg)', zIndex: 3}}>
              <Image src="/Seconda Foto.jpeg" alt="Angelo e Giovanna" width={170} height={200} className="object-cover w-full" style={{height: '170px'}} />
            </div>
            {/* Foto 3 - destra in alto */}
            <div className="absolute bg-white p-3 shadow-xl" style={{width: '190px', top: '10px', right: '0px', transform: 'rotate(5deg)', zIndex: 3}}>
              <Image src="/Terza Foto.jpeg" alt="Angelo e Giovanna" width={170} height={200} className="object-cover w-full" style={{height: '170px'}} />
            </div>
            {/* Foto 4 - sinistra in basso */}
            <div className="absolute bg-white p-3 shadow-xl" style={{width: '190px', bottom: '20px', left: '10px', transform: 'rotate(4deg)', zIndex: 4}}>
              <Image src="/Quarta Foto.jpeg" alt="Angelo e Giovanna" width={170} height={200} className="object-cover w-full" style={{height: '170px'}} />
            </div>
            {/* Foto 5 - destra in basso */}
            <div className="absolute bg-white p-3 shadow-xl" style={{width: '190px', bottom: '10px', right: '10px', transform: 'rotate(-5deg)', zIndex: 4}}>
              <Image src="/QuintaFoto.jpeg" alt="Angelo e Giovanna" width={170} height={200} className="object-cover w-full" style={{height: '170px'}} />
            </div>
            {/* Foto 6 - centro basso */}
            <div className="absolute bg-white p-3 shadow-2xl" style={{width: '200px', bottom: '0px', left: '50%', transform: 'translateX(-50%) rotate(2deg)', zIndex: 6}}>
              <Image src="/Sesta Foto.jpeg" alt="Angelo e Giovanna" width={180} height={220} className="object-cover w-full" style={{height: '185px'}} />
            </div>
            {/* Foto 7 - centro alto sovrapposta */}
            <div className="absolute bg-white p-3 shadow-2xl" style={{width: '180px', top: '120px', left: '50%', transform: 'translateX(-50%) rotate(-1deg)', zIndex: 7}}>
              <Image src="/Settima Foto.jpeg" alt="Angelo e Giovanna" width={160} height={190} className="object-cover w-full" style={{height: '160px'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Matrimonio Section */}
      <section id="matrimonio" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-playfair text-center text-rose-800 mb-16 font-bold">Matrimonio</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Cerimonia */}
            <div className="text-center bg-rose-50 p-8 rounded-xl">
              <h3 className="text-2xl font-playfair text-rose-700 mb-4 font-semibold">Cerimonia</h3>
              <p className="text-lg text-gray-700 mb-2">20 settembre 2026</p>
              <h4 className="text-3xl font-bold text-rose-600 mb-4">11:00</h4>
              <p className="text-gray-700 mb-4">Chiesa di S. Adiutore<br/>Via Partenio<br/>Cervinara, AV</p>
              <div className="space-y-3">
                <a href="https://maps.google.com/maps?vet=10CAAQoqAOahcKEwiw3KzM8pWUAxUAAAAAHQAAAAAQCQ..i&pvq=Cg0vZy8xMWdkbTY0aG1nIgwKBmNoaWVzYRACGAM&lqi=Ch1jaGllc2EgY2VydmluYXJhIHZpYSBwYXJ0ZW5pb0ju_Iizsq6AgAhaKxAAGAAYASIdY2hpZXNhIGNlcnZpbmFyYSB2aWEgcGFydGVuaW8qBAgDEACSAQ9jYXRob2xpY19jaHVyY2g&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=it&sa=X&ftid=0x133a4b014cff9d27:0xd2b66908bf1fe72f" target="_blank" className="block text-rose-600 hover:text-rose-800 underline">Visualizza la mappa</a>
                <a href="#" className="block text-rose-600 hover:text-rose-800 underline">Aggiungi al calendario</a>
              </div>
            </div>

            {/* Ricevimento */}
            <div className="text-center bg-pink-50 p-8 rounded-xl">
              <h3 className="text-2xl font-playfair text-pink-700 mb-4 font-semibold">Ricevimento</h3>
              <p className="text-lg text-gray-700 mb-2">20 settembre 2026</p>
              <h4 className="text-3xl font-bold text-pink-600 mb-4">14:00</h4>
              <p className="text-gray-700 mb-4">Villa Regina<br/>Via Piani<br/>83035 Grottaminarda, AV</p>
              <div className="space-y-3">
                <a href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBwgBEAAYjwIyBggAEEUYOTIHCAEQABiPAtIBCDI4NTVqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=it&sa=X&geocode=KTUoI3M7hjkTMcr7Zhr2BMhS&daddr=via+piani,+83035+Grottaminarda+V" target="_blank" className="block text-pink-600 hover:text-pink-800 underline">Visualizza la mappa</a>
                <a href="#" className="block text-pink-600 hover:text-pink-800 underline">Aggiungi al calendario</a>
                <a href="#rsvp" className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">RSVP</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La nostra storia */}
      <section id="storia" className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-playfair text-center text-rose-800 mb-16 font-bold">La nostra storia</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="mb-6">
              La nostra storia è iniziata 12 anni fa, a Cervinara, in un momento semplice che si è trasformato in qualcosa di straordinario. I nostri sguardi si sono incontrati e, quasi senza accorgercene, tutto il resto ha iniziato a svanire. Quella scintilla è diventata una conversazione senza fine, fatta di risate, emozioni e della sorprendente sensazione di esserci sempre conosciuti.
            </p>
            
            <p className="mb-6">
             Da quel giorno, le nostre vite hanno iniziato a intrecciarsi in un viaggio lungo dodici anni. Abbiamo condiviso sogni, scoperto il mondo insieme, collezionato ricordi e imparato, passo dopo passo, che casa non è un luogo, ma il modo in cui ci sentiamo quando siamo l’uno accanto all’altra.
            </p>
            
            <p className="mb-6">
              A dicembre 2025 abbiamo scelto di fare un passo in più, promettendoci un futuro ancora più grande. Oggi siamo più di una coppia: siamo migliori amici, complici, e partner in ogni avventura.
            </p>
            
            <p className="text-center text-xl font-playfair text-rose-700 font-semibold">
             E ora, con il cuore pieno di tutto ciò che siamo stati e di tutto ciò che saremo, siamo pronti a iniziare il nostro prossimo capitolo: quello che, a settembre, ci porterà a dire “per sempre”.
            </p>
          </div>
        </div>
      </section>



      {/* Codice di abbigliamento */}
      <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair text-rose-800 mb-12 font-bold">Codice di abbigliamento</h2>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-lg text-gray-700 mb-6">
              La vostra presenza è la cosa più importante per noi!
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Ma vi saremo molto grati se sosterrete lo schema dei colori del nostro matrimonio!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-xl font-semibold text-rose-700 mb-3">Per le donne</h4>
                <p className="text-gray-600">Colori sui toni del rosa, bordeaux, champagne</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-rose-700 mb-3">Per gli uomini</h4>
                <p className="text-gray-600">Camicia bianca, pantaloni/giacca scuri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4 bg-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-playfair mb-4 font-bold">Mancano solo...</h2>
          <div className="text-6xl font-bold mb-2">143</div>
          <p className="text-xl">giorni al matrimonio!</p>
          <p className="text-lg mt-4 opacity-90">Salva la data: 20 settembre 2026</p>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-playfair text-center text-rose-800 mb-12 font-bold">RSVP</h2>
          <RSVPForm />
        </div>
      </section>

      {/* Foto Section */}
      <section id="foto" className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-playfair text-center text-rose-800 mb-16 font-bold">Foto</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Upload Photos */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-2xl font-playfair text-rose-700 mb-6 font-semibold text-center">Condividi le tue foto!</h3>
              <p className="text-gray-700 mb-8 text-center">
                Carica le tue foto direttamente nella nostra cartella condivisa su Google Drive. Puoi caricare quante foto vuoi!
              </p>

              <a
                href="https://drive.google.com/drive/folders/1vaGSLehlJtpbMi49WmuZJo4kRoGgYhPo?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-rose-600 text-white px-8 py-4 rounded-xl hover:bg-rose-700 transition-colors font-semibold text-lg shadow-md"
              >
                <span className="text-2xl">📁</span>
                Carica le tue foto
              </a>

              <div className="mt-8 text-center">
                <p className="text-gray-700 mb-2">Usa l&apos;hashtag sui social:</p>
                <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold">#AngeloEGiovanna2026</span>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-playfair text-rose-700 mb-6 font-semibold">Scansiona il QR Code!</h3>
              <p className="text-gray-700 mb-8">
                Punta la fotocamera del telefono sul codice QR per accedere direttamente alla cartella e caricare le tue foto!
              </p>
              
              <div className="bg-gray-100 p-6 rounded-lg flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://drive.google.com/drive/folders/1vaGSLehlJtpbMi49WmuZJo4kRoGgYhPo%3Fusp%3Ddrive_link"
                  alt="QR Code cartella Google Drive"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                📸 Scansiona e carica le tue foto!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-800 text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-playfair mb-4">Angelo & Giovanna</h3>
          <p className="mb-4">20 Settembre 2026</p>
          <p className="text-rose-200">Grazie per essere parte del nostro giorno speciale! 💕</p>
        </div>
      </footer>
    </div>
  );
}
