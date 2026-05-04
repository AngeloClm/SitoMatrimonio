"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 py-4">
            <li><a href="#matrimonio" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">Matrimonio</a></li>
            <li><a href="#storia" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">La nostra storia</a></li>
            <li><a href="#foto" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">Foto</a></li>
            <li><a href="#rsvp" className="text-rose-700 hover:text-rose-900 font-medium transition-colors">RSVP</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-white flex items-center justify-center pt-20">        
        <div className="text-center px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-playfair text-rose-700 mb-4">20 settembre 2026</h2>
          <h2 className="text-3xl md:text-4xl font-playfair text-rose-800 mb-6 font-bold">Ci sposiamo!</h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair text-gray-800 font-bold">
            Angelo & Giovanna
          </h1>
          
          {/* Hero Wedding Photo */}
          <div className="mt-12 relative mx-auto max-w-md">
            <Image
              src="/Prima Foto Prova.jpeg"
              alt="Angelo e Giovanna"
              width={400}
              height={500}
              className="rounded-2xl shadow-2xl object-cover"
              priority
            />
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
              Da quella sera in poi, le nostre vite si sono intrecciate in un viaggio di scoperta. Insieme, abbiamo viaggiato, 
              esplorato nuovi posti e condiviso momenti indimenticabili. A ogni passo, abbiamo imparato che casa non è un luogo, 
              ma il modo in cui ci sentiamo l'uno in presenza dell'altro.
            </p>
            
            <p className="mb-6">
              Oggi siamo più di una semplice coppia. Siamo migliori amici, anime gemelle e partner impavidi in questa 
              bellissima avventura della vita. Ogni momento ci ha avvicinato e ora siamo pronti a iniziare il prossimo capitolo.
            </p>
            
            <p className="text-center text-xl font-playfair text-rose-700 font-semibold">
              Non vediamo l'ora di celebrare il nostro amore con voi quando lo renderemo ufficiale! 💕
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
          
          <div className="bg-rose-50 p-8 rounded-xl">
            <p className="text-lg text-gray-700 mb-8 text-center">
              Non vediamo l'ora di vedervi! Se porterai un ospite o hai specifiche restrizioni dietetiche, 
              assicurati che sia indicato di seguito. Si prega di rispondere entro il <strong>20 Giugno 2026</strong>
            </p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nome *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Cognome *</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500" required />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">Parteciperete? *</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="ceremony" className="mr-3" />
                    <span>Solo cerimonia</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="reception" className="mr-3" />
                    <span>Solo ricevimento</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="both" className="mr-3" />
                    <span>Sì, cerimonia e ricevimento</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="no" className="mr-3" />
                    <span>No</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="attendance" value="maybe" className="mr-3" />
                    <span>Non sono ancora sicuro</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="flex items-center mb-3">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-gray-700">Avete delle restrizioni alimentari? (vegetariano, allergie, ecc.)</span>
                </label>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Porterete un ospite?</label>
                <div className="flex items-center space-x-4">
                  <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded">-</button>
                  <span className="text-xl font-semibold">0</span>
                  <button type="button" className="bg-rose-600 text-white px-4 py-2 rounded">+</button>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Commenti o domande</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500" rows={4}></textarea>
              </div>
              
              <button type="submit" className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors font-semibold">
                Invia RSVP
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Foto Section */}
      <section id="foto" className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-playfair text-center text-rose-800 mb-16 font-bold">Foto</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Upload Photos */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-playfair text-rose-700 mb-6 font-semibold text-center">Condividi le tue foto!</h3>
              <p className="text-gray-700 mb-6 text-center">
                Rendiamo felice la nostra coppia insieme! Carica le foto durante il giorno del matrimonio o successivamente.
              </p>
              
              <div className="border-2 border-dashed border-rose-300 p-8 text-center rounded-lg mb-4">
                <p className="text-gray-600 mb-4">Trascina qui le tue foto o clicca per selezionare</p>
                <button className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors">
                  Carica Foto
                </button>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Limite: 30 foto. Dimensione massima: 20MB per foto.
              </p>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-2">Usa l'hashtag sui social:</p>
                <span className="bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-semibold">#AngeloEGiovanna2026</span>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-playfair text-rose-700 mb-6 font-semibold">Condividi con il QR Code!</h3>
              <p className="text-gray-700 mb-8">
                Utilizza questo codice QR per consentire agli ospiti di condividere con voi i momenti del matrimonio! 
                Tutto ciò che devono fare è puntare la fotocamera del telefono sul codice QR.
              </p>
              
              <div className="bg-gray-100 p-8 rounded-lg">
                <div className="w-48 h-48 bg-white mx-auto border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-sm text-gray-600">QR Code per<br/>upload foto</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Il QR Code sarà disponibile prima del matrimonio
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
