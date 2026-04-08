// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background blur on scroll
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL FOR STUDY CARDS =====
document.querySelectorAll('.study-card').forEach(card => {
    const exploreBtn = card.querySelector('.explore-btn');
    
    exploreBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = card.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    card.addEventListener('click', () => {
        const targetId = card.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== EXPANDABLE WORK CATEGORIES =====
document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
        const categoryItem = header.parentElement;
        const categoryId = header.getAttribute('data-category');
        const content = document.getElementById(categoryId);
        
        // Toggle current category
        categoryItem.classList.toggle('active');
        
        // Close other categories (optional - remove if you want multiple open)
        document.querySelectorAll('.category-item').forEach(item => {
            if (item !== categoryItem) {
                item.classList.remove('active');
            }
        });
    });
});

// ===== QUIZ DATA =====
const quizQuestions = [
    {
        question: "Which renewable energy source is currently the largest contributor to global electricity generation?",
        options: ["Solar Power", "Wind Energy", "Hydropower", "Geothermal Energy"],
        correct: 2,
        explanation: "Hydropower is currently the largest source of renewable electricity globally, accounting for about 15% of total electricity generation."
    },
    {
        question: "What is the main component in a photovoltaic solar cell that converts sunlight into electricity?",
        options: ["Silicon", "Copper", "Aluminum", "Iron"],
        correct: 0,
        explanation: "Silicon is the semiconductor material most commonly used in photovoltaic cells to convert sunlight into electricity."
    },
    {
        question: "Which country leads the world in installed solar capacity?",
        options: ["United States", "Germany", "China", "India"],
        correct: 2,
        explanation: "China leads the world in installed solar capacity with over 300 GW, significantly ahead of other countries."
    },
    {
        question: "What does CSP stand for in renewable energy technology?",
        options: ["Concentrated Solar Power", "Compact Solar Panels", "Continuous Solar Production", "Concentrated Solar Panels"],
        correct: 0,
        explanation: "CSP stands for Concentrated Solar Power, which uses mirrors or lenses to concentrate sunlight to generate heat and electricity."
    },
    {
        question: "Which factor primarily determines the power output of a wind turbine?",
        options: ["Blade color", "Wind speed", "Turbine height only", "Number of blades"],
        correct: 1,
        explanation: "Wind speed is the primary factor, as power output is proportional to the cube of wind speed (P ∝ v³)."
    },
    {
        question: "What is the purpose of a charge controller in a solar PV system?",
        options: ["To increase voltage", "To prevent battery overcharging", "To convert DC to AC", "To store energy"],
        correct: 1,
        explanation: "A charge controller regulates the voltage and current from solar panels to prevent battery overcharging and damage."
    },
    {
        question: "Which greenhouse gas is primarily targeted for reduction through renewable energy adoption?",
        options: ["Methane", "Carbon Dioxide (CO₂)", "Nitrous Oxide", "Ozone"],
        correct: 1,
        explanation: "CO₂ is the primary greenhouse gas targeted, as burning fossil fuels for energy is the largest source of CO₂ emissions."
    },
    {
        question: "What is 'grid parity' in the context of renewable energy?",
        options: ["When renewable energy costs equal conventional energy costs", "When all homes are connected to the grid", "When the grid produces maximum power", "When energy storage matches grid demand"],
        correct: 0,
        explanation: "Grid parity occurs when the cost of renewable energy equals or becomes cheaper than electricity from the conventional grid."
    },
    {
        question: "Which energy storage technology is most commonly paired with renewable energy systems?",
        options: ["Flywheel storage", "Pumped hydro storage", "Lithium-ion batteries", "Compressed air energy storage"],
        correct: 2,
        explanation: "Lithium-ion batteries are the most commonly used storage technology for renewable energy systems due to their efficiency and scalability."
    },
    {
        question: "What is the approximate efficiency range of modern commercial solar panels?",
        options: ["5-10%", "15-22%", "40-50%", "70-80%"],
        correct: 1,
        explanation: "Modern commercial solar panels typically have efficiencies between 15-22%, with premium panels reaching up to 23%."
    }
];

// ===== QUIZ STATE =====
let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// ===== QUIZ FUNCTIONS =====
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('current-q').textContent = currentQuestion + 1;
    
    // Show question
    document.getElementById('question-text').textContent = question.question;
    
    // Create options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Hide feedback
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Show correct/incorrect
    if (selectedIndex === question.correct) {
        score++;
        options[selectedIndex].classList.add('correct');
        document.getElementById('feedback-icon').textContent = '✅';
        document.getElementById('feedback-text').textContent = `Correct! ${question.explanation}`;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        document.getElementById('feedback-icon').textContent = '❌';
        document.getElementById('feedback-text').textContent = `Incorrect. ${question.explanation}`;
    }
    
    // Show feedback
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-feedback').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    document.getElementById('final-score').textContent = score;
    
    const percentage = (score / quizQuestions.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '🌟 Perfect score! You are a renewable energy expert!';
    } else if (percentage >= 80) {
        message = '🎉 Excellent! You have great knowledge of renewable energy!';
    } else if (percentage >= 60) {
        message = '👍 Good job! You know quite a bit about renewable energy.';
    } else if (percentage >= 40) {
        message = '📚 Not bad! Keep learning about renewable energy.';
    } else {
        message = '🌱 Keep exploring! There is so much to learn about renewable energy.';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    startQuiz();
}

// ===== CONTACT FORM =====
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    
    // Show success message (in a real app, you would send this to a server)
    alert(`Thank you, ${name}! Your message has been received. I will get back to you soon.`);
    
    // Reset form
    e.target.reset();
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.study-card, .value-card, .work-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add revealed class style
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (quizStarted && e.key === 'Enter') {
        const feedbackVisible = document.getElementById('quiz-feedback').style.display === 'block';
        if (feedbackVisible && currentQuestion < quizQuestions.length) {
            nextQuestion();
        }
    }
});

console.log('🌱 REM Portfolio loaded successfully!');
