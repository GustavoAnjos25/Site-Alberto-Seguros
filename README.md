# Alberto Seguros 🛡️

Site institucional com formulário dinâmico de cotação de seguros.

## 🚀 Tecnologias

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Formulário:** Campos dinâmicos por tipo de seguro
- **Pixel Tracking:** Suporte nativo para Meta Pixel / Google Ads em cada campo

## 📁 Estrutura

```
alberto-seguros/
├── backend/          # API Node.js + Express
│   ├── controllers/
│   ├── routes/
│   └── server.js
├── frontend/         # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── public/
└── package.json
```

## ⚡ Como rodar

### 1. Instalar dependências
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configurar variáveis de ambiente (backend)
```bash
cd backend
cp .env.example .env
# Edite .env com suas credenciais de e-mail
```

### 3. Rodar projeto completo
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 📧 Configuração de E-mail

O backend usa **Nodemailer** para enviar os dados do formulário por e-mail.

Edite o arquivo `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
EMAIL_TO=contato@albertoseguros.com
```

## 📊 Pixel Tracking

Cada campo do formulário possui o atributo `data-pixel`. Use o hook `usePixel` para disparar eventos:

```jsx
import { usePixel } from '../hooks/usePixel';

const { track } = usePixel();

// No evento onFocus/onChange:
track('campo_nome');
track('seguro_auto');
```

Para integrar com Meta Pixel, edite `frontend/src/hooks/usePixel.js` e adicione:
```js
window.fbq('trackCustom', eventName, params);
```

## 🏗️ Build para produção

```bash
cd frontend
npm run build
```

Os arquivos estáticos serão gerados em `frontend/dist/`.

---
Desenvolvido com 💙 para Alberto Seguros.
