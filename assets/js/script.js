document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LÓGICA DEL CARRITO ===
    const cartCountElement = document.querySelector('#cart-count');
    const addButtons = document.querySelectorAll('.btn-add');
    let currentCount = 0;

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentCount++;
            cartCountElement.innerText = currentCount;

            // Animación de pulso
            cartCountElement.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // === 2. LÓGICA DEL BOTÓN IR ARRIBA ===
    const backToTopBtn = document.getElementById("btn-back-to-top");

    // Detectar el scroll
    window.onscroll = function() {
        // Si bajamos más de 300 pixeles, mostramos el botón
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.setProperty("display", "block", "important");
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Al hacer clic, subir suavemente
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});