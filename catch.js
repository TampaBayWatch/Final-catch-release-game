let fishData = [];
let firstCast = true;

window.onload = async function () {
  const response = await fetch("fish.json");
  fishData = await response.json();

  document.getElementById("startButton").addEventListener("click", castLine);
};

function castLine() {
  // Hide start screen after first cast
  if (firstCast) {
    document.getElementById("start-screen").style.display = "none";
    firstCast = false;
  }

  // Pick a random fish
  const fish = fishData[Math.floor(Math.random() * fishData.length)];
  const result = document.getElementById("result");
  result.style.display = "block";

  // Today's catch date
  const today = new Date().toISOString().slice(0, 10);

  // Build fish card HTML
  let html = `
    <div class="fish-card">
      <h2>You caught a ${fish.species}!</h2>

      <img src="${fish.fish_image}" class="fish-img" />

      <p><strong>Origin:</strong> ${fish.origin}</p>
      <p><strong>Catch Date:</strong> ${today}</p>

      <h3 class="section-title">CATCH INFORMATION</h3>
      <p><strong>Catch Location:</strong> ${fish.catch.location}</p>
      <p><strong>Coordinates:</strong> ${fish.catch.coords}</p>
      <p><strong>Catch Size:</strong> ${fish.catch.length_mm} mm (${fish.catch.length_in} in)</p>
      <p><strong>Catch Weight:</strong> ${fish.catch.weight_g} g (${fish.catch.weight_lb} lb)</p>
  `;

  if (fish.origin === "Hatchery") {
    html += `
      <h3 class="section-title">RELEASE INFORMATION</h3>
      <p><strong>Release Date:</strong> ${fish.release.date}</p>
      <p><strong>Release Location:</strong> ${fish.release.location}</p>
      <p><strong>Coordinates:</strong> ${fish.release.coords}</p>
      <p><strong>Release Size:</strong> ${fish.release.length_mm} mm (${fish.release.length_in} in)</p>
      <p><strong>Release Weight:</strong> ${fish.release.weight_g} g (${fish.release.weight_lb} lb)</p>
      <p><strong>Tag Type:</strong> ${fish.release.tag_type}</p>
      <img src="${fish.release.tag_image}" class="tag-img" />
    `;
  }

  // Add cast again button inside the card
  html += `
      <button class="cast-again-btn" onclick="castLine()">Cast Again</button>
    </div>
  `;

  result.innerHTML = html;
}
