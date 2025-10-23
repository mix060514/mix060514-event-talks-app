const talks = [
  {
    title: "Introduction to AI",
    speakers: ["John Doe"],
    category: ["AI", "Machine Learning"],
    duration: 60,
    description: "A beginner-friendly introduction to the world of Artificial Intelligence."
  },
  {
    title: "The Future of JavaScript",
    speakers: ["Jane Smith"],
    category: ["JavaScript", "Web Development"],
    duration: 60,
    description: "Exploring the latest features and upcoming trends in JavaScript."
  },
  {
    title: "Cybersecurity in 2025",
    speakers: ["Peter Jones"],
    category: ["Cybersecurity"],
    duration: 60,
    description: "A look at the evolving landscape of cybersecurity threats and defenses."
  },
  {
    title: "Building Scalable APIs",
    speakers: ["Mary Johnson", "David Williams"],
    category: ["APIs", "Backend"],
    duration: 60,
    description: "Best practices for designing and building APIs that can handle high traffic."
  },
  {
    title: "The Power of Quantum Computing",
    speakers: ["Susan Brown"],
    category: ["Quantum Computing", "Future Tech"],
    duration: 60,
    description: "An overview of quantum computing and its potential to revolutionize industries."
  },
  {
    title: "UI/UX Design for Developers",
    speakers: ["Michael Miller"],
    category: ["UI/UX", "Design"],
    duration: 60,
    description: "Practical UI/UX design principles for developers to create better user experiences."
  }
];

const scheduleContainer = document.getElementById('scheduleContainer');
const searchInput = document.getElementById('searchInput');

const renderSchedule = (filteredTalks) => {
  scheduleContainer.innerHTML = '';
  let currentTime = new Date('2025-10-23T10:00:00');

  const talksToRender = filteredTalks || talks;

  talksToRender.forEach((talk, index) => {
    const startTime = new Date(currentTime);
    const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

    const talkElement = document.createElement('div');
    talkElement.classList.add('talk');

    talkElement.innerHTML = `
      <div class="time">${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      <h2>${talk.title}</h2>
      <div class="speakers">By: ${talk.speakers.join(', ')}</div>
      <p>${talk.description}</p>
      <div class="categories">
        ${talk.category.map(cat => `<span class="category">${cat}</span>`).join('')}
      </div>
    `;

    scheduleContainer.appendChild(talkElement);

    currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

    if (index === 2) { // Lunch break after the 3rd talk
      const lunchStartTime = new Date(currentTime);
      const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
      const lunchElement = document.createElement('div');
      lunchElement.classList.add('talk');
      lunchElement.innerHTML = `
        <div class="time">${lunchStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <h2>Lunch Break</h2>
      `;
      scheduleContainer.appendChild(lunchElement);
      currentTime = lunchEndTime;
    }
  });
};

searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTalks = talks.filter(talk => 
    talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
  );
  renderSchedule(filteredTalks);
});

renderSchedule();
