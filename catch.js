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

  // Select random fish
  const fish = fishData[Math.floor(Math.random() * fishData.length)];

  // Select result container
  const result = document.getElementById("result");
  result.style.display = "block";

  // Build fish info card
  let html = `
    <div class="fish-card">
      <h2>${fish.species} (${fish.origin})</h2>
      <img src="${fish.fish_image}" class="fish-img" />

      <h3>Catch Data</h3>
      <p><strong>Location:</strong> ${fish.catch.location}</p>
      <p><strong>Coordinates:</strong> ${fish.catch.coords}</p>
      <p><strong>Length:</strong> ${fish.catch.length_mm} mm (${fish.catch.length_in} in)</p>
      <p><strong>Weight:</strong> ${fish.catch.weight_g} g (${fish.catch.weight_lb} lb)</p>
  `;

  // Hatchery-only release data
  if (fish.origin === "Hatchery") {
    html += `
      <h3>Release Data</h3>
      <p><strong>Date Released:</strong> ${fish.release.date}</p>
      <p><strong>Location:</strong> ${fish.release.location}</p>
      <p><strong>Coordinates:</strong> ${fish.release.coords}</p>
      <p><strong>Length:</strong> ${fish.release.length_mm} mm (${fish.release.length_in} in)</p>
      <p><strong>Weight:</strong> ${fish.release.weight_g} g (${fish.release.weight_lb} lb)</p>
      <p><strong>Tag Type:</strong> ${fish.release.tag_type}</p>
      <img src="${fish.release.tag_image}" class="tag-img" />
    `;
  }

  html += `</div>`;

  result.innerHTML = html;

  // Show bottom button
  document.getElementById("castAgainButton").style.display = "block";
}
