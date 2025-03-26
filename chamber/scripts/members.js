const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const memberList = document.getElementById('member-list');

if (gridBtn && listBtn && memberList) {
  gridBtn.addEventListener('click', () => {
    memberList.classList.remove('list-view');
    memberList.classList.add('grid-view');
    if (membersData.length > 0) {
      renderMembersGrid();
    }
  });

  listBtn.addEventListener('click', () => {
    memberList.classList.remove('grid-view');
    memberList.classList.add('list-view');
    if (membersData.length > 0) {
      renderMembersList();
    }
  });

  let membersData = [];

  fetch('data/members.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      membersData = data.members;
      renderMembersGrid();
    })
    .catch(error => console.error('Error loading member directory:', error));

  function renderMembersGrid() {
    memberList.innerHTML = '';

    membersData.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('member-card');
      const name = document.createElement('h3');
      name.textContent = member.name;
      const address = document.createElement('p');
      address.textContent = member.address;
      const phone = document.createElement('p');
      phone.textContent = member.phone;
      const websiteLink = document.createElement('a');
      websiteLink.href = member.website;
      websiteLink.textContent = 'Website';
      websiteLink.target = '_blank';
      const membership = document.createElement('p');
      membership.textContent = `Membership: ${member.membershipLevel}`;
      const image = document.createElement('img');
      image.src = member.image;
      image.alt = `${member.name} logo`;
      image.classList.add('bordered-image');
      image.loading = 'lazy';

      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(websiteLink);
      card.appendChild(membership);

      memberList.appendChild(card);
    });
  }

  function renderMembersList() {
    memberList.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('members-table');

    const thead = document.createElement('thead');
    const headers = ["Business Name", "Address", "Phone Number", "Website", "Membership Level"];
    thead.innerHTML = `
          <tr>
            <th>${headers[0]}</th>
            <th>${headers[1]}</th>
            <th>${headers[2]}</th>
            <th>${headers[3]}</th>
            <th>${headers[4]}</th>
          </tr>
        `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    membersData.forEach(member => {
      const row = document.createElement('tr');
      row.innerHTML = `
              <td data-label="${headers[0]}">${member.name}</td>
              <td data-label="${headers[1]}">${member.address}</td>
              <td data-label="${headers[2]}">${member.phone}</td>
              <td data-label="${headers[3]}"><a href="${member.website}" target="_blank">Website</a></td>
              <td data-label="${headers[4]}">${member.membershipLevel}</td>
            `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    memberList.appendChild(table);
  }

} else {
  console.error("Directory view buttons or container not found.");
}

document.addEventListener('DOMContentLoaded', () => {
  const spotlightsContainer = document.querySelector('.spotlights-container');

  if (spotlightsContainer) {
    fetch('data/members.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok for spotlights: ${response.status}`);
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
                      <img src="${member.image}" alt="${member.name} logo" class="spotlight-image" loading="lazy">
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
}); // End of DOMContentLoaded listener