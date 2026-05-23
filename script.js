// ========== Manhwa Data ========== 
// Ganti dengan cover image URL dan info manhwa yang sebenarnya
const manhwaData = [
    {
        id: 1,
        title: "Solo Leveling",
        genre: "action",
        description: "Seorang hunter lemah yang berubah menjadi kuat setelah mendapat kekuatan misterius.",
        cover: "https://via.placeholder.com/220x300?text=Solo+Leveling",
        link: "#"
    },
    {
        id: 2,
        title: "The Beginning After The End",
        genre: "fantasy",
        description: "Seorang raja legendaris terlahir kembali sebagai anak untuk memulai hidup baru.",
        cover: "https://via.placeholder.com/220x300?text=The+Beginning+After",
        link: "#"
    },
    {
        id: 3,
        title: "Lookism",
        genre: "action",
        description: "Seorang pemuda buruk rupa yang dapat mengubah penampilannya menjadi sangat tampan.",
        cover: "https://via.placeholder.com/220x300?text=Lookism",
        link: "#"
    },
    {
        id: 4,
        title: "True Beauty",
        genre: "romance",
        description: "Seorang gadis yang menggunakan makeup untuk menyembunyikan aib namun jatuh cinta.",
        cover: "https://via.placeholder.com/220x300?text=True+Beauty",
        link: "#"
    },
    {
        id: 5,
        title: "Omniscient Reader's Viewpoint",
        genre: "fantasy",
        description: "Pembaca setia dongeng dapat melihat realitas seperti cerita dan mengubahnya.",
        cover: "https://via.placeholder.com/220x300?text=Omniscient+Readers",
        link: "#"
    },
    {
        id: 6,
        title: "Eleceed",
        genre: "action",
        description: "Seekor kucing ajaib dengan kekuatan listrik bertemu seorang pemuda biasa.",
        cover: "https://via.placeholder.com/220x300?text=Eleceed",
        link: "#"
    },
    {
        id: 7,
        title: "My School President",
        genre: "romance",
        description: "Cerita manis tentang hubungan di sekolah dengan musik dan mimpi.",
        cover: "https://via.placeholder.com/220x300?text=My+School+President",
        link: "#"
    },
    {
        id: 8,
        title: "Mercenary Enrollment",
        genre: "action",
        description: "Prajurit bayaran yang pensiun dan kembali ke sekolah untuk hidup normal.",
        cover: "https://via.placeholder.com/220x300?text=Mercenary+Enrollment",
        link: "#"
    }
];

// ========== Render Manhwa Cards ========== 
function renderManhwa(filter = 'all') {
    const grid = document.getElementById('manhwaGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' 
        ? manhwaData 
        : manhwaData.filter(m => m.genre === filter);

    filtered.forEach(manhwa => {
        const card = document.createElement('div');
        card.className = 'manhwa-card';
        card.innerHTML = `
            <img src="${manhwa.cover}" alt="${manhwa.title}" class="manhwa-cover">
            <div class="manhwa-info">
                <h3 class="manhwa-title">${manhwa.title}</h3>
                <span class="manhwa-genre">${capitalizeFirst(manhwa.genre)}</span>
                <p class="manhwa-desc">${manhwa.description}</p>
                <button class="read-btn" onclick="readManhwa('${manhwa.title}')">Baca Sekarang</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ========== Filter Functionality ========== 
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Render filtered manhwa
        renderManhwa(this.getAttribute('data-filter'));
    });
});

// ========== Navigation Links Active State ========== 
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Close mobile menu if open
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// ========== Mobile Menu Toggle ========== 
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// ========== Contact Form Handler ========== 
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.');
    this.reset();
});

// ========== Read Manhwa Function ========== 
function readManhwa(title) {
    alert(`Buka: ${title}`);
    // Ganti dengan link ke halaman baca atau URL yang sesuai
}

// ========== Helper Functions ========== 
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ========== Initialize on Page Load ========== 
document.addEventListener('DOMContentLoaded', function() {
    renderManhwa('all');
});

// ========== Scroll Animation ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.manhwa-card').forEach(card => {
        observer.observe(card);
    });
});
