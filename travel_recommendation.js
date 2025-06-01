function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId !== 'home') {
      document.getElementById('results').innerHTML = '';
    }
  }
  
  function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
  }
  
  function searchData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let found = false;
  
        // Cities (by keyword or general "cities")
        if (keyword.includes("city") || keyword.includes("cities")) {
          data.countries.forEach(country => {
            country.cities.forEach(city => {
              showResult(city.name, city.imageUrl, city.description);
              found = true;
            });
          });
        }
  
        // Beaches
        if (keyword.includes("beach") || keyword.includes("beaches")) {
          data.beaches.forEach(beach => {
            showResult(beach.name, beach.imageUrl, beach.description);
            found = true;
          });
        }
  
        // Temples
        if (keyword.includes("temple") || keyword.includes("temples")) {
          data.temples.forEach(temple => {
            showResult(temple.name, temple.imageUrl, temple.description);
            found = true;
          });
        }
  
        // Country name matches
        data.countries.forEach(country => {
          if (country.name.toLowerCase().includes(keyword)) {
            country.cities.forEach(city => {
              showResult(city.name, city.imageUrl, city.description);
              found = true;
            });
          }
        });
  
        if (!found) {
          resultsContainer.innerHTML = '<p>No results found. Try searching for "temples", "beaches", "cities", or a country name.</p>';
        }
      });
  }
  
  function showResult(name, imageUrl, description) {
    const resultsContainer = document.getElementById('results');
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <h3>${name}</h3>
      <img src="${imageUrl}" alt="${name}">
      <p>${description}</p>
    `;
    resultsContainer.appendChild(card);
  }
  