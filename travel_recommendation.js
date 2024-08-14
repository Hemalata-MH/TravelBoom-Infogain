// Show Home section on page load
window.onload = function () {
  showSection("home");
};

// Function to show the selected section
function showSection(sectionId) {
  // Hide all sections
  //debugger;
  var sections = document.querySelectorAll("section");
  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  // Show the selected section
  var selectedSection = document.getElementById(sectionId);
  selectedSection.classList.add("active");
}

var jsonData = "";
const fetchJSONData = async () => {
  const response = await fetch("travel_recommendation_api.json");
  jsonData = await response.json();
  console.log("jsonData : " + JSON.stringify(jsonData));
};

fetchJSONData();

function searchData() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  const allItems = [
    ...jsonData.countries.flatMap((country) => country.cities),
    ...jsonData.temples,
    ...jsonData.beaches,
  ];

  const results = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  if (results.length > 0) {
    results.forEach((result) => {
      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = result.imageUrl;
      card.appendChild(image);

      const title = document.createElement("h3");
      title.innerText = result.name;
      card.appendChild(title);

      const description = document.createElement("p");
      description.innerText = result.description;
      card.appendChild(description);

      const visitButton = document.createElement("button");
      visitButton.innerText = "Visit";
      card.appendChild(visitButton);

      resultsContainer.appendChild(card);
    });

    // Display the results container with z-index
    resultsContainer.classList.add("show");
  } else {
    resultsContainer.innerHTML = "<p>No results found</p>";
    resultsContainer.classList.add("show");
  }
}

function clearSearchResults() {
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("resultsContainer");

  // Clear the search input text
  searchInput.value = "";

  // Clear the results container
  resultsContainer.innerHTML = "";
  resultsContainer.classList.remove("show");
}
