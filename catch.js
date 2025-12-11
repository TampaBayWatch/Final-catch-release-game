let fishData = [];

// Load JSON data
fetch("fish.json")
  .then(response => response.json())
  .then(data => {
    fishData = data;
  });

function castLine() {
  if (fishData.length === 0) {
    document.getElementById("result").innerHTML = "<p>Loading fish...</p>";
    return;
  }

  // Pick a random fish
  const fish = fishData[Math.floor(Math.random() * fishData.length)];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Insert catch_date dynamically
  fish.catch_date = today;

  // Build display HTML
  let html = `
    <h2>You caught a ${fish.species}!</h2>
    <img src="${fish.fish_image}" alt="${fish.species} image">

    <p class="label">Origin:</p>
    <p>${fish.origin}</p>

    <p class="label">Catch Date:</p>
    <p>${fish.catch_date}</p>

    <p class="label">Catch Location:</p>
    <p>${fish.catch.location}</p>

    <p class="label">Catch Size:</p>
    <p>${fish.catch.length_mm} mm (${fish.catch.length_in} in)</p>

    <p class="label">Catch Weight:</p>
    <p>${fish.catch.weight_g} g (${fish.catch.weight_lb} lbs)</p>
  `;

  // If hatchery fish, add release data
  if (fish.origin.toLowerCase().includes("hatchery") && fish.release) {
    html += `
      <hr>
      <h3>Release Information</h3>

      <p class="label">Release Date:</p>
      <p>${fish.release.date}</p>

      <p class="label">Release Location:</p>
      <p>${fish.release.location}</p>

      <p class="label">Release Size:</p>
      <p>${fish.release.length_mm} mm (${fish.release.length_in} in)</p>

      <p class="label">Release Weight:</p>
      <p>${fish.release.weight_g} g (${fish.release.weight_lb} lbs)</p>

      <p class="label">Tag Type:</p>
      <p>${fish.release.tag_type}</p>

      <img src="${fish.release.tag_image}" alt="Tag Image">
    `;
  }

  document.getElementById("result").innerHTML = html;
}
