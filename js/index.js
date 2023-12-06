function fetchMonsters(page) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then(res => res.json())
      .then(data => {
        const monsterContainer = document.getElementById("monster-container");
        monsterContainer.innerHTML = "";
  
        data.forEach(monster => {
          const h2 = document.createElement('h2');
          h2.textContent = monster.name;
  
          const h4 = document.createElement('h4');
          h4.textContent = `Age: ${monster.age}`;
  
          const p = document.createElement('p');
          p.textContent = `Bio: ${monster.description}`;
  
          monsterContainer.appendChild(h2);
          monsterContainer.appendChild(h4);
          monsterContainer.appendChild(p);
        });
      })
      .catch(error => console.log(error));
  }
  
  // Function to handle next page
  function nextPage(event) {
    event.preventDefault();
  
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('_page'));
  
    if (isNaN(currentPage) || currentPage < 1) {
      currentPage = 1;
    }
  
    const nextPage = currentPage + 1;
  
    urlParams.set('_page', nextPage);
    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
  
    fetchMonsters(nextPage);
  
    window.history.pushState(null, null, newUrl);
  }
  
  // Function to handle previous page
  function backPage(event) {
    event.preventDefault();
  
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get('_page'));
  
    if (isNaN(currentPage) || currentPage < 1) {
      currentPage = 1;
    }
  
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      urlParams.set('_page', previousPage);
      const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
  
      fetchMonsters(previousPage);
  
      window.history.pushState(null, null, newUrl);
    } else {
      alert("Ain't no monsters here");
    }
  }
  
  // Event listeners
  const monsterNext = document.querySelector('#forward');
  monsterNext.addEventListener('click', nextPage);
  
  const monsterBack = document.querySelector('#back');
  monsterBack.addEventListener('click', backPage);
  
  // Initial fetch and render on page load
  const urlParams = new URLSearchParams(window.location.search);
  let currentPage = parseInt(urlParams.get('_page'));
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }
  fetchMonsters(currentPage);
