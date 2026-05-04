# Matrimonio di Angelo e Giovanna 💒

Un elegante sito web per celebrare il matrimonio di Angelo e Giovanna, con galleria foto, dettagli sulla location e sistema di upload per gli ospiti.

## ✨ Caratteristiche

- **Design Elegante**: Layout moderno con palette colori romantici (rose/pink)
- **Responsive**: Perfettamente ottimizzato per mobile e desktop
- **Galleria Foto**: Sezioni dedicate per le foto pre-matrimonio e della location
- **Upload Ospiti**: Sistema QR code per permettere agli invitati di caricare foto
- **Google Drive Integration**: Salvataggio automatico delle foto su Google Drive
- **Performance**: Built with Next.js 16 e Tailwind CSS per velocità ottimale

## 🚀 Come Iniziare

### Prerequisiti
- Node.js 18+ installato
- npm, yarn, pnpm o bun

### Installazione

1. **Clona il repository o scarica i file**
2. **Installa le dipendenze:**
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```

4. **Apri il browser** e vai su [http://localhost:3000](http://localhost:3000)

### Build per Produzione

```bash
npm run build
npm start
```

## 📁 Struttura del Progetto

```
matrimonio-website/
├── src/
│   └── app/
│       ├── page.tsx          # Homepage principale
│       ├── layout.tsx        # Layout globale
│       └── globals.css       # Stili globali
├── public/                   # Immagini e asset statici
├── .next/                    # Build files (generati automaticamente)
└── package.json             # Dipendenze del progetto
```

## 🎨 Personalizzazione

### Sostituire la Foto Principale
1. Aggiungi la foto di Angelo e Giovanna nella cartella `public/`
2. Modifica `src/app/page.tsx` per utilizzare la nuova immagine:
   ```tsx
   <Image src="/your-photo.jpg" alt="Angelo e Giovanna" width={400} height={500} />
   ```

### Modificare i Colori
I colori del matrimonio sono definiti in `src/app/globals.css`:
```css
--color-rose-500: #f43f5e;  /* Colore principale */
--color-rose-600: #e11d48;  /* Colore hover */
```

### Aggiungere Nuove Sezioni
Crea nuovi componenti nella cartella `src/app/` e importali nella homepage.

## 🔧 Tecnologie Utilizzate

- **[Next.js 16](https://nextjs.org/)** - Framework React per production
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)** - Font elegante per i titoli
- **[Inter](https://fonts.google.com/specimen/Inter)** - Font moderno per il testo

## 📱 Deploy Gratuito

### Vercel (Consigliato)
1. Crea un account su [Vercel](https://vercel.com)
2. Connetti il tuo repository GitHub
3. Il sito verrà deployato automaticamente!

### Netlify
1. Crea un account su [Netlify](https://netlify.com)
2. Collega il repository o carica i file della build
3. Il sito sarà online in pochi minuti!

## 📞 Support

Per domande o personalizzazioni, contatta il team di sviluppo.

---

**Congratulazioni ad Angelo e Giovanna!** 🎉💕

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
