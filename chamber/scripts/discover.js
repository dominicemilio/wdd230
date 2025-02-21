document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const images = document.querySelectorAll(".gallery-image");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => {
    img.dataset.src = img.src;
    img.src = "";
    observer.observe(img);
  });

  const visitMessage = document.createElement("p");
  visitMessage.classList.add("visit-message");
  const sidebar = document.querySelector(".sidebar");
  console.log("Sidebar element:", sidebar);

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  console.log("Last visit:", lastVisit);
  console.log("Current time:", now);

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    console.log("First visit message set.");
  } else {
    const daysBetween = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
    visitMessage.textContent = daysBetween < 1 ? "Back so soon! Awesome!" : `You last visited ${daysBetween} day${daysBetween === 1 ? '' : 's'} ago.`;
    console.log(`Returning visit message set: ${visitMessage.textContent}`);
  }

  localStorage.setItem("lastVisit", now.toString());
  sidebar.appendChild(visitMessage);
  console.log("Visit message appended to sidebar.");
});
