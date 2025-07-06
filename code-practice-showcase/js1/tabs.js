// Function to show selected tab
function showTab(tabName) {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Add active class to clicked tab and corresponding section
    document.querySelector(`.tab-btn[onclick="showTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    // Update the grid display for the active tab
    updateCodeDisplay();
}

// Make showTab available globally
window.showTab = showTab;