let fishData = [];
let usedFish = [];

// Load fish.json
async function loadFish() {
    let res = await fetch("fish.json");
    fishData = await res.json();
}

// Fade helpers
function fadeIn(el) {
    el.style.display = "block";
    setTimeout(() => { el.style.opacity = 1; }, 20);
}

function fadeOut(el, cb) {
    el.style.opacity = 0;
    setTimeout(() => { el.style.display = "none"; cb(); }, 800);
}

// Random fish picker without repeats
function pickFish() {
    if (usedFish.length === fishData.length) usedFish = [];
    let remaining = fishData.filter(f => !usedFish.includes(f.id));
    let f = remaining[Math.floor(Math.random() * remaining.length)];
    usedFish.push(f.id);
    return f;
}

// Date formatting
function getToday() {
    const d = new Date();
    return d.toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
}

function formatReleaseDate(ds) {
    if (!ds) return "";
    const d = new Date(ds);
    if (isNaN(d)) return ds.split(" ")[0];
    return d.toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });
}

// Display fish card
function showFish(f) {
    document.getElementById("titleHeader").style.display = "none";

    document.getElementById("species").textContent = f.species;

    const originLabel = f.origin.toLowerCase().includes("hatch")
        ? "HATCHERY FISH"
        : "WILD CAUGHT";

    document.getElementById("originLabel").textContent = originLabel;

    document.getElemen
