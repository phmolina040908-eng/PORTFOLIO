# 🚀 Portfólio Profissional - Pedro Henrique Molina

Site de portfólio profissional desenvolvido com Flask, HTML5, CSS3 e JavaScript.

## 📋 Sobre o Projeto

Portfólio moderno e responsivo para apresentação de serviços na área de tecnologia, desenvolvimento e informática.

### ✨ Funcionalidades

- ✅ Design moderno e responsivo (mobile, tablet, desktop)
- ✅ Seção Home com links para LinkedIn e WhatsApp
- ✅ Seção Sobre Mim
- ✅ Galeria de imagens com sistema de upload
- ✅ Cards de serviços com preços e botão WhatsApp
- ✅ Animações suaves ao rolar a página
- ✅ Efeitos hover nos elementos
- ✅ Footer com redes sociais

## 🛠️ Tecnologias Utilizadas

- **Backend:** Python 3.x + Flask
- **Frontend:** HTML5, CSS3, JavaScript
- **Ícones:** Font Awesome 6
- **Fontes:** Google Fonts (Poppins)

## 📁 Estrutura do Projeto

```
SITES/
│
├── app.py                  # Aplicação Flask principal
├── README.md              # Este arquivo
│
├── templates/
│   ├── base.html          # Template base
│   └── index.html         # Página principal
│
└── static/
    ├── css/
    │   └── style.css      # Estilos do site
    ├── js/
    │   └── script.js      # Scripts JavaScript
    └── uploads/           # Pasta para imagens da galeria
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Python 3.7 ou superior instalado
- pip (gerenciador de pacotes Python)

### Modo Desenvolvimento (testes locais)

```bash
# Instalar dependências
pip install flask

# Executar servidor de desenvolvimento
python app.py
```

### Modo Produção (500 acessos simultâneos) ⚡

**Windows:**
```bash
# Instalar dependências
pip install -r requirements.txt

# Opção 1: Script automático
start_production.bat

# Opção 2: Comando direto
gunicorn -c gunicorn_config.py app:app
```

**Linux/Mac:**
```bash
# Instalar dependências
pip install -r requirements.txt

# Executar com Gunicorn
gunicorn -c gunicorn_config.py app:app
```

### Passo 3: Acessar o Site

Abra seu navegador e acesse:

```
http://localhost:5000
```

## ⚡ Performance

### Configuração Atual:
- ✅ **Gunicorn** com workers assíncronos (gevent)
- ✅ Suporta **500+ acessos simultâneos**
- ✅ Cache de dados estáticos
- ✅ Workers automáticos baseados em CPU
- ✅ Timeout e keepalive otimizados
- ✅ Auto-restart de workers (previne memory leaks)

### Capacidade:
- **Workers:** (CPU cores × 2) + 1
- **Conexões por worker:** 1000
- **Total:** 500-1000+ conexões simultâneas

## 📱 Seções do Site

### 1. Header / Home
- Nome em destaque
- Frase de apresentação
- Botões para LinkedIn e WhatsApp com ícones

### 2. Sobre Mim
- Apresentação profissional
- Áreas de atuação

### 3. Galeria de Imagens
- Upload de imagens via formulário web
- Suporte para JPG, JPEG e PNG
- Grid responsivo de imagens
- Limite de 16MB por arquivo

### 4. Serviços
Cards com:
- Criação de sites para pequenas empresas - R$ 200
- Consultoria e montagem de computadores - R$ 80
- Aulas de informática básica - R$ 80/hora

Cada card possui botão direto para WhatsApp.

### 5. Footer
- Direitos autorais
- Links para redes sociais

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS em `static/css/style.css`:

```css
:root {
    --primary-color: #0066ff;      /* Azul principal */
    --secondary-color: #00d9ff;    /* Azul secundário */
    --whatsapp-green: #25d366;     /* Verde WhatsApp */
    --dark-bg: #0a0a0a;            /* Fundo escuro */
    --dark-card: #1a1a1a;          /* Cards escuros */
}
```

### Alterar Serviços

Edite a lista `services` em `app.py`:

```python
services = [
    {
        'title': 'Nome do Serviço',
        'description': 'Descrição do serviço',
        'price': 'R$ 100'
    }
]
```

### Alterar Links

Edite os links nos templates em `templates/index.html`:
- LinkedIn: Procure por `linkedin.com/in/...`
- WhatsApp: Procure por `wa.me/...`

## 📤 Upload de Imagens

### Via Interface Web
1. Acesse a seção "Galeria"
2. Clique em "Escolher arquivo"
3. Selecione uma imagem (JPG, JPEG ou PNG)
4. Clique em "Enviar Imagem"

### Via Código
Coloque as imagens diretamente na pasta `static/uploads/`

## 🔒 Segurança

- Upload limitado a 16MB
- Apenas formatos JPG, JPEG e PNG permitidos
- Nomes de arquivo sanitizados automaticamente

## 🌐 Deploy (Produção)

Para colocar o site online com alta performance:

### **Render** (Recomendado - Gratuito)
1. Crie conta em [render.com](https://render.com)
2. Conecte seu repositório GitHub
3. Render detecta automaticamente o Procfile
4. Deploy automático com Gunicorn
5. **Suporta 500+ acessos simultâneos**

### **Railway** (Gratuito)
1. Acesse [railway.app](https://railway.app)
2. Conecte GitHub
3. Deploy automático
4. Escala automaticamente

### **Heroku**
```bash
# Login
heroku login

# Criar app
heroku create seu-portfolio

# Deploy
git push heroku main
```

### **VPS (DigitalOcean, AWS, etc.)**
```bash
# Instalar dependências
pip install -r requirements.txt

# Executar em background
nohup gunicorn -c gunicorn_config.py app:app &

# Ou usar systemd/supervisor para gerenciar
```

### Configuração Nginx (opcional - para VPS)
```nginx
server {
    listen 80;
    server_name seudominio.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
        alias /caminho/para/SITES/static;
        expires 30d;
    }
}
```

## 📞 Contato

- **LinkedIn:** [Pedro Henrique Molina](https://www.linkedin.com/in/pedro-henrique-carvalho-molina-111b54373)
- **WhatsApp:** [(35) 99720-5858](https://wa.me/5535997205858)

## 📝 Licença

© 2024 Pedro Henrique Molina. Todos os direitos reservados.

---

**Desenvolvido com ❤️ usando Flask**
