// Work projects data
const workProjects = [
    {
        year: "2025",
        title: "SportTriad",
        description: "Founding AI Engineer.",
        slug: "sporttriad",
        image: "work/sporttriad/images/dashboard-ss.png"
    },
    {
        year: "2024",
        title: "American Completion Tools",
        description: "Software Engineer + Product Designer",
        slug: "american-completion-tools",
        image: "work/american-completion-tools/images/dashboard-admin.png"
    },
    {
        year: "2024",
        title: "Vissionassist",
        description: "Vision assistance and accessibility platform.",
        slug: "vissionassist"
    },
    {
        year: "2024",
        title: "Marketise.ai",
        description: "Frontend Engineer + AI",
        slug: "marketise",
        image: "work/marketise/images/landing.png"
    },
    {
        year: "2024",
        title: "Scheduling Website",
        description: "Advanced scheduling and appointment management system.",
        slug: "scheduling"
    },
    {
        year: "2024",
        title: "Soccertact",
        description: "Product design | UI/UX",
        slug: "soccertact",
        image: "work/soccertact/images/portfolio-1.png"
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

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';

        // Create project content (left side)
        const projectContent = document.createElement('div');
        projectContent.className = 'project-content';

        // Year
        if (project.year) {
            const year = document.createElement('div');
            year.className = 'project-year';
            year.textContent = project.year;
            projectContent.appendChild(year);
        }

        // Title - now uses onclick to open project
        const title = document.createElement('a');
        title.href = '#';
        title.className = 'project-title';
        title.textContent = project.title;
        title.onclick = function(e) {
            e.preventDefault();
            openProject(project.slug);
        };
        projectContent.appendChild(title);

        // Description
        if (project.description) {
            const description = document.createElement('p');
            description.className = 'project-description';
            description.textContent = project.description;
            projectContent.appendChild(description);
        }

        // View button - now uses onclick to open project
        const button = document.createElement('a');
        button.href = '#';
        button.className = 'project-button';
        button.textContent = 'View';
        button.onclick = function(e) {
            e.preventDefault();
            openProject(project.slug);
        };
        projectContent.appendChild(button);

        // Create visual placeholder (right side - dark UI or image)
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
        projectItem.appendChild(projectContent);
        projectItem.appendChild(visualPlaceholder);
        container.appendChild(projectItem);
    });
}

// Scroll effect for hero text - bidirectional animation
function initHeroScrollEffect() {
    const heroWords = document.querySelectorAll('.hero-word');
    const header = document.querySelector('.header');
    
    if (!heroWords.length || !header) return;
    
    const viewportHeight = window.innerHeight;
    const totalWords = heroWords.length;
    
    // Animation completes at 2x viewport height (200vh) while section is 3x (300vh)
    const animationScrollRange = viewportHeight * 2;
    
    function updateWordOpacity() {
        const scrollY = window.scrollY;
        
        // Normalize scroll progress (0 to 1) over 3x viewport height
        const scrollProgress = Math.max(0, Math.min(1, scrollY / animationScrollRange));
        
        // Calculate how many words should be fully visible based on scroll progress
        const wordsToShow = Math.floor(scrollProgress * totalWords);
        
        // Update word opacities - works both ways (scroll up and down)
        heroWords.forEach((word, index) => {
            if (index < wordsToShow) {
                // Words before the current position: fully visible
                word.style.opacity = '1';
                word.classList.add('fade-in');
            } else if (index === wordsToShow && scrollProgress > 0) {
                // Current word: smooth transition from 35% to 100%
                const partialProgress = (scrollProgress * totalWords) - wordsToShow;
                const opacity = Math.max(0.35, 0.35 + (partialProgress * 0.65));
                word.style.opacity = opacity.toString();
                if (opacity >= 1) {
                    word.classList.add('fade-in');
                } else {
                    word.classList.remove('fade-in');
                }
            } else {
                // Words after: at 35% opacity
                word.style.opacity = '0.35';
                word.classList.remove('fade-in');
            }
        });
    }
    
    // Initial state - all words at 35% opacity
    heroWords.forEach(word => {
        word.style.opacity = '0.35';
    });
    
    // Handle scroll events - smooth bidirectional animation
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateWordOpacity();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial call
    updateWordOpacity();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(workProjects, 'work-projects');
    initHeroScrollEffect();
});
