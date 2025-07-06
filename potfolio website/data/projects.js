// Project data structure
let projects = [];

// Load projects from localStorage
export function loadFromStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    }
}

// Save projects to localStorage
function saveToStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Add a new project
export function addProject(project) {
    // Generate a unique ID
    project.id = Date.now().toString();
    
    // Add timestamp
    project.createdAt = new Date().toISOString();
    
    // Add to projects array
    projects.push(project);
    
    // Save to localStorage
    saveToStorage();
    
    return project;
}

// Get all projects
export function getAllProjects() {
    return [...projects];
}

// Get projects by category
export function getProjectsByCategory(category) {
    return projects.filter(project => project.category === category);
}

// Get a specific project by ID
export function getProjectById(id) {
    return projects.find(project => project.id === id);
}

// Update a project
export function updateProject(id, updates) {
    const index = projects.findIndex(project => project.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updates };
        saveToStorage();
        return projects[index];
    }
    return null;
}

// Delete a project
export function deleteProject(id) {
    const index = projects.findIndex(project => project.id === id);
    if (index !== -1) {
        projects.splice(index, 1);
        saveToStorage();
        return true;
    }
    return false;
}

// Check if a project is public
export function isProjectPublic(id) {
    const project = getProjectById(id);
    return project ? project.isPublic : false;
}

// Verify project password
export function verifyProjectPassword(id, password) {
    const project = getProjectById(id);
    return project && project.password === password;
} 