let fishData = [];
let firstCast = true;

// Get today's date for Catch Date
function getTodayDate() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

window.onload = async function () {
  const response = await fetch("fish.json");
  fishData = await response.json();

  document.getElementById("startButton").addEventListener("click", castLine);
  document.getElementById("castAgainButton").addEventListener("click", castLine);
};

function castLine() {
  if (firstCast) {
    document.getElementById("start-screen").style.display = "none";
    firstCast = false;
  }

  const fish = fishData[Math.floor(Math.random() * fishData.length)];
  fish.catch.catch_date = getTodayDate();

  const result = document.getElementById("result");
  result.style.display = "block";

  let html = `
    <div class="fish-card">
      <h1 class="title">You caught a ${fish.species}!</h1>

      <img src="${fish.fish_image}" class="fish-img" />

      <p><strong>Origin:</strong> ${fish.origin}</p>
      <p><strong>Catch Date:</strong> ${fish.catch.catch_date}</p>

      <hr />

      <h2 class="section-title">CATCH INFORMATION</h2>
      <p><strong>Catch Location:</strong> ${fish.catch.location}</p>
      <p><strong>Coordinates:</strong> ${fish.catch.coords}</p>
      <p><strong>Catch Size:</strong> ${fish.catch.length_mm} mm (${fish.catch.length_in} in)</p>
      <p><strong>Catch Weight:</strong> ${fish.catch.weight_g} g (${fish.catch.weight_lb} lb)</p>
  `;

  if (fish.origin === "Hatchery") {
    html += `
      <hr />

      <h2 class="section-title">RELEASE INFORMATION</h2>
      <p><strong>Release Date:</strong> ${fish.release.date}</p>
      <p><strong>Release Location:</strong> ${fish.release.location}</p>
      <p><strong>Coordinates:</strong> ${fish.release.coords}</p>
      <p><strong>Release Size:</strong> ${fish.release.length_mm} mm (${fish.release.length_in} in)</p>
      <p><strong>Release Weight:</strong> ${fish.release.weight_g} g (${fish.release.weight_lb} lb)</p>
      <p><strong>Tag Type:</strong> ${fish.release.tag_type}</p>
      <img src="${fish.release.tag_image}" class="tag-img" />
    `;
  }

  html += `</div>`;
  result.innerHTML = html;

  document.getElementById("castAgainButton").style.display = "block";
}
