"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { createClient } from "@supabase/supabase-js";

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
    <div className="letter-card letter-card-ornate rounded-[30px] p-8 md:p-10">
      {showSuccess && (
        <div className="mb-6 rounded-2xl border border-green-300 bg-green-50 px-5 py-4 text-green-800">
          ✅ Grazie! La tua RSVP è stata inviata via email con successo!
        </div>
      )}
      
      {showError && (
        <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 text-red-700">
          ❌ Errore nell&apos;invio. Riprova tra qualche minuto o contattaci direttamente.
        </div>
      )}
      
      <div className="mb-8 text-center">
        <div className="section-kicker mx-auto mb-4 w-fit">Risposta gradita</div>
        <p className="paper-note text-lg leading-relaxed">
        Non vediamo l&apos;ora di vedervi! Se hai specifiche restrizioni dietetiche, 
        assicurati che sia indicato di seguito. Si prega di rispondere entro il <strong>20 Giugno 2026</strong>
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block font-semibold text-[var(--ink)]">Nome *</label>
            <input 
              type="text" 
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              className="paper-input" 
              required 
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold text-[var(--ink)]">Cognome *</label>
            <input 
              type="text" 
              value={formData.cognome}
              onChange={(e) => setFormData({...formData, cognome: e.target.value})}
              className="paper-input" 
              required 
            />
          </div>
        </div>
        
        <div>
          <label className="mb-3 block font-semibold text-[var(--ink)]">Parteciperete? *</label>
          <div className="space-y-2">
            {[
              {value: 'yes', label: 'Sì'},
              {value: 'no', label: 'No'}
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 rounded-2xl border border-[rgba(181,150,92,0.18)] bg-[rgba(255,252,246,0.72)] px-4 py-3">
                <input 
                  type="radio" 
                  name="attendance" 
                  value={option.value}
                  checked={formData.partecipazione === option.value}
                  onChange={(e) => setFormData({...formData, partecipazione: e.target.value})}
                  className="ink-option" 
                  required
                />
                <span className="text-[var(--ink)]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="mb-3 flex items-center gap-3 text-[var(--ink)]">
            <input 
              type="checkbox" 
              checked={formData.restrizioni}
              onChange={(e) => setFormData({...formData, restrizioni: e.target.checked})}
              className="ink-option" 
            />
            <span>Avete delle restrizioni alimentari? (vegetariano, allergie, ecc.)</span>
          </label>
          {formData.restrizioni && (
            <input 
              type="text" 
              placeholder="Specificare le restrizioni..."
              value={formData.restrizioniDettagli}
              onChange={(e) => setFormData({...formData, restrizioniDettagli: e.target.value})}
              className="paper-input mt-2" 
            />
          )}
        </div>
        
        <div>
          <label className="mb-2 block font-semibold text-[var(--ink)]">Commenti o domande</label>
          <textarea 
            value={formData.commenti}
            onChange={(e) => setFormData({...formData, commenti: e.target.value})}
            className="paper-textarea" 
            rows={4}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="wax-button w-full rounded-full px-6 py-3 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Invio in corso...' : 'Invia RSVP'}
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  // Accesso iniziale temporaneamente disattivato.
  // Per ripristinare subito il popup di ingresso, riusa la password del vecchio controllo:
  // const SITE_ACCESS_PASSWORD = 'Politano01.';
  const [ibanCopied, setIbanCopied] = useState(false);
  const [daysUntilWedding, setDaysUntilWedding] = useState<number | null>(null);

  useEffect(() => {
    const weddingDate = new Date(2026, 8, 20);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const updateCountdown = () => {
      const today = new Date();
      const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const daysRemaining = Math.max(
        0,
        Math.ceil((weddingDate.getTime() - todayAtMidnight.getTime()) / millisecondsPerDay)
      );

      setDaysUntilWedding(daysRemaining);
    };

    updateCountdown();
    const countdownInterval = window.setInterval(updateCountdown, millisecondsPerDay);

    return () => window.clearInterval(countdownInterval);
  }, []);

  const handleCopyIban = () => {
    navigator.clipboard.writeText('IT34Z0306975374100000008510');
    setIbanCopied(true);
    setTimeout(() => setIbanCopied(false), 2500);
  };

  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'wedding-photos';

  const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

  const handleUploadClick = () => {
    if (!supabase) {
      setUploadError('Configura Supabase (.env.local) prima di caricare le foto.');
      setUploadMessage('');
      return;
    }

    setUploadError('');
    setUploadMessage('');
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    if (!supabase) {
      setUploadError('Configura Supabase (.env.local) prima di caricare le foto.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadMessage('');

    try {
      for (const file of Array.from(files)) {
        const filePath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;

        const { error } = await supabase.storage
          .from(supabaseBucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          throw new Error(`${file.name}: ${error.message}`);
        }
      }

      setUploadMessage(files.length === 1
        ? 'Foto caricata con successo! Grazie!'
        : `${files.length} foto caricate con successo! Grazie!`);
    } catch (error) {
      console.error('Errore upload foto:', error);
      setUploadError('Errore durante il caricamento. Riprova tra qualche minuto.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="stationery-page min-h-screen text-[var(--ink)]">
      {/* Navigation Menu */}
      <nav className="quill-nav fixed top-0 left-0 right-0 z-50 shadow-lg shadow-amber-900/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-3">
            <a href="#top" className="flex items-center shrink-0">
              <Image
                src="/Logo.jpeg"
                alt="Logo matrimonio"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover bg-white p-0.5 shadow-md ring-2 ring-white/80"
              />
            </a>

            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <li><a href="#matrimonio" className="text-[var(--rose-antique)] hover:text-[var(--ink)] text-lg font-semibold transition-colors">Matrimonio</a></li>
              <li><a href="#storia" className="text-[var(--rose-antique)] hover:text-[var(--ink)] text-lg font-semibold transition-colors">La nostra storia</a></li>
              <li><a href="#rsvp" className="text-[var(--rose-antique)] hover:text-[var(--ink)] text-lg font-semibold transition-colors">RSVP</a></li>
              {/* <li><a href="#regalo" className="text-[var(--rose-antique)] hover:text-[var(--ink)] text-lg font-semibold transition-colors">Regalo</a></li> */}
              <li><a href="#foto" className="text-[var(--rose-antique)] hover:text-[var(--ink)] text-lg font-semibold transition-colors">Foto</a></li>
            </ul>

            <div className="w-11 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="top" className="relative min-h-screen flex items-center justify-center px-4 pt-28">        
        <div className="text-center px-4 relative z-10">
          <div className="mb-8 flex justify-center">
            <Image
              src="/Logo.jpeg"
              alt="Logo matrimonio"
              width={160}
              height={160}
              className="h-32 w-32 rounded-full object-cover bg-white p-1.5 shadow-2xl ring-4 ring-white/80 md:h-40 md:w-40"
              priority
            />
          </div>
          <p className="script-heading text-4xl md:text-6xl mb-3">By Royal Invitation</p>
          <h2 className="ink-title text-2xl md:text-3xl font-playfair mb-4 tracking-[0.18em] uppercase">20 settembre 2026</h2>
          <h2 className="script-heading text-5xl md:text-6xl mb-3">Ci sposiamo!</h2>
          <h1 className="ink-title text-4xl md:text-6xl lg:text-7xl font-playfair font-bold">
            Angelo & Giovanna
          </h1>
          
          {/* Hero Photo Collage */}
          <div className="mt-12 relative mx-auto" style={{width: '420px', height: '500px'}}>
            {/* Foto principale - promessa in primo piano */}
            <div className="absolute bg-white p-3 shadow-2xl" style={{width: '240px', top: '36px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 10}}>
              <Image src="/Foto promessa.jpeg" alt="Foto promessa" width={220} height={270} className="object-cover w-full" style={{height: '240px'}} priority />
            </div>

            {/* Foto laterale in alto sinistra */}
            <div className="absolute bg-white p-2.5 shadow-xl" style={{width: '170px', top: '0px', left: '12px', transform: 'rotate(-8deg)', zIndex: 3}}>
              <Image src="/Sesta Foto.jpeg" alt="Angelo e Giovanna" width={150} height={180} className="object-cover w-full" style={{height: '150px'}} />
            </div>

            {/* Foto laterale in alto destra */}
            <div className="absolute bg-white p-2.5 shadow-xl" style={{width: '170px', top: '14px', right: '10px', transform: 'rotate(7deg)', zIndex: 4}}>
              <Image src="/Seconda Foto.jpeg" alt="Angelo e Giovanna" width={150} height={180} className="object-cover w-full" style={{height: '150px'}} />
            </div>

            {/* Foto inferiore sinistra */}
            <div className="absolute bg-white p-2.5 shadow-xl" style={{width: '170px', bottom: '20px', left: '18px', transform: 'rotate(6deg)', zIndex: 5}}>
              <Image src="/Prima Foto Prova.jpeg" alt="Angelo e Giovanna" width={150} height={180} className="object-cover w-full" style={{height: '150px'}} />
            </div>

            {/* Foto inferiore destra */}
            <div className="absolute bg-white p-2.5 shadow-xl" style={{width: '170px', bottom: '16px', right: '18px', transform: 'rotate(-6deg)', zIndex: 5}}>
              <Image src="/Foto Scale.jpeg" alt="Angelo e Giovanna" width={150} height={180} className="object-cover w-full" style={{height: '150px'}} />
            </div>

            {/* Foto centrale in basso */}
            <div className="absolute bg-white p-2.5 shadow-2xl" style={{width: '180px', bottom: '0px', left: '50%', transform: 'translateX(-50%) rotate(2deg)', zIndex: 8}}>
              <Image src="/WhatsApp Image 2026-05-25 at 15.21.33.jpeg" alt="Angelo e Giovanna" width={160} height={190} className="object-cover w-full" style={{height: '165px'}} />
            </div>
          </div>
        </div>
      </section>

      {/* Matrimonio Section */}
      <section id="matrimonio" className="letter-section py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="ink-title text-4xl font-playfair text-center mb-16 font-bold">Matrimonio</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Cerimonia */}
            <div className="letter-card text-center p-8 rounded-[28px]">
              <h3 className="script-heading text-4xl mb-3">Cerimonia</h3>
              <p className="text-lg text-gray-700 mb-2">20 settembre 2026</p>
              <h4 className="text-3xl font-bold text-[var(--rose-antique)] mb-4">11:00</h4>
              <p className="text-gray-700 mb-4">Chiesa di San Potito<br/>83012 Cervinara, AV</p>
              <div className="space-y-3">
                <a href="https://www.google.com/maps/search/?api=1&query=Chiesa%20di%20San%20Potito%2C%2083012%20Cervinara%20AV" target="_blank" rel="noopener noreferrer" className="block text-[var(--rose-antique)] hover:text-[var(--ink)] underline">Visualizza la mappa</a>
                <a href="#" className="block text-[var(--rose-antique)] hover:text-[var(--ink)] underline">Aggiungi al calendario</a>
              </div>
            </div>

            {/* Ricevimento */}
            <div className="letter-card text-center p-8 rounded-[28px]">
              <h3 className="script-heading text-4xl mb-3">Ricevimento</h3>
              <p className="text-lg text-gray-700 mb-2">20 settembre 2026</p>
              <h4 className="text-3xl font-bold text-[var(--rose-antique)] mb-4">14:00</h4>
              <p className="text-gray-700 mb-4">Villa Regina<br/>Via Piani<br/>83035 Grottaminarda, AV</p>
              <div className="space-y-3">
                <a href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBwgBEAAYjwIyBggAEEUYOTIHCAEQABiPAtIBCDI4NTVqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=it&sa=X&geocode=KTUoI3M7hjkTMcr7Zhr2BMhS&daddr=via+piani,+83035+Grottaminarda+V" target="_blank" className="block text-[var(--rose-antique)] hover:text-[var(--ink)] underline">Visualizza la mappa</a>
                <a href="#" className="block text-[var(--rose-antique)] hover:text-[var(--ink)] underline">Aggiungi al calendario</a>
                <a href="#rsvp" className="wax-button inline-block text-white px-6 py-3 rounded-full">RSVP</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* La nostra storia */}
      <section id="storia" className="letter-section py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <div className="section-kicker mx-auto mb-4 w-fit">Capitolo Primo</div>
            <h2 className="ink-title text-4xl font-playfair text-center mb-16 font-bold">La nostra storia</h2>
          </div>
          
          <div className="letter-card letter-card-ornate rounded-[30px] px-8 py-10 md:px-12">
            <div className="paper-divider mb-8" />
            <div className="max-w-none text-lg leading-relaxed text-[var(--ink-soft)] space-y-6 text-center md:text-left">
            <p>
              *La nostra storia è iniziata 12 anni fa, a Cervinara. Uno sguardo, una conversazione che non si è più fermata, e la strana sensazione di conoscerci già da sempre.*
            </p>
            
            <p>
              *Da allora le nostre vite si sono intrecciate: viaggi, scoperte, ricordi accumulati anno dopo anno. Abbiamo capito, strada facendo, che casa non è un posto ma la persona con cui la costruisci.*
            </p>
            
            <p>
              *A Gennaio 2026 abbiamo deciso di fare il passo successivo. Oggi siamo compagni di vita, prima ancora che una coppia.*
            </p>
            
            <p>
              *A settembre arriva il capitolo che aspettavamo: il nostro "per sempre".*
            </p>
            
            <p>
              *Grazie di cuore a chi sarà con noi in questo giorno — la vostra presenza è il regalo più bello che potessimo desiderare.*
            </p>
            </div>
            <div className="paper-divider mt-8" />
          </div>
        </div>
      </section>

      {/* Codice di abbigliamento nascosto temporaneamente.
      <section className="letter-section py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="section-kicker mx-auto mb-4 w-fit">Etichetta</div>
          <h2 className="ink-title text-4xl font-playfair mb-12 font-bold">Codice di abbigliamento</h2>
          
          <div className="letter-card letter-card-ornate rounded-[30px] p-8 shadow-lg md:p-10">
            <div className="mb-6 flex justify-center">
              <div className="wax-seal">AG</div>
            </div>
            <p className="paper-note text-lg mb-6">
              La vostra presenza è la cosa più importante per noi!
            </p>
            <p className="paper-note text-lg mb-6">
              Ma vi saremo molto grati se sosterrete lo schema dei colori del nostro matrimonio!
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="rounded-[24px] border border-[rgba(181,150,92,0.18)] bg-[rgba(255,251,244,0.7)] p-6">
                <h4 className="script-heading text-3xl mb-3">Per le donne</h4>
                <p className="paper-note">Colori sui toni del rosa, bordeaux, champagne</p>
              </div>
              <div className="rounded-[24px] border border-[rgba(181,150,92,0.18)] bg-[rgba(255,251,244,0.7)] p-6">
                <h4 className="script-heading text-3xl mb-3">Per gli uomini</h4>
                <p className="paper-note">Camicia bianca, pantaloni/giacca scuri</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Countdown */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="letter-card rounded-[30px] px-8 py-10 md:px-12">
            <div className="section-kicker mx-auto mb-4 w-fit">Save The Date</div>
            <h2 className="ink-title text-3xl font-playfair mb-4 font-bold">Mancano solo...</h2>
            <div className="script-heading text-7xl md:text-8xl leading-none mb-2">{daysUntilWedding ?? '...'}</div>
            <p className="ink-title text-xl">giorni al matrimonio!</p>
            <p className="paper-note text-lg mt-4">Salva la data: 20 settembre 2026</p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="letter-section py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="section-kicker mx-auto mb-4 w-fit">Invio risposta</div>
          <h2 className="ink-title text-4xl font-playfair text-center mb-12 font-bold">RSVP</h2>
          <RSVPForm />
        </div>
      </section>

      {/* Foto Section */}
      {/* Regalo Section - temporaneamente nascosto */}
      {/*
      <section id="regalo" className="letter-section py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="section-kicker mx-auto mb-4 w-fit">Un dono per noi</div>
          <h2 className="ink-title text-4xl font-playfair mb-4 font-bold">Lista Nozze</h2>
          <p className="paper-note text-lg mb-12 leading-relaxed">
            La vostra presenza è il regalo più bello che potete farci.<br/>
            Se desiderate contribuire al nostro futuro insieme, potete farlo tramite bonifico bancario.
          </p>

          <div className="letter-card letter-card-ornate rounded-[30px] p-8 shadow-xl">
            <div className="mb-4 flex justify-center">
              <div className="wax-seal">AG</div>
            </div>
            <h3 className="script-heading text-4xl mb-2">Coordinate Bancarie</h3>
            <p className="paper-note text-sm mb-8">Per facilitarvi il gesto, trovate qui i dati per il bonifico.</p>

            <div className="space-y-4 text-left">
              <div className="rounded-2xl border border-[rgba(181,150,92,0.18)] bg-[rgba(255,252,246,0.82)] p-4 shadow-sm">
                <p className="mb-1 text-xs uppercase tracking-widest text-[var(--gold)]">Intestatario</p>
                <p className="text-lg font-semibold text-[var(--ink)]">Angelo Clemente</p>
              </div>

              <div className="rounded-2xl border border-[rgba(181,150,92,0.18)] bg-[rgba(255,252,246,0.82)] p-4 shadow-sm">
                <p className="mb-1 text-xs uppercase tracking-widest text-[var(--gold)]">IBAN</p>
                <p className="break-all text-lg font-semibold tracking-[0.18em] text-[var(--ink)]">IT34Z0306975374100000008510</p>
              </div>

              <div className="rounded-2xl border border-[rgba(181,150,92,0.18)] bg-[rgba(255,252,246,0.82)] p-4 shadow-sm">
                <p className="mb-1 text-xs uppercase tracking-widest text-[var(--gold)]">Causale suggerita</p>
                <p className="font-medium text-[var(--ink)]">Regalo matrimonio Angelo &amp; Giovanna</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyIban}
              className="wax-button mx-auto mt-8 flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white"
            >
              {ibanCopied ? (
                <><span>✅</span> IBAN copiato!</>
              ) : (
                <><span>📋</span> Copia IBAN</>
              )}
            </button>
          </div>
        </div>
      </section>
      */}

      {/* Foto Section */}
      <section id="foto" className="letter-section py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="section-kicker mx-auto mb-4 w-fit">Galleria degli ospiti</div>
          <h2 className="ink-title text-4xl font-playfair text-center mb-16 font-bold">Foto</h2>
          
          <div className="max-w-lg mx-auto">
            {/* Upload Photos */}
            <div className="letter-card letter-card-ornate flex flex-col items-center justify-center rounded-[30px] p-8 shadow-lg">
              <div className="mb-5 flex justify-center">
                <div className="wax-seal">AG</div>
              </div>
              <h3 className="script-heading mb-6 text-center text-4xl">Condividi le tue foto!</h3>
              <p className="paper-note mb-8 text-center text-lg leading-relaxed">
                Carica le tue foto direttamente qui. Puoi caricare quante foto vuoi!
              </p>

              <button
                type="button"
                onClick={handleUploadClick}
                disabled={isUploading}
                className="wax-button flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="text-2xl">📁</span>
                {isUploading ? 'Caricamento in corso...' : 'Carica le tue foto'}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadMessage && (
                <p className="mt-4 text-center font-medium text-green-700">{uploadMessage}</p>
              )}

              {uploadError && (
                <p className="mt-4 text-center font-medium text-red-600">{uploadError}</p>
              )}

              <div className="mt-8 text-center">
                <p className="paper-note mb-2">Usa l&apos;hashtag sui social:</p>
                <span className="inline-block rounded-full border border-[rgba(181,150,92,0.22)] bg-[rgba(255,251,244,0.88)] px-4 py-2 font-semibold text-[var(--rose-antique)]">#AngeloEGiovanna2026</span>
              </div>
            </div>
            

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-stationery py-12 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="section-kicker mx-auto mb-4 w-fit text-[rgba(244,226,194,0.75)]">Con affetto</div>
          <h3 className="mb-4 text-2xl font-playfair">Angelo & Giovanna</h3>
          <p className="mb-4">20 Settembre 2026</p>
          <p className="text-[rgba(244,226,194,0.8)]">Grazie per far parte del nostro giorno speciale! 💕</p>
        </div>
      </footer>
    </div>
  );
}
