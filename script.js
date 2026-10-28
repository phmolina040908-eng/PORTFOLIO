// --- MENU HAMBÚRGUER ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
});

navLinks.forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// --- EFEITO DIGITAÇÃO (TYPING EFFECT) ---
const words = [
    "Técnico em Desenvolvimento de Sistemas",
    "Técnico em Informática",
    "Desenvolvedor Web",
    "Empreendedor em Tecnologia"
];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 80);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typing-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 40);
    };
    loopDeleting();
}

// --- REVEAL ON SCROLL & BARRA DE PROGRESSO & BACK TO TOP ---
const reveals = document.querySelectorAll('.reveal');
const progressBar = document.getElementById('progress-bar');
const backToTopBtn = document.getElementById('back-to-top');

function checkScrollElements() {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (windowScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible || window.innerWidth < 992) {
            element.classList.add('active');
            if(element.id === 'habilidades') {
                animateSkillBars(element);
            }
        }
    });

    // Sempre engatilha os contadores de estatísticas no início para evitar bugs visuais
    animateCounters();

    if (windowScroll > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', checkScrollElements);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- ANIMAÇÃO DAS BARRAS DE HABILIDADE ---
let skillBarsAnimated = false;
function animateSkillBars(parent) {
    if (skillBarsAnimated) return;
    const bars = parent.querySelectorAll('.progress-line span');
    bars.forEach(bar => {
        // Pega as larguras diretamente das tags inseridas no index.html
        if(bar.parentElement.previousElementSibling.lastElementChild){
            const percentage = bar.parentElement.previousElementSibling.lastElementChild.innerText;
            bar.style.width = percentage;
        }
    });
    skillBarsAnimated = true;
}

// --- CONTADORES ANIMADOS ---
let countersStarted = false;
function animateCounters() {
    if (countersStarted) return;
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = Math.max(2000 / target, 50); // Ajusta velocidade mínima do contador

        const updateCount = () => {
            if (count < target) {
                count++;
                counter.innerText = count;
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
    countersStarted = true;
}

// --- FUNÇÃO PARA COPIAR CLIPBOARD ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Número copiado com sucesso para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar número: ', err);
    });
}

// --- CANVAS BACKGROUND PARTICLES (HERO) ---
function initCanvasParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    const numberOfParticles = 45;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(0, 102, 255, 0.25)' : 'rgba(139, 92, 246, 0.25)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// DISPARA NO CARREGAMENTO DA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    typingEffect();
    initCanvasParticles();
    setTimeout(checkScrollElements, 200); // Força checagem inicial de layout seguro
});