const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const memberList = document.getElementById('member-list');

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
                    <img src="${member.image}" alt="${member.name} logo">
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
  });