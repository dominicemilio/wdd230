const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const memberList = document.getElementById('member-list');

if (gridBtn && listBtn && memberList) {
  gridBtn.addEventListener('click', () => {
    memberList.classList.remove('list-view');
    memberList.classList.add('grid-view');
  });

  listBtn.addEventListener('click', () => {
    memberList.classList.remove('grid-view');
    memberList.classList.add('list-view');
  });

  fetch('data/members.json')
    .then(response => response.json())
    .then(data => {
      data.members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="bordered-image">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p>Membership: ${member.membershipLevel}</p>
        `;

        const listItem = document.createElement('div');
        listItem.classList.add('member-list-item');
        listItem.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Website</a>
            <p>Membership: ${member.membershipLevel}</p>
        `;

        memberList.appendChild(card);
        memberList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error loading member directory:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  const spotlightsContainer = document.querySelector('.spotlights-container');

  if (spotlightsContainer) {
    fetch('data/members.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const premiumMembers = data.members.filter(member =>
          member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver'
        );

        const shuffledMembers = [...premiumMembers].sort(() => 0.5 - Math.random());

        const spotlightMembers = shuffledMembers.slice(0, 3);

        spotlightsContainer.innerHTML = '';

        spotlightMembers.forEach(member => {
          const card = document.createElement('div');
          card.classList.add('card');

          let description = '';
          if (member.name.includes('Hotel')) {
            description = `Experience comfort and luxury at ${member.name}, located in the heart of the beautiful Guatape region.`;
          } else if (member.name.includes('Tours') || member.name.includes('Adventures')) {
            description = `Explore the beauty of Guatape with ${member.name}, offering unforgettable experiences and guided tours.`;
          } else if (member.name.includes('Coffee')) {
            description = `Enjoy locally grown and freshly roasted coffee at ${member.name}, a must-visit destination for coffee lovers.`;
          } else if (member.name.includes('Lake')) {
            description = `Discover the picturesque waters of Guatape with ${member.name}, perfect for family outings or romantic getaways.`;
          } else {
            description = `Visit ${member.name}, one of Guatape's premier businesses offering excellent services to locals and visitors alike.`;
          }

          card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" class="spotlight-image">
            <h3>${member.name}</h3>
            <p>${description}</p>
            <div class="membership-badge ${member.membershipLevel.toLowerCase()}">${member.membershipLevel} Member</div>
          `;

          spotlightsContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error loading spotlight members:', error);
      });
  }
});