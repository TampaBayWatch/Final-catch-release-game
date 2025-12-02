let fishData = [];
let usedFish = [];

// Load JSON file
async function loadFish() {
    try {
        let res = await fetch("fish.json");
        fishData = await res.json();
    } catch (e) {
        console.error("ERROR LOADING fish.json:", e);
    }
}

// Fade helpers
function fadeIn(el) {
    el.style.display = "block";
    setTimeout(() => { el.style.opacity = 1; }, 20);
}

function fadeOut(el, callback) {
    el.style.opacity = 0;
    setTimeout(() => { el.style.display = "none"; callback(); }, 800);
}

// Choose random fish, no repeats until all used
function pickFish() {
    if (usedFish.length === fishData.length) {
        usedFish = [];
    }

    let remaining = fishData.filter(f => !usedFish.includes(f.id));
    let fish = remaining[Math.floor(Math.random() * remaining.length)];
    usedFish.push(fish.id);
    return fish;
}

// Today's date (formatted)
function getToday() {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Format release dates (remove timestamp)
function formatReleaseDate(dateString) {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d)) {
        return dateString.split(" ")[0];
    }
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Display fish details
function showFish(f) {

    // Hide the title on fish screen
    document.getElementById("titleHeader").style.display = "none";

    // Species Name
    document.getElementById("species").textContent = f.species;

    // Wild or Hatchery label
    const originLabel = f.origin.toLowerCase().includes("hatch")
        ? "HATCHERY FISH"
        : "WILD CAUGHT";

    document.getElementById("originLabel").textContent = originLabel;

    // Fish Image
    document.getElementById("fishImage").src = "images/" + f.fish_image;

    // Catch Info
    document.getElementById("catchInfo").innerHTML = `
        <b>Catch Date:</b> ${getToday()}<br>
        <b>Catch Location:</b> ${f.catch.location}<br>
        <b>Catch Coordinates:</b> ${f.catch.coords}<br>
        <b>Length:</b> ${f.catch.length_mm} mm (${f.catch.length_in} in)<br>
        <b>Weight:</b> ${f.catch.weight_g} g (${f.catch.weight_lb} lbs)
    `;

    // Release Info (for hatchery fish only)
    if (f.origin.toLowerCase().includes("hatch")) {
        document.getElementById("releaseInfo").innerHTML = `
            <b>Release Date:</b> ${formatReleaseDate(f.release.date)}<br>
            <b>Release Location:</b> ${f.release.location}<br>
            <b>Release Coordinates:</b> ${f.release.coords}<br>
            <b>Release Length:</b> ${f.release.length_mm} mm (${f.release.length_in} in)<br>
            <b>Release Weight:</b> ${f.release.weight_g} g
        `;

        // Show tag image
        document.getElementById("tagImage").src = "images/" + f.release.tag_image;
        document.getElementById("tagImage").style.display = "block";

    } else {
        // Hide release + tag info for wild fish
        document.getElementById("releaseInfo").innerHTML = "";
        document.getElementById("tagImage").style.display = "none";
    }
}

// Button logic
document.getElementById("castBtn").onclick = () => {
    fadeOut(document.getElementById("castBtn"), () => {
        let f = pickFish();
        showFish(f);
        fadeIn(document.getElementById("fishCard"));
    });
};

document.getElementById("againBtn").onclick = () => {
    fadeOut(document.getElementById("fishCard"), () => {
        let f = pickFish();
        showFish(f);
        fadeIn(document.getElementById("fishCard"));
    });
};

loadFish();
