# 🚀 Deploy na Vercel - Passo a Passo

## O que preencher em cada campo do dashboard

### 1. Build Command
```
cd frontend && npm install && npm run build
```
Ou simplesmente deixe em branco — a Vercel detecta automaticamente.

### 2. Output Directory
```
frontend/dist
```

### 3. Install Command
```
npm install
```

---

## Variáveis de Ambiente (Environment Variables)

Clique em **"+ Add More"** e adicione UMA POR UMA:

| Key | Value | Exemplo |
|-----|-------|---------|
| `SMTP_HOST` | Servidor SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Porta SMTP | `587` |
| `SMTP_USER` | Seu e-mail | `seuemail@gmail.com` |
| `SMTP_PASS` | Senha de App do Gmail | `abcd efgh ijkl mnop` |
| `EMAIL_TO` | E-mail que recebe as cotações | `contato@albertoseguros.com` |

> ⚠️ **IMPORTANTE sobre o SMTP_PASS:**
> NÃO use a senha normal do seu Gmail! Use uma **"Senha de App"**:
> 1. Vá em https://myaccount.google.com/apppasswords
> 2. Gere uma senha para "Mail"
> 3. Cole aqui no campo Value

---

## Depois de preencher tudo

1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. Pronto! Seu site estará no ar 🎉

## URL do seu site

A Vercel vai te dar uma URL tipo:
```
https://alberto-seguros.vercel.app
```

Você pode trocar depois em Settings → Domains.

---

## Testando o formulário

1. Abra o site
2. Preencha o formulário de cotação
3. Verifique se o e-mail chegou na caixa de entrada!
