# Configuração Gunicorn para 500 acessos simultâneos
import multiprocessing

# Endereço e porta
bind = "0.0.0.0:5000"

# Workers: (2 x CPU cores) + 1
workers = multiprocessing.cpu_count() * 2 + 1

# Tipo de worker (gevent para async)
worker_class = "gevent"

# Conexões simultâneas por worker
worker_connections = 1000

# Threads por worker
threads = 4

# Timeout
timeout = 120
keepalive = 5

# Logs
accesslog = "-"
errorlog = "-"
loglevel = "info"

# Preload app para economizar memória
preload_app = True

# Reiniciar workers após N requisições (previne memory leaks)
max_requests = 1000
max_requests_jitter = 50
