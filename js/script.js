document.addEventListener("DOMContentLoaded", () => {    /* Code for everything Project*/
    alert("Welcome to my portfolio! Please note that this is a work in progress, and some features may not be fully functional yet. Thank you for your understanding and patience as I continue to improve the site.");

    const projectGrid = document.getElementById("project-grid");
    const filterButtons = document.getElementById("filter-buttons");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-button");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const modal = document.getElementById("project-modal");
    const modalBody = document.getElementById("modal-body");
    const closeModal = document.getElementById("close-modal");

    let allProjects = [];
    let filteredWork = [];
    let projectCount = 10;
    const currentCategory = "All";

    // Fetch Project from Memory / database
    fetch("./api/projects.json")
        .then(response => response.json())
        .then(projects => {
            allProjects = projects;
            // Display projects on the page first
            displayProjects(projects)

            // Get unique categories, technologies and tags for filtering
            const workType = [...new Set(projects.map(project => project.workType))];
            const categories = [...new Set(projects.flatMap(project => project.category))];

            // Merge categories and tags for filter buttons
            const filters = ["All", ...new Set([...workType, ...categories])];
            // Create filter buttons and add event listeners
            filterProjectsButtons(filters, projects);
        })
        .catch(error => console.error("Error fetching projects:", error));


    // Button on-click load more project card
    loadMoreBtn.addEventListener("click", () => {
        projectCount += 10;
        displayProjects(allProjects);
    })

    // Function to display projects on the page
    function displayProjects(projects){
        if(projects.length === 0) {
            projectGrid.innerHTML = `
                <div class="empty-state">
                    No projects found.
                </div>
            `;

            loadMoreBtn.style.display = "none";
            return;
        }

        const projectPagination = projects.slice(0, projectCount);

        projectGrid.innerHTML = projectPagination.map(project => `
            <div class="project-card">
                <img loading="lazy" src="${project.images[0]}" alt="${project.title} project screenshot">

                <div class="info">
                    <span class="category"><small>${project.category}</small></span>
                    <span class="title">${project.title}</span>
                </div>

                <div class="overlay">
                    <a href="${project.liveLink}" class="visit-link" title="Project link" target="_blank" rel="noopener noreferrer">
                        <svg fill="#0c141a" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 405.24 405.24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M249.037,330.626H28.283V86.909h335.623v181.629l28.283,28.283V26.195c0-12.996-10.573-23.569-23.568-23.569H23.568 C10.573,2.626,0,13.199,0,26.195v309.146c0,12.995,10.573,23.568,23.568,23.568h238.911 C249.37,340.274,249.037,330.626,249.037,330.626z M338.026,42.202c0-4.806,3.896-8.702,8.702-8.702h8.701 c4.807,0,8.702,3.896,8.702,8.702v9.863c0,4.806-3.896,8.702-8.702,8.702h-8.701c-4.808,0-8.702-3.896-8.702-8.702V42.202z M297.561,42.202c0-4.806,3.896-8.702,8.701-8.702h8.703c4.808,0,8.702,3.896,8.702,8.702v9.863c0,4.806-3.896,8.702-8.702,8.702 h-8.703c-4.806,0-8.701-3.896-8.701-8.702V42.202z M257.095,42.202c0-4.806,3.897-8.702,8.702-8.702h8.702 c4.807,0,8.703,3.896,8.703,8.702v9.863c0,4.806-3.896,8.702-8.703,8.702h-8.702c-4.805,0-8.702-3.896-8.702-8.702V42.202z"></path> <path d="M392.606,322.19l-41.165-41.166c-9.292-9.291-21.797-13.446-33.972-12.487c0.958-12.175-3.196-24.679-12.487-33.972 l-41.165-41.165c-16.848-16.846-44.256-16.845-61.103,0l-6.689,6.688c-16.846,16.845-16.846,44.255,0,61.102l41.166,41.164 c9.293,9.293,21.797,13.446,33.971,12.489c-0.958,12.174,3.197,24.679,12.489,33.972l41.165,41.164 c16.845,16.846,44.255,16.846,61.101,0l6.688-6.688C409.452,366.445,409.452,339.035,392.606,322.19z M262.267,274.187 l17.062,17.063c-8.687,5.173-20.118,4.027-27.586-3.439l-41.166-41.166c-8.824-8.822-8.824-23.182,0-32.006l6.688-6.688 c8.823-8.824,23.182-8.824,32.004,0l41.166,41.165c7.47,7.469,8.613,18.898,3.439,27.587l-17.062-17.063 c-4.019-4.018-10.53-4.018-14.548,0C258.248,263.656,258.248,270.169,262.267,274.187z M378.058,368.743l-6.688,6.688 c-8.824,8.824-23.181,8.824-32.005,0.001L298.2,334.267c-7.468-7.469-8.614-18.898-3.44-27.586l17.063,17.062 c4.018,4.019,10.529,4.019,14.548,0c4.017-4.018,4.017-10.53,0-14.548l-17.063-17.063c8.688-5.174,20.118-4.027,27.589,3.44 l41.164,41.165C386.882,345.562,386.882,359.919,378.058,368.743z"></path> </g> </g> </g> </g></svg>
                    </a>

                    <button class="visit-link modal-btn" title="Project overview" data-id="${project.id}">
                        <svg fill="#000000" width="27px" height="27x" viewBox="0 0 24 24" id="page-break-2" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M20,5V8a1,1,0,0,1-1,1H5A1,1,0,0,1,4,8V4A2,2,0,0,1,6,2H17a1,1,0,0,1,.71.29l2,2A1,1,0,0,1,20,5ZM19,15H5a1,1,0,0,0-1,1v4a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V16A1,1,0,0,0,19,15Z" style="fill: #000000;"></path><path id="secondary" d="M21,13H17a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Zm-8,0H11a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2ZM7,13H3a1,1,0,0,1,0-2H7a1,1,0,0,1,0,2ZM17,4a1,1,0,0,0,1,1h2a1,1,0,0,0-.28-.71l-2-2A1,1,0,0,0,17,2Z" style="fill: #FFB400;"></path></g></svg>
                    </button>
                </div>
            </div>
        `).join("");

        loadMoreBtn.style.display = projectCount >= projects.length ? "none" : "inline-block";

        const cards = document.querySelectorAll(".project-card");
        // Add animation to the project cards when they are displayed
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show")
            }, index * 120);            
        });
    }


    // Function to search projects based on the search input
    searchInput.addEventListener("input", () => searchProjects());
    searchBtn.addEventListener("click", () => searchProjects());

    function searchProjects() {
        let query = searchInput.value.toLowerCase();
        filteredWork = allProjects;

        // By category
        if (currentCategory !== "All") {
            filteredWork = filteredWork.filter(project =>
            project.workType === currentCategory
            );
        }

        filteredWork = allProjects.filter(project =>
            project.title.toLowerCase().includes(query)
        );

        projectCount = 10; // Reset project count for pagination

        displayProjects(filteredWork);
    }


    // Function to create filter buttons and add event listeners for filtering projects
    function filterProjectsButtons(filters, projects) {
        filterButtons.innerHTML = filters.map(filter => `
            <button class="filter-btn" data-filter="${filter}">
                ${filter}
            </button>
        `).join("");

        const buttons = document.querySelectorAll(".filter-btn");

        // Make the first button (All) active by default
        buttons[0].classList.add("active");

        buttons.forEach(btn => {

            btn.addEventListener("click", () => {

                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                const currentCategory = btn.dataset.filter;

                if (currentCategory === "All"){
                    displayProjects(projects);
                } else {
                    const filtered = projects.filter(
                        project => project.workType === currentCategory || project.category.includes(currentCategory)
                    );
                    displayProjects(filtered);
                }
            });
        });
    }


    // Add animation to the filter buttons when clicked
    function animateFilter(projects, selected) {
        const projectCard = document.querySelectorAll(".project-card");

        projectCard.forEach(card => {
            card.classList.remove("show");
            card.classList.add("hide");
        });

        setTimeout(() => {
            let filteredProjects;

            if (selected === "All") {
                filteredProjects = projects;
            } else {
                filteredProjects = projects.filter(project => project.workType === selected || project.category.includes(selected));
            }
            displayProjects(filteredProjects);
        }, 550); // Duration of the animation
    }


    function openModal(projectId) {
        document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open

        // Find exact project
        const project = allProjects.find(p => p.id === projectId);

        if (!project) return;

        modalBody.innerHTML = `
            <div class="modal-image-container">

                <!-- TAGS -->
                <div class="project-tags">
                    ${project.category.map(t => `
                        <small class="stack-badge">
                            ${t}
                        </small>
                    `).join("")}
                </div>

                <!-- MAIN IMAGE (INDEX 0) -->
                <div class="project-main-image">
                    <h2>${project.title}</h2>

                    <img src="${project.images[0]}" class="modal-image">
                                
                    <div class="modal-links">
                        ${project.liveLink && project.liveLink.trim() !== "" 
                            ? `
                                <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">
                                    Live Demo
                                </a>
                            ` 
                            : ""
                    }
                    </div>
                </div>

                <!-- DESCRIPTION (JSON OBJECT) -->
                <div class="project-description">
                    <div class="desc-block">
                        <h4>Overview</h4>
                        <p>${project.description.overview}</p>
                    </div>
                    
                    <div class="desc-block">
                        ${project.description.challenge !== ""
                        ? `
                            <h4>Challenge</h4>
                            <p> ${project.description.challenge}</p>
                        `
                        : ""
                        }
                    </div>

                    <div class="desc-block">
                        ${project.description.solution !== ""
                        ? `
                            <h4>Solution</h4>
                            <p>${project.description.solution}</p>
                        `
                        : ""
                        }
                    </div>

                    <div class="desc-block">
                        ${project.description.result !== ""
                        ? `
                            <h4>Result</h4>
                            <p>${project.description.result}</p>
                        `
                        : ""
                        }
                    </div>
                </div>

                <!-- GALLERY IMAGES (INDEX 1 - END) -->
                <div class="project-gallery">
                    ${project.images && project.images.length > 1 
                        ? project.images.slice(1).map(img => `
                            <div class="gallery-image">
                                <img src="${img}" alt="${project.title} project screenshot" >
                            </div>
                        `).join("") 
                        : ""
                    }
                </div>

            </div>

            <div class="modal-content">
                    ---- here ----
                <div>
                    <h3>Project Info</h3>

                    <section>
                        <h6>Client</h6>
                        <p>${project.client}</p>
                    </section>

                    <section>
                        <h6>Category</h6>
                        <p>${project.category.map(item => `
                                <span class="tag-lists">
                                    ${item} 
                                </span>
                            `)}</p>
                    </section>

                    <section>
                        <h6>Type</h6>
                        <p>${project.workType}</p>
                    </section>

                    <section>
                        <h6>Website</h6>
                        <p>${project.liveLink}</p>
                    </section>
                </div>

                <div class="stack-list">
                    <h3>Technologies</h3>
                    ${project.stack.map(item => `
                
                    <span class="stack-badge">
                        ${item}
                    </span>

                    `).join("")}

                </div>

                <div class="related-projects">
                    <h3>Related Projects</h3>
                </div>

                <div class="contact-card">
                    <h3>Start a Project</h3>
                    <p>Do you have an ideal project you want to bring to life? Let's discuss it.</p>

                    <button>GET IN TOUCH</button>
                </div>
            </div>

        `;

        modal.classList.add("show");
    }

    // Close modal
    function closeProjectModal() {
        document.body.style.overflow = "auto"; // Restore background scrolling when modal is closed
        modal.classList.remove("show");
    }
    closeModal.addEventListener("click", closeProjectModal);

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    })

    document.addEventListener("click", (e) => {
        const button = e.target.closest(".modal-btn");

        if (!button) return;

        const projectId = Number(button.dataset.id);
        openModal(projectId);
    });

    // Light and dark mode
    const toggle = document.getElementById("toggle-theme");
    const lightTheme = document.getElementById("sun");
    const darkTheme = document.getElementById("moon");

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            lightTheme.style.display = "block";
            darkTheme.style.display = "none";
        }else{
            darkTheme.style.display = "block";
            lightTheme.style.display = "none";
        }
    });

});