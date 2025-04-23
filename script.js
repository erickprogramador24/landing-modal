document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const modal = document.getElementById('modal');
    const openModalButtons = document.querySelectorAll('#open-modal, #hero-cta');
    const closeModalButton = document.getElementById('close-modal');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    const form = document.querySelector('.modal-form');
    const successNotification = document.getElementById('success-notification');

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Alternar tema claro/oscuro
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    // Actualizar icono del tema
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.material-icons');
        icon.textContent = theme === 'dark-theme' ? 'brightness_7' : 'brightness_4';
    }

    // Abrir modal con animación
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Agregar animación especial
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
                modalContent.style.transform = 'translateY(0) scale(1)';
            }, 10);
        });
    });

    // Cerrar modal con animación
    closeModalButton.addEventListener('click', function() {
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(20px) scale(0.95)';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            modalContent.style.transform = 'translateY(0) scale(1)';
        }, 300);
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.transform = 'translateY(20px) scale(0.95)';
            
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                modalContent.style.transform = 'translateY(0) scale(1)';
            }, 300);
        }
    });

    // Menú móvil
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        
        // Cambiar icono del botón
        const icon = this.querySelector('.material-icons');
        if (navLinks.classList.contains('active')) {
            icon.textContent = 'close';
            this.style.backgroundColor = 'rgba(var(--primary-color), 0.1)';
            this.style.color = 'var(--primary-color)';
        } else {
            icon.textContent = 'menu';
            this.style.backgroundColor = 'transparent';
            this.style.color = 'var(--text-primary)';
        }
    });

    // Efecto ripple para botones
    document.querySelectorAll('.with-ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear elemento de efecto ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            // Posicionar el efecto
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Estilos del ripple
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            
            // Agregar y luego remover el efecto
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Efecto focus para inputs
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('.material-icons').style.color = 'var(--primary-color)';
            this.parentElement.querySelector('.focus-line').style.width = 'calc(100% - 40px)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.querySelector('.material-icons').style.color = 'var(--text-secondary)';
                this.parentElement.querySelector('.focus-line').style.width = '0';
            }
        });
    });

    // Validación del formulario
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // Simular envío del formulario
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="material-icons rotating">hourglass_empty</span> Procesando...';
                
                // Mostrar notificación de éxito después de un retraso
                setTimeout(() => {
                    // Cerrar modal
                    const modalContent = document.querySelector('.modal-content');
                    modalContent.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        modal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        modalContent.style.transform = 'translateY(0) scale(1)';
                    }, 300);
                    
                    // Mostrar notificación
                    successNotification.classList.add('active');
                    
                    // Ocultar notificación después de 5 segundos
                    setTimeout(() => {
                        successNotification.classList.remove('active');
                    }, 5000);
                    
                    // Restablecer formulario
                    form.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<span class="material-icons">how_to_reg</span> Regístrate gratis';
                    
                    // Restablecer etiquetas flotantes
                    document.querySelectorAll('.form-group.floating-label label').forEach(label => {
                        label.style.transform = '';
                        label.style.color = '';
                    });
                }, 1500);
            } else {
                // Efecto de error
                const inputs = document.querySelectorAll('.form-group input');
                inputs.forEach(input => {
                    if (!input.value) {
                        input.style.borderColor = 'var(--error)';
                        input.parentElement.querySelector('.material-icons').style.color = 'var(--error)';
                        
                        setTimeout(() => {
                            input.style.borderColor = '';
                            input.parentElement.querySelector('.material-icons').style.color = '';
                        }, 1000);
                    }
                });
            }
        });
    }

    // Cerrar notificación al hacer clic
    successNotification.addEventListener('click', function() {
        this.classList.remove('active');
    });
});

// Agregar estilos dinámicos para el efecto ripple
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    .rotating {
        animation: rotate 1s linear infinite;
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);