document.addEventListener('DOMContentLoaded', function() {
    const marquees = document.querySelectorAll('.marquee-content, .marquee-content02');
    let animationRunning = true;
    let lastTime = 0;
    const animationDelay = 16; // ~60fps
    
    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime >= animationDelay) {
            marquees.forEach(marquee => {
                const speed = marquee.classList.contains('marquee-content02') ? 0.8 : 1;
                const currentX = parseFloat(marquee.dataset.x || 0);
                const newX = currentX - speed;
                
                marquee.dataset.x = newX < -marquee.scrollWidth/2 ? 0 : newX;
                marquee.style.transform = `translateX(${marquee.dataset.x}px)`;
            });
            lastTime = currentTime;
        }
        
        if (animationRunning) {
            requestAnimationFrame(animate);
        }
    }
    
    // Inicia animação
    requestAnimationFrame(animate);
    
    // Pausa animação quando a página não está visível
    document.addEventListener('visibilitychange', () => {
        animationRunning = !document.hidden;
        if (animationRunning) {
            lastTime = 0;
            requestAnimationFrame(animate);
        }
    });
    
    // Limpa ao sair da página
    window.addEventListener('beforeunload', () => {
        animationRunning = false;
    });
});

document.querySelectorAll('.faq-red-theme .faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Fecha todos os itens primeiro
        document.querySelectorAll('.faq-red-theme .faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abre o item clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const promoButton = document.querySelector('.promo-button');
    const promoOverlay = document.querySelector('.promo-form-overlay');
    const closeButton = document.querySelector('.close-promo-form');
    const promoForm = document.getElementById('promoForm');
    
    // Abrir formulário
    promoButton.addEventListener('click', function() {
        promoOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // Fechar formulário
    closeButton.addEventListener('click', function() {
        promoOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fechar ao clicar fora
    promoOverlay.addEventListener('click', function(e) {
        if (e.target === promoOverlay) {
            promoOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Enviar formulário
    promoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio
        console.log('Formulário enviado:', {
            name: document.getElementById('promo-name').value,
            email: document.getElementById('promo-email').value,
            phone: document.getElementById('promo-phone').value
        });
        
        // Feedback visual
        alert('Cadastro realizado! Você receberá nossas promoções em breve.');
        
        // Reset e fechar
        promoForm.reset();
        promoOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});