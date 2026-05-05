# 📧 Setup EmailJS per RSVP (SENZA ACCOUNT GOOGLE)

## ✅ Vantaggi di EmailJS:
- ✅ **Nessun account Google richiesto**
- ✅ **Gratuito** (200 email/mese)  
- ✅ **I dati ti arrivano direttamente via email**
- ✅ **Setup veloce (10 minuti)**
- ✅ **Affidabile e sicuro**

---

## 📋 Passo 1: Crea Account EmailJS

1. Vai su [emailjs.com](https://www.emailjs.com)
2. Clicca **"Sign Up"** e crea un account gratuito
3. Conferma la tua email

---

## 🔧 Passo 2: Configura Email Service

1. Nel dashboard EmailJS, vai su **"Email Services"**
2. Clicca **"Add New Service"**
3. Scegli il tuo provider email:
   - **Gmail** (se hai Gmail)
   - **Outlook** (se hai Hotmail/Outlook)
   - **Altri provider** disponibili
4. Segui le istruzioni per collegare la tua email
5. **Copia il SERVICE ID** (es: `service_abc123`)

---

## 📝 Passo 3: Crea Template Email

1. Vai su **"Email Templates"**
2. Clicca **"Create New Template"**  
3. Imposta:
   - **Template Name**: `RSVP Wedding`
   - **Subject**: `🎉 Nuova RSVP: {{nome}} {{cognome}}`
   - **Content** (copia questo):

```
Nuova RSVP ricevuta per il matrimonio!

👤 OSPITE:
Nome: {{nome}}
Cognome: {{cognome}}

🎪 PARTECIPAZIONE: 
{{partecipazione}}

🍽️ RESTRIZIONI ALIMENTARI:
{{restrizioni}}
Dettagli: {{restrizioni_dettagli}}

👥 OSPITI AGGIUNTIVI: {{ospiti}}

💬 COMMENTI:
{{commenti}}

⏰ Data invio: {{data_invio}}

---
💕 Sito matrimonio Angelo & Giovanna
```

4. Clicca **"Save"**
5. **Copia il TEMPLATE ID** (es: `template_xyz789`)

---

## 🔑 Passo 4: Ottieni Public Key

1. Vai su **"Account"** → **"General"**
2. **Copia la PUBLIC KEY** (es: `user_AbC123XyZ`)

---

## ⚙️ Passo 5: Configura il Sito

1. Apri il file `src/app/page.tsx`
2. Trova queste righe e sostituisci i valori:

```javascript
const EMAIL_SERVICE_ID = 'INSERISCI_TUO_SERVICE_ID';      // ← Service ID del passo 2
const EMAIL_TEMPLATE_ID = 'INSERISCI_TUO_TEMPLATE_ID';    // ← Template ID del passo 3  
const EMAIL_PUBLIC_KEY = 'INSERISCI_TUA_PUBLIC_KEY';      // ← Public Key del passo 4
```

3. Trova questa riga e metti la tua email:
```javascript
to_email: 'angeloegiovanna2026@gmail.com', // ← METTI LA TUA EMAIL QUI
```

---

## 🧪 Passo 6: Testa il Sistema

1. Salva i file e avvia il sito:
   ```bash
   npm run dev
   ```

2. Vai su `http://localhost:3000`
3. Compila un RSVP di prova
4. Controlla la tua email - dovresti ricevere la RSVP!

---

## 📊 Come Gestire le RSVP

### Opzione A: Email normale
- Le RSVP arrivano nella tua casella email
- Crei una cartella "RSVP" per organizzarle
- Puoi copincollare i dati in Excel quando vuoi

### Opzione B: Gmail + Google Sheets (automatico)
Se usi Gmail, puoi collegare automaticamente a Google Sheets:
1. Vai su [zapier.com](https://zapier.com) (gratis)
2. Crea automazione: Gmail → Google Sheets
3. Ogni email RSVP viene automaticamente aggiunta al foglio

---

## 🆘 Risoluzione Problemi

**❌ Email non arriva:**
- Controlla spam/posta indesiderata
- Verifica che Service ID, Template ID e Public Key siano corretti
- Testa con una email diversa

**❌ Errore "Service not found":**
- Assicurati che il Service sia **attivo** in EmailJS
- Ricontrolla il SERVICE_ID

**❌ Errore "Template not found":**
- Verifica che il template sia **pubblicato**
- Ricontrolla il TEMPLATE_ID

---

## 🎉 Fatto!

Ora il tuo sito RSVP invia automaticamente tutte le risposte alla tua email, **senza bisogno di account Google**!

Ogni volta che qualcuno compila il form, riceverai un'email con tutti i dettagli. 📧✨