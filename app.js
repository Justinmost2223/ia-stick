document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // CONSTANTES Y ESTADO GLOBAL
    // ----------------------------------------------------
    let lastScrollY = window.scrollY;
    let currentStatus = 'balanced';
    
    // Elementos de la UI
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero-main');
    const stickContainer = document.getElementById('executra-stick-container');
    const executraStickImage = document.getElementById('executra-stick-image'); 
    const dataTicker = document.querySelector('.ticker-value');
    const executionList = document.getElementById('execution-list'); 
    const loadingBar = document.getElementById('friction-loading-bar');
    
    // Elementos del HUD y Métricas
    const echoAvatar = document.getElementById('echo-avatar');
    const ildValue = document.getElementById('ild-value');
    const shimmerElement = document.getElementById('re-value');

    // Módulos que queremos animar al aparecer (todas las cards)
    const dataModules = document.querySelectorAll('.data-module');
    
    const MAX_LOGS = 6;
    let dailyRE = 300.00; 

    // Mapeo de estados (se mantiene)
    const STATUS_MAP = {
        focused: { status: 'focused', ild_min: 0.10, ild_max: 0.25, re_mod: 1.10, trend: 'down', trend_icon: 'fa-caret-down', status_text: 'TFM ÓPTIMO (¡Máxima Libertad!)' },
        balanced: { status: 'balanced', ild_min: 0.25, ild_max: 0.45, re_mod: 1.03, trend: 'up', trend_icon: 'fa-caret-up', status_text: 'ESTABLECIDO (Flujo Constante)' },
        friction: { status: 'friction', ild_min: 0.55, ild_max: 0.95, re_mod: 0.90, trend: 'up', trend_icon: 'fa-exclamation-triangle', status_text: 'ALERTA: PIEZAS EN CONFLICTO (Solucionando...)' }
    };

    // ----------------------------------------------------
    // FUNCIÓN CENTRAL: GESTIÓN DE SCROLL ÉPICO
    // ----------------------------------------------------

    const handleScrollEffects = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // 1. Efecto Parallax del STICK al hacer scroll (Más pronunciado)
        // Hacemos que la imagen del STICK se mueva mucho menos que el resto de la página
        const stickParallaxFactor = 0.5; // Ajustamos a 0.5 para más impacto visual
        executraStickImage.style.transform = `translateY(${scrollY * stickParallaxFactor}px) translateZ(0)`;
        
        // 2. Efecto de Opacidad/Desvanecimiento del Título HERO
        // El título se desvanece dramáticamente al salir de la vista
        const heroHeight = heroSection.offsetHeight;
        const fadeStart = 0; // Empieza a desvanecerse inmediatamente
        const fadeEnd = heroHeight / 2; // Desaparece a mitad de la sección HERO

        let opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        opacity = Math.max(0, opacity);
        
        heroSection.style.opacity = opacity;
        
        // 3. Activación de Módulos al aparecer (Scroll Reveal)
        dataModules.forEach(module => {
            const moduleTop = module.getBoundingClientRect().top;
            
            // Si el módulo está dentro del 80% de la ventana de vista
            if (moduleTop < windowHeight * 0.8) {
                module.classList.add('is-active');
            } else {
                // Opcional: Desactivar al subir (para efectos repetitivos)
                module.classList.remove('is-active');
            }
        });

        // 4. Comportamiento de la barra de navegación (se esconde al bajar)
        navbar.style.transform = (scrollY > 100 && scrollY > lastScrollY) ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollY = scrollY;
    };
    
    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects(); // Ejecutar al cargar para inicializar estados

    // ----------------------------------------------------
    // INYECCIÓN JS DE SIMULACIÓN (Se mantiene la lógica de IA)
    // ----------------------------------------------------

    const simulateLoadingBar = (statusKey) => { /* ... (código) ... */ };

    const generateActivityLog = () => {
        // Generamos un log de actividad
        const logs = [
            'Gestión de renovación de suscripción. (Capa 3: Autónoma)',
            'Pago automático de factura energética. (Capa 2: Condicional)',
            'Reagenda de cita crítica por solapamiento. (Capa 3: Autónoma)',
            'Análisis de bandeja de entrada: Tareas No prioritarias filtradas. (Capa 3)',
            'Notificación: Ruta óptima de viaje sugerida. (Capa 1: Notificación)',
            'Alerta EEO Bajo: Reserva automática de sesión de bienestar. (Capa 3: Bienestar)'
        ];
        const logText = logs[Math.floor(Math.random() * logs.length)];
        
        const newLog = document.createElement('li');
        newLog.classList.add('log-entry');
        newLog.style.opacity = 0; // Inicialmente oculto para el fade-in

        const isFriction = currentStatus === 'friction' && Math.random() < 0.6;
        const iconClass = isFriction ? 'fa-exclamation-triangle' : 'fa-check';
        const statusClass = isFriction ? 'text-friction' : '';

        newLog.innerHTML = `<span class="status-exec ${statusClass}"><i class="fas ${iconClass}"></i></span> [PROC] ${logText}`;
        
        executionList.prepend(newLog);
        
        setTimeout(() => { newLog.style.opacity = 1; }, 50);

        while (executionList.children.length > MAX_LOGS) {
            executionList.removeChild(executionList.lastChild);
        }
    };
    
    const controlAnimations = (statusKey) => { /* ... (código de animaciones) ... */ };

    const updateEchoStatus = (statusKey) => { /* ... (código de actualización de métricas) ... */ };
    
    const startStatusSimulation = () => {
        const statuses = ['focused', 'balanced', 'friction', 'focused', 'balanced'];
        let index = 0;
        
        updateEchoStatus(statuses[index]);

        setInterval(() => {
            index = (index + 1) % statuses.length;
            updateEchoStatus(statuses[index]);
        }, 4500); 
        
        setInterval(generateActivityLog, 1200); 
    };
    
    startStatusSimulation(); 

    // ----------------------------------------------------
    // ROTACIÓN 3D Y OTROS LISTENERS (Se mantienen y se mejoran)
    // ----------------------------------------------------
    
    // Rotación 3D (Sentir que el STICK te "sigue")
    const applyTransform = (element, rotX, rotY) => { 
        // ¡Cambiamos la propiedad de Y para que el efecto parallax de scroll no lo anule!
        element.style.transform = `translateY(${window.scrollY * 0.5}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.0)`;
    };
    const setupMouseFollow = (containerElement, elementToRotate) => {
        if (!containerElement || !elementToRotate) return;
        
        containerElement.addEventListener('mousemove', (e) => {
            const rect = containerElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const maxTilt = 8; 

            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            const rotY = x * maxTilt;
            const rotX = -y * maxTilt;

            applyTransform(elementToRotate, rotX, rotY);
        });
        containerElement.addEventListener('mouseleave', () => { 
            executraStickImage.style.transition = 'transform 0.5s ease-out';
            // Volvemos a la rotación neutral, manteniendo la posición Y de scroll
            executraStickImage.style.transform = `translateY(${window.scrollY * 0.5}px) rotateX(0deg) rotateY(0deg) scale(1.0)`;
            setTimeout(() => { executraStickImage.style.transition = 'none'; }, 500);
        });
    };
    setupMouseFollow(stickContainer, executraStickImage); 
    
    // Contador global (se mantiene)
    const startDataCounter = () => { /* ... */ };
    startDataCounter();

    // Listeners de Modales y Scroll
    const modalStick = document.getElementById('stick-view-modal');
    const openStickBtns = document.querySelectorAll('[id*="view-stick-btn"]');
    const closeBtnStick = document.querySelector('.close-btn-stick');
    
    const toggleModalStick = (show = true) => { /* ... */ };

    openStickBtns.forEach(btn => btn.addEventListener('click', () => toggleModalStick(true)));
    closeBtnStick.addEventListener('click', () => toggleModalStick(false));
    
    document.getElementById('view-echo-status-btn').addEventListener('click', () => {
        document.getElementById('metricas').scrollIntoView({ behavior: 'smooth' });
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modalStick) { toggleModalStick(false); }
    });
});
