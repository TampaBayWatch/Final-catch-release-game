let fishData = [];
let firstCast = true;

window.onload = async function () {
  const response = await fetch("fish.json");
  fishData = await response.json();

  document.getElementById("startButton").addEventListener("click", castLine);
  document.getElementById("castAgainButton").addEventListener("click", castLine);
};

function castLine() {
  // Hide start screen after first cast
  if (firstCast) {
    document.getElementById("start-screen").style.display = "none";
    firstCast = false;
  }

  // Pick a fish
  const fish = fishData[Math.floor(Math.random() * fishData.length)];

  // Today's date for catch date
  const today = new Date().toISOString().split("T")[0];

  // Result container
  const result = document.getElementById("result");
  result.style.display = "block";

  // Build card
  let html = `
    <div class="fish-card">
      <h2>You caught a ${fish.species}!</h2>

      <img src="${fish.fish_image}" class="fish-img" />

      <p><strong>Origin:</strong><br>${fish.origin}</p>

      <p><strong>Catch Date:</strong><br>${today}</p>

      <h3>Catch Location:</h3>
      <p>${fish.catch.location}</p>
      <p><strong>Coordinates:</strong> ${fish.catch.coords}</p>

      <h3>Catch Size:</h3>
      <p>${fish.catch.length_mm} mm (${fish.catch.length_in} in)</p>

      <h3>Catch Weight:</h3>
      <p>${fish.catch.weight_g} g (${fish.catch.weight_lb} lb)</p>
  `;

  // Release data for hatchery fish
  if (fish.origin === "Hatchery") {
    html += `
      <h3>Release Information</h3>

      <p><strong>Date Released:</strong><br>${fish.release.date}</p>

      <p><strong>Release Location:</strong><br>${fish.release.location}</p>
      <p><strong>Coordinates:</strong> ${fish.release.coords}</p>

      <p><strong>Release Size:</strong><br>${fish.release.length_mm} mm (${fish.release.length_in} in)</p>

      <p><strong>Release Weight:</strong><br>${fish.release.weight_g} g (${fish.release.weight_lb} lb)</p>

      <p><strong>Tag Type:</strong><br>${fish.release.tag_type}</p>
      <img src="${fish.release.tag_image}" class="tag-img" />
    `;
  }

  html += `</div>`;

  result.innerHTML = html;

  // Show button
  document.getElementById("castAgainButton").style.display = "block";
}
