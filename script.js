document.addEventListener('DOMContentLoaded', () => {
    // Gestion du thème
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Charge le thème sauvegardé ou utilise la préférence système
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-toggle i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    initTheme();

    // Animation des éléments au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-fadeInUp, .animate-slideInLeft, .animate-slideInRight, .project-card, .language-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    // Animation des barres de progression des compétences
    const animateSkills = () => {
        const skills = document.querySelectorAll('.skill-card');
        skills.forEach((skill, index) => {
            setTimeout(() => {
                const progress = skill.querySelector('.progress');
                if (progress) {
                    progress.style.width = progress.style.width;
                }
            }, index * 200);
        });
    };

    // Animation des statistiques
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-item');
        
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add('visible');
                
                const counter = stat.querySelector('h3');
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / 50;
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.floor(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCount();
            }, index * 200);
        });
    };

    // Animation des projets
    const animateProjects = () => {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
            setTimeout(() => {
                project.classList.add('visible');
            }, index * 200);
        });
    };

    // Animation des cartes de langue
    const animateLanguages = () => {
        const languages = document.querySelectorAll('.language-card');
        languages.forEach((lang, index) => {
            setTimeout(() => {
                lang.classList.add('visible');
            }, index * 200);
        });
    };

    // Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                } else if (entry.target.classList.contains('stats')) {
                    animateStats();
                } else if (entry.target.classList.contains('projects')) {
                    animateProjects();
                } else if (entry.target.classList.contains('languages')) {
                    animateLanguages();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observer les sections pour les animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Navigation smooth scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialiser les animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
