# 🚀 Guida al Deployment - MaBaconsulting

Questa guida ti accompagnerà passo-passo nella pubblicazione del sito MaBaconsulting su GitHub e Vercel.

---

## 📋 Prerequisiti

- Account GitHub (gratuito)
- Account Vercel (gratuito)
- Git installato sul tuo computer
- Terminale/PowerShell aperto nella cartella del progetto

---

## 🔧 PARTE 1: Inizializzazione Repository Git Locale

### Step 1: Verifica che Git sia installato

Apri il terminale e verifica:

```bash
git --version
```

Se Git non è installato, scaricalo da: https://git-scm.com/download/win

### Step 2: Inizializza il repository Git

Nella cartella del progetto (`C:\Users\enric\Projects\mabaconsulting1`), esegui:

```bash
git init
```

### Step 3: Aggiungi tutti i file al repository

```bash
git add .
```

### Step 4: Crea il primo commit

```bash
git commit -m "Initial commit: MaBaconsulting website ready for deployment"
```

---

## 🌐 PARTE 2: Creazione Repository su GitHub

### Step 1: Crea un nuovo repository su GitHub

1. Vai su [GitHub.com](https://github.com) e accedi al tuo account
2. Clicca sul pulsante **"+"** in alto a destra → **"New repository"**
3. Compila i campi:
   - **Repository name:** `mabaconsulting` (o un nome a tua scelta)
   - **Description:** "Sito istituzionale MaBaconsulting - Consulenza Aerospazio e Difesa"
   - **Visibility:** Scegli **Public** (gratuito) o **Private**
   - **NON spuntare** "Initialize this repository with a README" (abbiamo già i file)
4. Clicca **"Create repository"**

### Step 2: Collega il repository locale a GitHub

GitHub ti mostrerà una pagina con le istruzioni. Usa i comandi per un repository esistente:

**Sostituisci `YOUR_USERNAME` con il tuo username GitHub:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/mabaconsulting.git
```

### Step 3: Rinomina il branch principale (se necessario)

```bash
git branch -M main
```

### Step 4: Carica il codice su GitHub

```bash
git push -u origin main
```

Ti verrà chiesto di inserire le credenziali GitHub. Se usi autenticazione a due fattori, potresti dover creare un **Personal Access Token** invece della password.

**Per creare un Personal Access Token:**
1. Vai su GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clicca "Generate new token (classic)"
3. Seleziona le scadenze e i permessi (almeno `repo`)
4. Copia il token e usalo come password quando Git te lo chiede

---

## ⚡ PARTE 3: Deployment su Vercel

### Step 1: Accedi a Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca **"Sign Up"** o **"Log In"**
3. Scegli **"Continue with GitHub"** per collegare il tuo account GitHub

### Step 2: Importa il progetto

1. Dopo il login, clicca su **"Add New..."** → **"Project"**
2. Vercel mostrerà tutti i tuoi repository GitHub
3. Trova e clicca su **"Import"** accanto al repository `mabaconsulting`

### Step 3: Configura il progetto

Vercel rileverà automaticamente che è un progetto Next.js. Verifica le impostazioni:

- **Framework Preset:** Next.js (dovrebbe essere già selezionato)
- **Root Directory:** `./` (lasciare così)
- **Build Command:** `npm run build` (dovrebbe essere già impostato)
- **Output Directory:** `.next` (dovrebbe essere già impostato)
- **Install Command:** `npm install` (dovrebbe essere già impostato)

### Step 4: Deploy!

1. Clicca sul pulsante **"Deploy"**
2. Vercel inizierà a costruire e deployare il tuo sito
3. Attendi 1-2 minuti per il completamento

### Step 5: Ottieni il tuo URL

Al termine del deploy, Vercel ti fornirà:
- **URL di produzione:** `https://mabaconsulting-xxxxx.vercel.app` (o un dominio personalizzato se configurato)
- Il sito è **live e accessibile pubblicamente**!

---

## 🔄 PARTE 4: Continuous Deployment (Automatico)

**Ottima notizia:** Vercel è già configurato per il Continuous Deployment!

### Come funziona:

Ogni volta che fai un **push** su GitHub (sul branch `main`), Vercel:
1. Rileva automaticamente le modifiche
2. Esegue un nuovo build
3. Deploya la nuova versione
4. Il sito si aggiorna automaticamente in pochi minuti

### Workflow tipico:

```bash
# 1. Fai le modifiche ai file
# 2. Aggiungi i file modificati
git add .

# 3. Crea un commit
git commit -m "Descrizione delle modifiche"

# 4. Carica su GitHub
git push origin main

# 5. Vercel deployerà automaticamente! 🎉
```

---

## 🌍 PARTE 5: Configurazione Dominio Personalizzato (Opzionale)

Se vuoi usare un dominio personalizzato (es. `mabaconsulting.com`):

1. Vai su Vercel → Il tuo progetto → **Settings** → **Domains**
2. Inserisci il tuo dominio
3. Segui le istruzioni per configurare i DNS del tuo dominio provider

---

## 📊 Monitoraggio e Analytics

Vercel fornisce automaticamente:
- **Analytics:** Statistiche visite (con piano Pro)
- **Logs:** Log del build e runtime
- **Performance:** Metriche di performance del sito

Accedi a queste funzionalità dal dashboard Vercel del tuo progetto.

---

## ✅ Checklist Finale

- [x] Repository Git inizializzato localmente
- [ ] Primo commit creato
- [ ] Repository GitHub creato
- [ ] Codice caricato su GitHub
- [ ] Progetto importato su Vercel
- [ ] Deploy completato con successo
- [ ] Sito accessibile pubblicamente
- [ ] Testato il Continuous Deployment con un push

---

## 🆘 Risoluzione Problemi

### Errore durante `git push`:
- Verifica le credenziali GitHub
- Usa un Personal Access Token se hai 2FA attivo

### Build fallisce su Vercel:
- Controlla i log di build su Vercel
- Verifica che tutte le dipendenze siano in `package.json`
- Assicurati che `npm run build` funzioni localmente

### Il sito non si aggiorna dopo un push:
- Verifica che il push sia andato a buon fine su GitHub
- Controlla il dashboard Vercel per vedere lo stato del deploy
- Attendi qualche minuto (a volte ci sono ritardi)

---

**🎉 Congratulazioni! Il tuo sito MaBaconsulting è ora live!**

Per supporto aggiuntivo:
- [Documentazione Vercel](https://vercel.com/docs)
- [Documentazione Next.js](https://nextjs.org/docs)

