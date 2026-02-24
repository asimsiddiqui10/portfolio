// Work/experience projects data (first 6 = grid slots)
const workProjects = [
    {
        year: "2024",
        title: "ACT",
        description: "Software Engineer + Product Designer",
        slug: "american-completion-tools",
        image: "work/american-completion-tools/images/ACT.jpg"
    },
    {
        year: "2024",
        title: "Soccertact",
        description: "Product design | UI/UX",
        slug: "soccertact",
        image: "work/soccertact/images/Soccertact.jpg"
    },
    {
        year: "2025",
        title: "Triad",
        description: "Founding AI Engineer — product.",
        slug: "triad",
        image: "work/triad/images/Triad.jpg"
    },
    {
        year: "2025",
        title: "Sporttriad",
        description: "Co-founding team — company.",
        slug: "sporttriad",
        image: "work/sporttriad/images/Sporttriad.jpg"
    },
    {
        year: "2024",
        title: "marketise.ai",
        description: "Frontend Engineer + AI",
        slug: "marketise",
        image: "work/marketise/images/landing.png"
    },
    {
        year: "2024",
        title: "Vissionassist",
        description: "Vision assistance and accessibility platform.",
        slug: "vissionassist"
    },
    {
        year: "2024",
        title: "Scheduling Website",
        description: "Advanced scheduling and appointment management system.",
        slug: "scheduling"
    }
];

// Function to open a project detail view
function openProject(slug) {
    // Hide main content
    document.getElementById('main-content').style.display = 'none';
    
    // Show project detail view
    const detailView = document.getElementById('project-detail-view');
    detailView.style.display = 'block';
    
    // Hide all project containers first
    const allProjects = detailView.querySelectorAll('.project-detail-container');
    allProjects.forEach(project => {
        project.style.display = 'none';
    });
    
    // Show the selected project
    const selectedProject = document.getElementById('project-' + slug);
    if (selectedProject) {
        selectedProject.style.display = 'block';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Function to close project and return to main view
function closeProject() {
    // Hide project detail view
    document.getElementById('project-detail-view').style.display = 'none';
    
    // Show main content
    document.getElementById('main-content').style.display = 'block';
    
    // Scroll to work section
    const workSection = document.getElementById('work');
    if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function to render projects
function renderProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Use only the first four projects for the experiences grid (hide the bottom two)
    projects.slice(0, 4).forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';

        // Entire card opens the project detail
        projectItem.onclick = function () {
            openProject(project.slug);
        };

        // Visual area
        const visualPlaceholder = document.createElement('div');
        visualPlaceholder.className = 'project-visual';
        
        // If project has an image, use it instead of placeholder
        if (project.image) {
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.title;
            img.className = 'project-visual-image';
            visualPlaceholder.appendChild(img);
        }

        // Append to project item
        projectItem.appendChild(visualPlaceholder);
        container.appendChild(projectItem);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(workProjects, 'work-projects');
});
