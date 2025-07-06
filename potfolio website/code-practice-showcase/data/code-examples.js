// Default code examples
const defaultExamples = [
    {
        id: 1,
        title: "Hello World in Python",
        language: "python",
        code: "print('Hello, World!')",
        description: "A simple Python program that prints 'Hello, World!'"
    },
    {
        id: 2,
        title: "Basic HTML Structure",
        language: "html",
        code: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>",
        description: "Basic HTML document structure"
    }
];

// Code examples storage
let codeExamples = [...defaultExamples];

// Function to add a new example
function addCodeExample(example) {
    // Generate a unique ID
    example.id = Date.now();
    codeExamples.push(example);
    saveToLocalStorage();
    return example;
}

// Function to get all examples
function getAllExamples() {
    // Load from localStorage if available
    loadFromLocalStorage();
    return codeExamples;
}

// Function to get examples by language
function getExamplesByLanguage(language) {
    loadFromLocalStorage();
    return codeExamples.filter(example => example.language === language);
}

// Function to save examples to localStorage
function saveToLocalStorage() {
    localStorage.setItem('codeExamples', JSON.stringify(codeExamples));
}

// Function to load examples from localStorage
function loadFromLocalStorage() {
    const savedExamples = localStorage.getItem('codeExamples');
    if (savedExamples) {
        // Merge saved examples with defaults, avoiding duplicates
        const saved = JSON.parse(savedExamples);
        const defaultIds = defaultExamples.map(ex => ex.id);
        const uniqueSaved = saved.filter(ex => !defaultIds.includes(ex.id));
        codeExamples = [...defaultExamples, ...uniqueSaved];
    }
}

// Initialize by loading from localStorage
loadFromLocalStorage();

// Export functions
export { addCodeExample, getAllExamples, getExamplesByLanguage, saveToLocalStorage };
