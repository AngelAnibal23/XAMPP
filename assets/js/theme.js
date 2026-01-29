// ========== APLICAR TEMA INMEDIATAMENTE (ANTES DE QUE CARGUE EL DOM) ==========
(function () {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    if (savedTheme === 'dark') {
        html.classList.add('dark-mode');
        if (document.body) {
            document.body.classList.add('dark-mode');
        }
    } else {
        html.classList.remove('dark-mode');
        if (document.body) {
            document.body.classList.remove('dark-mode');
        }
    }
})();

// ========== FUNCIONES DE TEMA ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const html = document.documentElement;

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        html.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        html.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

function toggleTheme() {
    const body = document.body;
    const html = document.documentElement;
    const isDark = body.classList.toggle('dark-mode');

    html.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    updateThemeIcon(isDark);
    setTimeout(updateChartsTheme, 100); // charts.js
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.title = isDark
            ? 'Cambiar a modo claro'
            : 'Cambiar a modo oscuro';
    }
}

// ========== DEBUG ==========
function checkThemeStatus() {
    console.log('Theme:', localStorage.getItem('theme'));
    console.log('Body dark:', document.body.classList.contains('dark-mode'));
    console.log('HTML dark:', document.documentElement.classList.contains('dark-mode'));
}

window.checkThemeStatus = checkThemeStatus;
