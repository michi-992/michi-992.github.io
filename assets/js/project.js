document.addEventListener('DOMContentLoaded', () => {
    const projectData = JSON.parse(localStorage.getItem('selectedProject'));

    if (projectData) {
        document.getElementById('project-title').textContent = projectData.ProjectTitle;
        document.getElementById('project-type').textContent = projectData.Type;
        document.getElementById('project-summary').textContent = projectData.Summary;
        document.getElementById('project-role').innerHTML = `${projectData.Role}`;

        const createSvgElement = (name, tooltip) => {
            const div = document.createElement('div');
            div.classList.add('tooltip');
            div.innerHTML = `
                <span class="tooltiptext">${tooltip}</span>
                ${svgs[name]}
            `;
            return div;
        };

        const toolsList = document.getElementById('project-tools');
        projectData.Tools.forEach(tool => {
            toolsList.appendChild(createSvgElement(tool.name, tool.tooltip));
        });

        document.getElementById('project-picture').innerHTML = `<img src="../${projectData.ProjectFolder}1.png"></img>`;

        const featuresList = document.getElementById('project-features');
        projectData.Features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        document.getElementById('objective').textContent = projectData.Objective;


        const designList = document.getElementById('project-design');
        projectData.Design.forEach(design => {
            const li = document.createElement('li');

            if (design.includes('<a ')) {
                li.innerHTML = design;
            } else {
                li.textContent = design;
            }
            designList.appendChild(li);

        });

        const challengesList = document.getElementById('project-challenges');
        projectData.Challenges.forEach(challenge => {
            for (const [title, description] of Object.entries(challenge)) {
                const li = document.createElement('li');
                li.innerHTML = `<p class="label">${title}</p> <p>${description}</p>`;
                challengesList.appendChild(li);
            }
        });

        document.getElementById('project-learning').textContent = projectData.Learning;

        if (projectData.Type.includes('Design')) {
            document.getElementById('project-sourcedoc').innerHTML = `<a href="${projectData.SourceDoc}" target="_blank" class="link">Figma Project</a>`;
        } else {
            document.getElementById('project-sourcedoc').innerHTML = `<a href="${projectData.SourceDoc}" target="_blank" class="link">GitHub Repository</a>`;
        }
    }
});
