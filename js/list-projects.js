document.addEventListener("DOMContentLoaded", () => {
  const projectsList = document.getElementById("projects-list");
  if (!projectsList) return;

  // Fetch the projects JSON (relative to the HTML page)
  fetch("js/projects.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load projects.json");
      return response.json();
    })
    .then((data) => {
      const projects = data.projects || [];
      projects.forEach((project) => {
        const projectItem = document.createElement("div");
        projectItem.className = "project-item flex";
        projectItem.innerHTML = `
          <img
            src="${project.image || "assets/jellyfish.png"}"
            alt="Project Preview"
            class="mb-4 h-50 w-100 object-cover mr-6"
          />
          <div class="flex flex-col justify-between">
            <h3>${project.title || "Project Name"}</h3>
            <p class="italic">${
              project.description || "Description of the project goes here."
            }</p>
            <div class="flex">
              ${(project.tags || [])
                .map((tag) => `<div class="tag">${tag}</div>`)
                .join("")}
            </div>
            <div class="flex gap-4">
              ${
                project.demoLink
                  ? `<a href="${project.demoLink}" target="_blank" class="project-link">Live Demo</a>`
                  : ""
              }
              ${
                project.repoLink
                  ? `<a href="${project.repoLink}" target="_blank" class="project-link">GitHub</a>`
                  : ""
              }
            </div>
          </div>`;
        projectsList.appendChild(projectItem);
      });
    })
    .catch((err) => {
      console.error("Error loading projects:", err);
    });
});
