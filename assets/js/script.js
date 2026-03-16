document.addEventListener('DOMContentLoaded', () => {
    
    // === CARRITO ===
    const cartCountElement = document.querySelector('#cart-count');
    const cartContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = []; 

    const actualizarInterfaz = () => {
        
        cartCountElement.innerText = cart.length;

        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="text-center opacity-50">El carrito está vacío</p>';
            cartTotalElement.innerText = '$0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            total += item.precio;
            const div = document.createElement('div');
            div.className = 'd-flex justify-content-between align-items-center mb-3 p-2 border border-secondary rounded';
            div.innerHTML = `
                <div>
                    <h6 class="mb-0 text-info" style="font-size: 0.9rem;">${item.titulo}</h6>
                    <small class="text-white-50">$${item.precio.toLocaleString('es-CL')}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarDelCarrito(${index})">✕</button>
            `;
            cartContainer.appendChild(div);
        });

        cartTotalElement.innerText = `$${total.toLocaleString('es-CL')}`;

        // efecto visual de pulso
        cartCountElement.style.transform = 'scale(1.5)';
        setTimeout(() => cartCountElement.style.transform = 'scale(1)', 200);
    };

    // Función para añadir 
    const añadirAlCarrito = (titulo, precioTexto) => {
        const precio = parseInt(precioTexto.replace('$', '').replace(/\./g, ''));
        cart.push({ titulo, precio });
        actualizarInterfaz();
    };

    // Función para eliminar
    window.eliminarDelCarrito = (index) => {
        cart.splice(index, 1);
        actualizarInterfaz();
    };

    // Eventos de clic actualizados
    document.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('btn-add')) {
            const card = event.target.closest('.card');
            const titulo = card.querySelector('.card-title').innerText;
            const precio = card.querySelector('.card-text').innerText;
            añadirAlCarrito(titulo, precio);
        }
    });

        const btnModalAdd = document.querySelector('#detalleModal .btn-info');
    if (btnModalAdd) {
        btnModalAdd.addEventListener('click', () => {
            const titulo = document.getElementById('modalTitle').textContent;
            const precio = document.getElementById('modalPrice').textContent;
            añadirAlCarrito(titulo, precio);
            bootstrap.Modal.getInstance(document.getElementById('detalleModal')).hide();
        });
    }

    // === DETALLE DE PRODUCTO (MODAL) ===
    const detalleModal = document.getElementById('detalleModal');
    if (detalleModal) {
        detalleModal.addEventListener('show.bs.modal', event => {
            const trigger = event.relatedTarget;
            
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