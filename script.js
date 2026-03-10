document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Toggle básico para menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#fff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // 3. Máscara para o campo de Telefone (00) 00000-0000
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // 4. Lógica de envio para o WhatsApp
    const whatsappForm = document.getElementById('whatsapp-form');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o recarregamento da página

            // Captura os valores dos campos
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value;
            const email = document.getElementById('email').value;
            const assunto = document.getElementById('assunto').value;

            // Monta o texto da mensagem com formatação para o WhatsApp
            const textoMensagem = `Olá! Vim pelo site e gostaria de mais informações.\n\n*Meus dados:*\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*E-mail:* ${email}\n\n*Assunto:*\n${assunto}`;

            // Número de destino (apenas números, incluindo código do país 55 e DDD)
            const numeroDestino = '5541988707777';

            // Cria a URL da API do WhatsApp codificando o texto
            const urlWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(textoMensagem)}`;

            // Abre o WhatsApp em uma nova aba
            window.open(urlWhatsApp, '_blank');
        });
    }
});
