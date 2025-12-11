let fishData = [];
let usedFish = [];

// Load fish.json
async function loadFish() {
    const res = await fetch("fish.json");
    fishData = await res.json();
}

// Fade helpers
function fadeIn(el) {
    el.style.display = "block";
    requestAnimationFrame(() => {
        el.style.opacity = 1;
    });
}

function fadeOut(el, callback) {
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = "none";
        if (callback) callback();
    }, 500);
}

// Pick a fish without repeating until all have been shown
function pickFish() {
    if (usedFish.length === fishData.length) {
        usedFish = [];
    }
    const remaining = fishData.filter(f => !usedFish.includes(f.id));
    const fish = remaining[Math.floor(Math.random() * remaining.length)];
    usedFish.push(fish.id);
    return fish;
}

function getToday() {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function formatReleaseDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function showFish(fish) {
    document.getElementById("species").textContent = fish.species;

    // Fish image
    document.getElementById("fishImage").src = "images/" + fish.fish_image;

    // Wild vs hatchery label
    const isHatchery = fish.origin.toLowerCase().includes("hatch");
    document.getElementById("originLabel").textContent = isHatchery
        ? "HATCHERY FISH"
        : "WILD CAUGHT";

    // Catch info
    document.getElementById("catchInfo").innerHTML =
        `<b>Catch Date:</b> ${
