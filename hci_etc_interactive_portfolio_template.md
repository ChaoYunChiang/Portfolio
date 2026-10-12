<!DOCTYPE html>
<html lang="zh-TW" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name | HCI & Creative Technology Portfolio</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Space Grotesk', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f0f7ff',
                            500: '#3b82f6',
                            600: '#2563eb',
                            900: '#1e3a8a',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .glass-nav {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white">

    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 w-full z-40 glass-nav border-b border-slate-200/80 transition-all duration-300">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" class="font-heading font-bold text-xl tracking-tight text-slate-900 hover:text-blue-600 transition-colors">
                YOUR NAME<span class="text-blue-600">.</span>
            </a>
            <div class="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
                <a href="#work" class="hover:text-blue-600 transition-colors">Featured Work</a>
                <a href="#about" class="hover:text-blue-600 transition-colors">About & Skills</a>
                <a href="#research" class="hover:text-blue-600 transition-colors">Research & Philosophy</a>
                <a href="https://github.com/yourusername" target="_blank" class="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-sm">
                    <i class="fab fa-github mr-1.5"></i> GitHub
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 md:pt-40 md:pb-28 max-w-6xl mx-auto px-6">
        <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                HCI & Interactive Media Portfolio
            </div>
            <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Bridging Technology, UX Research & Storytelling.
            </h1>
            <p class="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
                I am an aspiring HCI researcher and creative technologist designing meaningful digital experiences, human-centered systems, and immersive interactions.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="#work" class="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md hover:shadow-lg">
                    View Case Studies <i class="fas fa-arrow-down ml-2 text-sm"></i>
                </a>
                <a href="mailto:your.email@example.com" class="px-6 py-3 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium transition-all shadow-sm">
                    Contact Me
                </a>
            </div>
        </div>
    </section>

    <!-- Project Filter / Work Section -->
    <section id="work" class="py-16 bg-white border-t border-slate-200">
        <div class="max-w-6xl mx-auto px-6">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <h2 class="font-heading text-3xl font-bold text-slate-900 mb-2">Selected Projects</h2>
                    <p class="text-slate-500">Academic research, UX case studies, and interactive technical projects.</p>
                </div>
                <!-- Filter Buttons -->
                <div class="flex flex-wrap gap-2 mt-6 md:mt-0" id="filter-buttons">
                    <button data-filter="all" class="filter-btn active px-4 py-1.5 rounded-full text-sm font-medium bg-slate-900 text-white transition-all">All</button>
                    <button data-filter="ux" class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">UX Research (mHCI/UW)</button>
                    <button data-filter="tech" class="filter-btn px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">Creative Tech (ETC)</button>
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid md:grid-cols-2 gap-8" id="projects-grid">
                
                <!-- Project 1: UX Case Study (Great for CMU mHCI / UW HCI) -->
                <div class="project-card group border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col" data-category="ux">
                    <div class="relative overflow-hidden aspect-video bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80" alt="Project Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">UX Case Study</span>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">User Research • Prototyping</div>
                            <h3 class="font-heading text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                                Accessibility in Micro-Mobility
                            </h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">
                                A human-centered redesign of shared transit apps targeting users with low vision. Includes user interviews, wireframing, and usability testing with 12 participants.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span class="text-xs text-slate-500 font-mono">Figma / React / UserTesting</span>
                            <button onclick="openModal('modal-project-1')" class="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center">
                                Read Case Study <i class="fas fa-chevron-right ml-1 text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Project 2: Creative Tech / Game (Great for CMU ETC) -->
                <div class="project-card group border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col" data-category="tech">
                    <div class="relative overflow-hidden aspect-video bg-slate-100">
                        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" alt="Project Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">Interactive Tech</span>
                    </div>
                    <div class="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Spatial Audio • WebGL</div>
                            <h3 class="font-heading text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-3">
                                Echoes: 3D Soundscape Experience
                            </h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">
                                Web-based interactive 3D audio visualizer built with Three.js and Web Audio API. Designed to explore emotional responses to spatial acoustic environments.
                            </p>
                        </div>
                        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <span class="text-xs text-slate-500 font-mono">JavaScript / Three.js / WebAudio</span>
                            <button onclick="openModal('modal-project-2')" class="text-sm font-semibold text-purple-600 hover:text-purple-800 flex items-center">
                                View Demo & Code <i class="fas fa-chevron-right ml-1 text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- About & Skills Section -->
    <section id="about" class="py-20 bg-slate-50 border-t border-slate-200">
        <div class="max-w-6xl mx-auto px-6">
            <div class="grid md:grid-cols-12 gap-12 items-start">
                <div class="md:col-span-5">
                    <h2 class="font-heading text-3xl font-bold text-slate-900 mb-4">About Me</h2>
                    <p class="text-slate-600 leading-relaxed mb-6">
                        I am a senior studying Computer Science / Interactive Media. My passion lies at the intersection of emerging technologies and human behavior.
                    </p>
                    <p class="text-slate-600 leading-relaxed mb-6">
                        Aiming for graduate studies at CMU ETC, CMU mHCI, and UW HCDE to further explore multimodal interaction, spatial computing, and accessible design.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium transition-colors">
                            <i class="fas fa-file-pdf mr-1.5"></i> Resume (PDF)
                        </a>
                    </div>
                </div>
                <div class="md:col-span-7 grid sm:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <i class="fas fa-microscope text-blue-600"></i> Research & Design
                        </h3>
                        <ul class="text-sm text-slate-600 space-y-2">
                            <li>• User Interview & Contextual Inquiry</li>
                            <li>• Usability Testing & Heuristic Evaluation</li>
                            <li>• Wireframing & Interactive Prototyping</li>
                            <li>• Information Architecture & Journey Mapping</li>
                        </ul>
                    </div>
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <i class="fas fa-code text-purple-600"></i> Technical Skills
                        </h3>
                        <ul class="text-sm text-slate-600 space-y-2">
                            <li>• Frontend: HTML5, CSS3, JavaScript (ES6+), React</li>
                            <li>• Creative Coding: Three.js, p5.js, WebGL</li>
                            <li>• Game / 3D: Unity (C#), Blender</li>
                            <li>• Version Control: Git, GitHub Actions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <p class="font-heading font-bold text-lg">YOUR NAME</p>
                <p class="text-slate-400 text-sm mt-1">Designed & Coded with HTML/JavaScript for Graduate School Applications.</p>
            </div>
            <div class="flex space-x-6 text-xl text-slate-400">
                <a href="https://github.com/yourusername" target="_blank" class="hover:text-white transition-colors"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" class="hover:text-white transition-colors"><i class="fab fa-linkedin"></i></a>
                <a href="mailto:your.email@example.com" class="hover:text-white transition-colors"><i class="fas fa-envelope"></i></a>
            </div>
        </div>
    </footer>

    <!-- Case Study Modal Example (Project 1) -->
    <div id="modal-project-1" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
            <button onclick="closeModal('modal-project-1')" class="absolute top-6 right-6 text-slate-400 hover:text-slate-700 text-xl">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="mb-6">
                <span class="text-xs font-bold text-blue-600 uppercase tracking-wider">UX Case Study Writeup</span>
                <h2 class="font-heading text-3xl font-bold text-slate-900 mt-1">Accessibility in Micro-Mobility</h2>
            </div>

            <div class="prose max-w-none text-slate-600 space-y-6">
                <div>
                    <h3 class="text-lg font-bold text-slate-900">1. Problem Statement</h3>
                    <p class="text-sm leading-relaxed mt-1">Shared scooter and bike apps often fail to accommodate users with visual impairments, leading to unsafe navigation and high cognitive friction during rental unlocked phases.</p>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-slate-900">2. Research & Insights</h3>
                    <p class="text-sm leading-relaxed mt-1">We conducted 12 interviews and shadow sessions. 75% of participants reported difficulty locating parked vehicles using low-contrast map interfaces.</p>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-slate-900">3. Iteration & Solution</h3>
                    <p class="text-sm leading-relaxed mt-1">Designed high-contrast maps paired with auditory feedback & directional haptics. Tested 3 prototypes using Figma and VoiceOver.</p>
                </div>
            </div>

            <div class="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                <button onclick="closeModal('modal-project-1')" class="px-5 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg">Close Case Study</button>
            </div>
        </div>
    </div>

    <!-- JavaScript Logic -->
    <script>
        // Category Filtering Logic
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-slate-900', 'text-white', 'active');
                    b.classList.add('bg-slate-100', 'text-slate-600');
                });
                btn.classList.add('bg-slate-900', 'text-white', 'active');
                btn.classList.remove('bg-slate-100', 'text-slate-600');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Modal Functionality
        function openModal(modalId) {
            document.getElementById(modalId).classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    </script>
</body>
</html>