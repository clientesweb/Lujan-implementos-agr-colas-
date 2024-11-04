document.addEventListener('DOMContentLoaded', function() {
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
    let currentBrandPosition = 0;

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
            image: '/placeholder.svg?height=300&width=400', 
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
            image: '/placeholder.svg?height=300&width=400', 
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
            image: '/placeholder.svg?height=300&width=400', 
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
            image: '/placeholder.svg?height=300&width=400', 
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
            image: '/placeholder.svg?height=300&width=400', 
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
                <img src="${machine.image}" alt="${machine.name}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${machine.name}</h3>
                    <p class="text-gray-600 mb-4">${machine.brand}</p>
                    <button class="view-details bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300" data-id="${machine.id}">
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
            filterButtons.forEach(btn => btn.classList.remove('bg-green-600', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-700'));
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-green-600', 'text-white');
            renderMachines(this.dataset.filter);
        });
    });

    renderMachines();

    // Machine Modal
    const modal = document.getElementById('machineModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnicalDetails = document.getElementById('modalTechnicalDetails');
    const modalBrand = document.getElementById('modalBrand');
    const modalWhatsApp = document.getElementById('modalWhatsApp');

    function addViewDetailsListeners() {
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const machine = machines.find(m => m.id === parseInt(this.dataset.id));
                modalTitle.textContent = machine.name;
                modalImage.src = machine.image;
                modalImage.alt = machine.name;
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
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});