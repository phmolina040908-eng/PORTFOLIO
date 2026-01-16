@echo off
echo ========================================
echo  INICIANDO SERVIDOR DE PRODUCAO
echo  Suporte: 500 acessos simultaneos
echo ========================================
echo.

echo [1/3] Verificando dependencias...
pip install -r requirements.txt --quiet

echo [2/3] Iniciando Gunicorn...
echo.
echo Servidor rodando em: http://localhost:5000
echo Pressione Ctrl+C para parar
echo.

gunicorn -c gunicorn_config.py app:app
