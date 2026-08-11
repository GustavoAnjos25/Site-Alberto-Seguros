# 🚀 Guia de Deploy - Alberto Seguros

Você tem **4 opções** para colocar o site no ar. Escolha a que preferir:

---

## Opção 1: Vercel (Recomendada) ⭐

A Vercel hospeda o frontend de graça e permite rodar funções serverless (API) no mesmo projeto.

### Passo a passo:

1. **Crie uma conta** em [vercel.com](https://vercel.com) (pode usar GitHub)

2. **Instale a CLI** (opcional, mas recomendado):
   ```bash
   npm i -g vercel
   ```

3. **Configure as variáveis de ambiente** no Vercel Dashboard:
   - Vá em Project Settings → Environment Variables
   - Adicione:
     - `SMTP_HOST` = smtp.gmail.com
     - `SMTP_PORT` = 587
     - `SMTP_USER` = seu-email@gmail.com
     - `SMTP_PASS` = sua-senha-de-app
     - `EMAIL_TO` = contato@albertoseguros.com

4. **Deploy**:
   ```bash
   cd alberto-seguros
   vercel
   ```
   Ou faça upload do projeto no dashboard da Vercel.

5. **Pronto!** O site estará em `https://seu-projeto.vercel.app`

---

## Opção 2: Netlify

### Passo a passo:

1. **Crie uma conta** em [netlify.com](https://netlify.com)

2. **Arraste a pasta `frontend/dist`** (após build) para o dashboard do Netlify
   Ou use a CLI:
   ```bash
   cd frontend
   npm run build
   npx netlify deploy --prod --dir=dist
   ```

3. Para a API, use **Netlify Functions** (já configurado no `netlify.toml`)

4. Configure as variáveis de ambiente no dashboard: Site Settings → Environment Variables

---

## Opção 3: Railway (Backend) + Vercel (Frontend)

Melhor para separar frontend e backend.

### Backend (Railway):
1. Crie conta em [railway.app](https://railway.app)
2. New Project → Deploy from GitHub (ou upload)
3. Selecione a pasta `backend/`
4. Adicione as variáveis de ambiente no dashboard
5. Railway te dará uma URL como `https://alberto-api.up.railway.app`

### Frontend (Vercel):
1. Na pasta `frontend/`, rode `npm run build`
2. Suba o conteúdo de `dist/` na Vercel
3. No `vite.config.js`, troque o proxy pela URL do Railway:
   ```js
   // Remova o proxy e use a URL do Railway
   ```
4. Ou configure a variável `VITE_API_URL=https://alberto-api.up.railway.app`

---

## Opção 4: Sem Backend (EmailJS) 🆓

Se quiser **só o frontend** sem precisar de servidor Node.js, use o EmailJS:

1. Crie conta em [emailjs.com](https://emailjs.com)
2. Crie um serviço de e-mail (Gmail, Outlook, etc.)
3. Crie um template de e-mail
4. Pegue seu **Public Key**, **Service ID** e **Template ID**
5. No frontend, edite `src/services/emailService.js` com esses dados
6. Rode `npm run build` e suba em qualquer hospedagem estática (Vercel, Netlify, GitHub Pages)

**Vantagem:** Não precisa pagar/gerenciar servidor backend.

---

## 📋 Checklist antes de publicar

- [ ] Configurar variáveis de ambiente (SMTP/e-mail)
- [ ] Testar o formulário de cotação
- [ ] Verificar se os e-mails estão chegando
- [ ] Configurar domínio personalizado (opcional)
- [ ] Adicionar Pixel do Meta Ads (opcional)
- [ ] Adicionar Google Analytics (opcional)

---

## 💡 Dica: Domínio Personalizado

Tanto Vercel quanto Netlify permitem usar seu próprio domínio:
1. Compre o domínio em Registro.br, GoDaddy, etc.
2. No dashboard, vá em Domains → Add Custom Domain
3. Siga as instruções de DNS
4. Pronto! Seu site em `www.albertoseguros.com`
