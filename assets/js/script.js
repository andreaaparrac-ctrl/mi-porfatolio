document.addEventListener('DOMContentLoaded', () => {
    
    // === CARRITO ===
    const cartCountElement = document.querySelector('#cart-count');
    let currentCount = 0;

    // Función para sumar al carrito
    const actualizarCarrito = () => {
        currentCount++;
        cartCountElement.innerText = currentCount;

        // Efecto visual de pulso
        cartCountElement.style.transform = 'scale(1.5)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    };

    // Asignar el evento a TODOS los botones .btn-add de las cards
    document.addEventListener('click', (event) => {
        // Si el elemento clickeado tiene la clase 'btn-add'
        if (event.target && event.target.classList.contains('btn-add')) {
            actualizarCarrito();
        }
    });

    // === DETALLE DE PRODUCTO (MODAL) ===
    const detalleModal = document.getElementById('detalleModal');
    if (detalleModal) {
        detalleModal.addEventListener('show.bs.modal', event => {
            const trigger = event.relatedTarget;
            
            // Llenar datos del modal
            document.getElementById('modalTitle').textContent = trigger.getAttribute('data-titulo');
            document.getElementById('modalPrice').textContent = trigger.getAttribute('data-precio');
            document.getElementById('modalImg').src = trigger.getAttribute('src');
            document.getElementById('modalDescription').textContent = trigger.getAttribute('data-descripcion');
        });

        // botón de "Añadir" desde el modal
        const btnModalAdd = detalleModal.querySelector('.btn-info');
        if (btnModalAdd) {
            btnModalAdd.addEventListener('click', () => {
                actualizarCarrito();
                // cerrar el modal al agregar
                const modalInstance = bootstrap.Modal.getInstance(detalleModal);
                modalInstance.hide();
            });
        }
    }

// === BOTÓN IR ARRIBA ===
    const backToTopBtn = document.getElementById("btn-back-to-top");
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.setProperty("display", "block", "important");
        } else {
            backToTopBtn.style.display = "none";
        }
    };
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});