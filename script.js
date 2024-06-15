document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('mode-toggle');
    toggleButton.addEventListener('click', function() {
        const body = document.body;
        const currentMode = body.classList.contains('light-mode') ? 'light' : 'dark';

        if (currentMode === 'light') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            this.textContent = 'Light Mode';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            this.textContent = 'Dark Mode';
        }
    });
});
