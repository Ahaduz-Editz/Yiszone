// Sidebar and hamburger elements
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const closeBtn = document.getElementById('close-btn');
const overlay = document.getElementById('overlay');

// Toggle Sidebar
function toggleNav() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Close Sidebar
function closeNav() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Event Listeners
hamburger.addEventListener('click', toggleNav);
closeBtn.addEventListener('click', closeNav);
overlay.addEventListener('click', closeNav);

document.querySelectorAll('.toggle-icon').forEach(icon => {
    icon.addEventListener('click', function () {
        const card = this.closest('.confession-card');
        card.classList.toggle('maximized');
        card.classList.toggle('minimized');

        if (card.classList.contains('maximized')) {
            this.classList.replace('bx-plus', 'bx-x'); 
        } else {
            this.classList.replace('bx-x', 'bx-plus'); 
        }
    });
});
document.querySelectorAll('.toggle-icon').forEach(icon => {
    icon.addEventListener('click', function () {
        const card = this.closest('.rumor-card');
        card.classList.toggle('maximized');
        card.classList.toggle('minimized');

        if (card.classList.contains('maximized')) {
            this.classList.replace('bx-plus', 'bx-x'); 
        } else {
            this.classList.replace('bx-x', 'bx-plus'); 
        }
    });
});





  
  