/* =============================================
   BRUNA GRACIELE — Portfolio 2026 | script.js
============================================= */


// ——— Hamburger / Mobile Menu ———
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    }
});


// ——— Navbar scroll effect ———
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


// ——— Active nav link on scroll ———
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();


// ——— Typing Effect ———
const typingEl = document.getElementById('typingText');
const words = ['Desenvolvedora Full Stack', 'Python Developer', 'Análise de Dados', 'Node.js Dev', 'Front-end Creator', 'Database Engineer'];
let wIdx = 0, cIdx = 0, deleting = false, speed = 150;

function type() {
    const word = words[wIdx];
    if (deleting) {
        typingEl.textContent = word.substring(0, cIdx - 1);
        cIdx--;
        speed = 60;
    } else {
        typingEl.textContent = word.substring(0, cIdx + 1);
        cIdx++;
        speed = 120;
    }
    if (!deleting && cIdx === word.length) { deleting = true; speed = 2200; }
    else if (deleting && cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; speed = 400; }
    setTimeout(type, speed);
}
setTimeout(type, 800);


// ——— Smooth scroll ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 75, behavior: 'smooth' });
        }
    });
});


// ——— Reveal on scroll ———
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delay based on siblings
            const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 0.08}s`;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


// ——— Counter Animation ———
const counters = document.querySelectorAll('.stat-num[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(interval); }
                el.textContent = current;
            }, 40);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));


// ——— Video Play/Pause ———
document.querySelectorAll('.project-card').forEach(card => {
    const video = card.querySelector('video');
    const playBtn = card.querySelector('.play-btn');
    const iconPlay = playBtn?.querySelector('.icon-play');
    const iconPause = playBtn?.querySelector('.icon-pause');
    if (!video || !playBtn) return;

    let pinned = false;

    function setPlaying(playing) {
        if (playing) {
            video.play().catch(() => {});
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
        } else {
            video.pause();
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    }

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pinned = !pinned;
        setPlaying(pinned);
    });

    card.addEventListener('mouseenter', () => {
        if (!pinned) setPlaying(true);
    });

    card.addEventListener('mouseleave', () => {
        if (!pinned) {
            setPlaying(false);
            video.currentTime = 0;
        }
    });

    video.addEventListener('ended', () => {
        pinned = false;
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
    });
});


// ——— Parallax on Hero ———
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroText = document.querySelector('.hero-text');
            const heroVisual = document.querySelector('.hero-visual');
            if (heroText && scrolled < window.innerHeight) {
                heroText.style.transform = `translateY(${scrolled * 0.12}px)`;
                heroVisual.style.transform = `translateY(${scrolled * 0.06}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });