const baseURL = "https://dominicemilio.github.io/wdd230/";
const linksURL = "https://dominicemilio.github.io/wdd230/data/links.json";

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.lessons);
}

function displayLinks(lessons) {
  const activitiesDiv = document.getElementById("learning-activities");
  const ul = document.createElement("ul");

  lessons.forEach(lesson => {
    const li = document.createElement("li");
    li.textContent = `${lesson.lesson}: `;

    lesson.links.forEach((link, index) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      li.appendChild(a);

      if (index < lesson.links.length - 1) {
        li.appendChild(document.createTextNode(" | "));
      }
    });

    ul.appendChild(li);
  });

  activitiesDiv.appendChild(ul);
}

getLinks();