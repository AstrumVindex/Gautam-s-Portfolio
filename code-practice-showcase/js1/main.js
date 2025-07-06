import { addCodeExample, getAllExamples, getExamplesByLanguage, saveToFile } from '../data/code-examples.js';

// Initialize the app
function init() {
    checkAuth();
    updateCodeDisplay();
    
    // Load any saved examples from localStorage
    const savedExamples = localStorage.getItem('codeExamples');
    if (savedExamples) {
        const examples = JSON.parse(savedExamples);
        examples.forEach(example => addCodeExample(example));
        updateCodeDisplay();
    }
}

// Update the code display based on current tab
function updateCodeDisplay() {
    const activeTab = document.querySelector('.content-section.active').id;
    
    // Filter examples based on active tab
    let filteredExamples = [];
    if (activeTab === 'all') {
        filteredExamples = getAllExamples();
    } else {
        filteredExamples = getExamplesByLanguage(activeTab);
    }
    
    // Get the grid element for the active tab
    const gridId = `${activeTab}-grid`;
    const gridElement = document.getElementById(gridId);
    
    // Clear the grid
    gridElement.innerHTML = '';
    
    // Add examples to the grid
    if (filteredExamples.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        
        const heading = document.createElement('h3');
        heading.textContent = activeTab === 'all' ? 
            'No code examples yet' : 
            `No ${getLanguageName(activeTab)} examples yet`;
            
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Click the + button to add your first example!';
        
        emptyState.appendChild(heading);
        emptyState.appendChild(paragraph);
        gridElement.appendChild(emptyState);
    } else {
        filteredExamples.forEach(example => {
            const card = createCodeCard(example);
            gridElement.appendChild(card);
        });
    }
}

// Helper function to get language name
function getLanguageName(langKey) {
    const languages = {
        'html': 'HTML/CSS',
        'javascript': 'JavaScript',
        'c': 'C Programming'
    };
    return languages[langKey] || langKey;
}

// Create a code card element
function createCodeCard(example) {
    const card = document.createElement('div');
    card.className = 'code-card';
    
    const languageTag = document.createElement('span');
    languageTag.className = 'language-tag';
    languageTag.textContent = getLanguageName(example.language);
    
    const title = document.createElement('h3');
    title.className = 'code-title';
    title.textContent = example.title;
    
    const codeBlock = document.createElement('pre');
    codeBlock.className = 'code-block';
    codeBlock.textContent = example.code;
    
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = example.description;
    
    card.appendChild(languageTag);
    card.appendChild(title);
    card.appendChild(codeBlock);
    card.appendChild(description);
    
    return card;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally
window.updateCodeDisplay = updateCodeDisplay;