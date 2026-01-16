# -*- coding: utf-8 -*-
"""
Aplicação Flask - Portfólio Pedro Henrique Molina
Site profissional com upload de imagens e seções de serviços
"""

from flask import Flask, render_template, request, redirect, url_for, flash
from werkzeug.utils import secure_filename
import os
from functools import lru_cache

app = Flask(__name__)
app.secret_key = 'chave-secreta-portfolio-2024'

# Configurações de upload
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max

# Criar pasta de uploads se não existir
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Verifica se o arquivo tem extensão permitida"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@lru_cache(maxsize=1)
def get_services():
    """Cache dos serviços para evitar recriação"""
    return [
        {
            'title': 'Criação de sites para pequenas empresas',
            'description': 'Sites modernos, responsivos e profissionais para pequenos negócios.',
            'price': 'R$ 200'
        },
        {
            'title': 'Consultoria e montagem de computadores',
            'description': 'Montagem, upgrade e diagnóstico de computadores.',
            'price': 'R$ 80'
        },
        {
            'title': 'Aulas de informática básica',
            'description': 'Aulas práticas para iniciantes, do básico ao uso profissional.',
            'price': 'R$ 80/hora'
        }
    ]

@app.route('/')
def index():
    """Página principal do portfólio"""
    # Lista todas as imagens da galeria
    images = []
    if os.path.exists(UPLOAD_FOLDER):
        images = [f for f in os.listdir(UPLOAD_FOLDER) 
                 if allowed_file(f)]
    
    return render_template('index.html', images=images, services=get_services())

@app.route('/upload', methods=['POST'])
def upload_file():
    """Processa upload de imagens para a galeria"""
    if 'file' not in request.files:
        flash('Nenhum arquivo selecionado', 'error')
        return redirect(url_for('index'))
    
    file = request.files['file']
    
    if file.filename == '':
        flash('Nenhum arquivo selecionado', 'error')
        return redirect(url_for('index'))
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('Imagem enviada com sucesso!', 'success')
    else:
        flash('Formato de arquivo não permitido. Use JPG, JPEG ou PNG.', 'error')
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    print("🚀 Servidor iniciado!")
    print("📱 Acesse: http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
