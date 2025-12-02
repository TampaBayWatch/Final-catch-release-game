let fishData = [];
let usedFish = [];

// Load JSON file
async function loadFish() {
    let res = await fetch("fish.json");
    fishData = await res.json();
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

// Random fish selection with no repeats
function pickFish() {
    if (usedFish.length === fishData.length) {
        usedFish = []; // reset when all fish used
    }

    let remaining = fishData.filter(f => !usedFish.includes(f.id));
    let fish = remaining[Math.floor(Math.random() * remaining.length)];
    usedFish.push(fish.id);
    return fish;
}

// Format today's date
function getToday() {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Display fish
function showFish(f) {
    // Species + Image
    document.getElementById("species").textContent = f.species;
    document.getElementById("fishImage").src = "images/" + f.fish_image;

    // Catch info with TODAY'S DATE
    document.getElementById("catchInfo").innerHTML = `
        <b>Catch Date:</b> ${getToday()}<br>
        <b>Catch Location:</b> ${f.catch.location} (${f.catch.lat}, ${f.catch.lon})<br>
        <b>Length:</b> ${f.catch.length_mm} mm (${f.catch.length_in} in)<br>
        <b>Weight:</b> ${f.catch.weight_g} g (${f.catch.weight_lb} lbs)
    `;

    // Hatchery-specific info
    if (f.origin.toLowerCase().includes("hatch")) {
        document.getElementById("releaseInfo").innerHTML = `
            <b>Release Date:</b> ${f.release.date}<br>
            <b>Release Location:</b> ${f.release.location}<br>
            <b>Release Length:</b> ${f.release.length_mm} mm (${f.release.length_in} in)<br>
            <b>Release Weight:</b> ${f.release.weight_g} g
        `;
        document.getElementById("tagImage").src = "images/" + f.tag_image;
        document.getElementById("tagImage").style.display = "block";
    } else {
        // Wild fish: hide release + tag
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
