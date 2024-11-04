document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Top Banner
    const bannerMessages = document.querySelectorAll('.banner-message');
    let currentBanner = 0;

    function rotateBanner() {
        bannerMessages[currentBanner].classList.remove('opacity-100');
        bannerMessages[currentBanner].classList.add('opacity-0');
        currentBanner = (currentBanner + 1) % bannerMessages.length;
        bannerMessages[currentBanner].classList.remove('opacity-0');
        bannerMessages[currentBanner].classList.add('opacity-100');
    }

    setInterval(rotateBanner, 5000);

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('hidden');
    });

    // Hero Slider
    const heroSlides = document.querySelectorAll('#heroSlider > div');
    let currentSlide = 0;

    function rotateHeroSlide() {
        heroSlides[currentSlide].classList.remove('opacity-100');
        heroSlides[currentSlide].classList.add('opacity-0');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.remove('opacity-0');
        heroSlides[currentSlide].classList.add('opacity-100');
    }

    setInterval(rotateHeroSlide, 5000);

    // Brand Slider
    const brandSlider = document.getElementById('brandSlider').firstElementChild;
    let currentBrandPosition =  0;

    function rotateBrands() {
        currentBrandPosition = (currentBrandPosition + 20) % 100;
        brandSlider.style.transform = `translateX(-${currentBrandPosition}%)`;
    }

    setInterval(rotateBrands, 3000);

    // Machinery Section
    const machines = [
        { 
            id: 1, 
            name: 'Tractor A',
            brand: 'Cestari', 
            images: [
                '/placeholder.svg?height=300&width=400&text=Tractor A 1',
                '/placeholder.svg?height=300&width=400&text=Tractor A 2',
                '/placeholder.svg?height=300&width=400&text=Tractor A 3'
            ],
            description: 'Tractor potente para labores pesadas.',
            technicalDetails: {
                power: '150 HP',
                weight: '5000 kg',
                fuelCapacity: '300 L',
                transmission: '16 velocidades adelante, 8 atrás'
            }
        },
        { 
            id: 2, 
            name: 'Cosechadora B', 
            brand: 'Praba', 
            images: [
                '/placeholder.svg?height=300&width=400&text=Cosechadora B 1',
                '/placeholder.svg?height=300&width=400&text=Cosechadora B 2',
                '/placeholder.svg?height=300&width=400&text=Cosechadora B 3'
            ],
            description: 'Cosechadora eficiente para grandes extensiones.',
            technicalDetails: {
                power: '300 HP',
                grainTankCapacity: '9000 L',
                cuttingWidth: '30 pies',
                threshingSystem: 'Rotor axial'
            }
        },
        { 
            id: 3, 
            name: 'Sembradora C', 
            brand: 'SR', 
            images: [
                '/placeholder.svg?height=300&width=400&text=Sembradora C 1',
                '/placeholder.svg?height=300&width=400&text=Sembradora C 2',
                '/placeholder.svg?height=300&width=400&text=Sembradora C 3'
            ],
            description: 'Sembradora de precisión para diversos cultivos.',
            technicalDetails: {
                rows: '16',
                rowSpacing: '52.5 cm',
                seedCapacity: '2800 L',
                fertiliserCapacity: '5000 L'
            }
        },
        { 
            id: 4, 
            name: 'Pulverizadora D', 
            brand: 'Super Walter', 
            images: [
                '/placeholder.svg?height=300&width=400&text=Pulverizadora D 1',
                '/placeholder.svg?height=300&width=400&text=Pulverizadora D 2',
                '/placeholder.svg?height=300&width=400&text=Pulverizadora D 3'
            ],
            description: 'Pulverizadora de alta tecnología y precisión.',
            technicalDetails: {
                tankCapacity: '3000 L',
                boomWidth: '24 m',
                pumpFlow: '250 L/min',
                nozzleSpacing: '50 cm'
            }
        },
        { 
            id: 5, 
            name: 'Embolsadora E', 
            brand: 'Richiger', 
            images: [
                '/placeholder.svg?height=300&width=400&text=Embolsadora E 1',
                '/placeholder.svg?height=300&width=400&text=Embolsadora E 2',
                '/placeholder.svg?height=300&width=400&text=Embolsadora E 3'
            ],
            description: 'Embolsadora rápida y eficiente para granos.',
            technicalDetails: {
                capacity: '250 ton/h',
                bagDiameter: '9 pies',
                bagLength: '60 m',
                power: '80 HP'
            }
        },
    ];

    const machineGrid = document.getElementById('machineGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function createMachineCard(machine) {
        return `
            <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105" data-brand="${machine.brand}">
                <img src="${machine.images[0]}" alt="${machine.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${machine.name}</h3>
                    <p class="text-gray-600 mb-4">${machine.brand}</p>
                    <button class="view-details bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300" data-id="${machine.id}">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;
    }

    function renderMachines(filter = 'all') {
        const filteredMachines = filter === 'all' ? machines : machines.filter(m => m.brand === filter);
        machineGrid.innerHTML = filteredMachines.map(createMachineCard).join('');
        addViewDetailsListeners();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('bg-red-600', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-yellow-50', 'text-red-600'));
            this.classList.remove('bg-yellow-50', 'text-red-600');
            this.classList.add('bg-red-600', 'text-white');
            renderMachines(this.dataset.filter);
        });
    });

    renderMachines();

    // Machine Modal
    const modal = document.getElementById('machineModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImageGallery = document.getElementById('modalImageGallery');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnicalDetails = document.getElementById('modalTechnicalDetails');
    const modalBrand = document.getElementById('modalBrand');
    const modalWhatsApp = document.getElementById('modalWhatsApp');

    function addViewDetailsListeners() {
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const machine = machines.find(m => m.id === parseInt(this.dataset.id));
                modalTitle.textContent = machine.name;
                modalImageGallery.innerHTML = machine.images.map(img => `
                    <img src="${img}" alt="${machine.name}" class="w-full rounded-lg mb-4">
                `).join('');
                modalDescription.textContent = machine.description;
                modalTechnicalDetails.innerHTML = Object.entries(machine.technicalDetails)
                    .map(([key, value]) => `<li><span class="font-medium">${key.charAt(0).toUpperCase() + key.slice(1)}:</span> ${value}</li>`)
                    .join('');
                modalBrand.textContent = machine.brand;
                modalWhatsApp.href = `https://wa.me/5493468531852?text=Hola,%20estoy%20interesado%20en%20${encodeURIComponent(machine.name)}`;
                modal.classList.remove('hidden');
            });
        });
    }

    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    const machinerySelect = document.getElementById('maquinaria');

    machines.forEach(machine => {
        const option = document.createElement('option');
        option.value = machine.name;
        option.textContent = `${machine.name} - ${machine.brand}`;
        machinerySelect.appendChild(option);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const maquinaria = document.getElementById('maquinaria').value;
        const mensaje = document.getElementById('mensaje').value;

        const whatsappMessage = `
¡Nuevo contacto desde la web!
---------------------------
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Maquinaria de interés: ${maquinaria}
Mensaje: ${mensaje}
        `.trim();

        const whatsappUrl = `https://wa.me/5493468531852?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const whatsappNumber = document.getElementById('whatsappNumber').value;
        const message = `
¡Nueva suscripción al boletín!
---------------------------
Número de WhatsApp: ${whatsappNumber}
        `.trim();

        const whatsappUrl = `https://wa.me/5493468531852?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        this.reset();
        alert('¡Gracias por suscribirte a nuestro boletín!');
    });

    // ScrollReveal
    ScrollReveal().reveal('.scroll-reveal', {
        delay: 200,
        distance: '20px',
        duration: 1000,
        easing: 'ease-in-out',
        origin: 'bottom'
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});