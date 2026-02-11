// --- Δεδομένα Μαθημάτων ---
const data = [
    {
        id: 1,
        title: "Ανατομία III",
        icon: "fa-skull",
        chapters: [
            { id: 101, title: "Κεφάλαιο 1: Εισαγωγή", content: { theory: "Θεωρία Ανατομίας...", notes: "Σημειώσεις...", quiz: "Quiz..." } },
            { id: 102, title: "Κεφάλαιο 2: Νευρικό Σύστημα", content: { theory: "...", notes: "...", quiz: "..." } }
        ]
    },
    {
        id: 2,
        title: "Εμβρυολογία",
        icon: "fa-baby",
        chapters: [
            { id: 201, title: "Κεφάλαιο 1: Γονιμοποίηση", content: { theory: "...", notes: "...", quiz: "..." } },
            { id: 202, title: "Κεφάλαιο 2: Ανάπτυξη", content: { theory: "...", notes: "...", quiz: "..." } }
        ]
    },
    { id: 3, title: "Ιατρική Γενετική", icon: "fa-dna", chapters: [] },
    { id: 4, title: "Οδοντική Χειρουργική II", icon: "fa-tooth", chapters: [] },
    { id: 5, title: "Προκλινική Ενδοδοντία I", icon: "fa-notes-medical", chapters: [] },
    { id: 6, title: "Ακτινολογία Στόματος I", icon: "fa-x-ray", chapters: [] },
    { id: 7, title: "Προληπτική Οδοντιατρική", icon: "fa-shield-virus", chapters: [] },
];

// --- Logic ---
const app = document.getElementById('app');
const breadcrumb = document.getElementById('breadcrumb');

// 1. Αρχική Οθόνη (Λίστα Μαθημάτων)
function renderSubjects() {
    breadcrumb.innerText = "4ο Εξάμηνο";
    app.innerHTML = `<div class="grid-container fade-in">
        ${data.map(subject => `
            <div class="card" onclick="openSubject(${subject.id})">
                <i class="fas ${subject.icon} card-icon"></i>
                <h3>${subject.title}</h3>
                <p>${subject.chapters.length || 2} Κεφάλαια</p>
            </div>
        `).join('')}
    </div>`;
}

// 2. Οθόνη Κεφαλαίων
function openSubject(id) {
    const subject = data.find(s => s.id === id);
    // Αν δεν έχει κεφάλαια, βάλε 2 dummy για το παράδειγμα
    if (subject.chapters.length === 0) {
        subject.chapters = [
            { id: 991, title: "Κεφάλαιο 1: Βασικές Αρχές", content: { theory: "", notes: "", quiz: "" } },
            { id: 992, title: "Κεφάλαιο 2: Προχωρημένα", content: { theory: "", notes: "", quiz: "" } }
        ];
    }

    breadcrumb.innerText = `4ο Εξάμηνο > ${subject.title}`;
    
    app.innerHTML = `
        <button class="back-btn" onclick="renderSubjects()">
            <i class="fas fa-arrow-left"></i> Πίσω στα Μαθήματα
        </button>
        <div class="grid-container fade-in">
            ${subject.chapters.map(chapter => `
                <div class="card" onclick="openChapter(${subject.id}, ${chapter.id})">
                    <i class="fas fa-book-open card-icon"></i>
                    <h3>${chapter.title}</h3>
                    <p>Πάτησε για μελέτη</p>
                </div>
            `).join('')}
        </div>
    `;
}

// 3. Οθόνη Περιεχομένου (Θεωρία/Σημειώσεις/Quiz)
function openChapter(subId, chapId) {
    const subject = data.find(s => s.id === subId);
    const chapter = subject.chapters.find(c => c.id === chapId);
    
    breadcrumb.innerText = `${subject.title} > ${chapter.title}`;

    app.innerHTML = `
        <button class="back-btn" onclick="openSubject(${subId})">
            <i class="fas fa-arrow-left"></i> Πίσω στα Κεφάλαια
        </button>
        <div class="fade-in">
            <h2 style="margin-bottom:20px">${chapter.title}</h2>
            <div class="tabs">
                <button class="tab-btn active" onclick="switchTab('theory')">Θεωρία</button>
                <button class="tab-btn" onclick="switchTab('notes')">Σημειώσεις</button>
                <button class="tab-btn" onclick="switchTab('quiz')">Quiz</button>
            </div>
            <div class="content-area" id="tab-content">
                <p>Εδώ είναι το κείμενο της <strong>Θεωρίας</strong> για το ${chapter.title}...</p>
                <br>
                <p>Μπορείς να γράψεις όσο κείμενο θέλεις.</p>
            </div>
        </div>
    `;
}

function switchTab(type) {
    // Απλή λογική για αλλαγή tab (μπορείς να την εμπλουτίσεις με το πραγματικό περιεχόμενο από το data)
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    const contentBox = document.getElementById('tab-content');
    if(type === 'theory') contentBox.innerHTML = "<p>Περιεχόμενο Θεωρίας...</p>";
    if(type === 'notes') contentBox.innerHTML = "<p>Οι προσωπικές σου σημειώσεις...</p>";
    if(type === 'quiz') contentBox.innerHTML = "<p>Ώρα για Quiz! (Εδώ μπορείς να βάλεις φόρμα ερωτήσεων)</p>";
}

// --- Dark Mode Logic ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Εκκίνηση
renderSubjects();
