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

    document.getElementById("fishImage").src = "images/" + f.fish_image;

    // Catch info
    document.getElementById("catchInfo").innerHTML =
        `<b>Catch Date:</b> ${getToday()}<br>
         <b>Catch Location:</b> ${f.catch.location}<br>
         <b>Catch Coordinates:</b> ${f.catch.coords}<br>
         <b>Length:</b> ${f.catch.length_mm} mm (${f.catch.length_in} in)<br>
         <b>Weight:</b> ${f.catch.weight_g} g (${f.catch.weight_lb} lbs)`;

    // Hatchery extras
    if (f.origin.toLowerCase().includes("hatch")) {

        // Create the tag type name from the filename
        let tagType = f.release.tag_image
            .replace(".jpg", "")
            .replace("Final", "")
            .replace(/[_\.]/g, " ")
            .trim()
            .toUpperCase();

        // Insert tag type text
        document.getElementById("tagTypeText").textContent = "TAG TYPE: " + tagType;

        // Release info
        document.getElementById("releaseInfo").innerHTML =
            `<b>Release Date:</b> ${formatReleaseDate(f.release.date)}<br>
             <b>Release Location:</b> ${f.release.location}<br>
             <b>Release Coordinates:</b> ${f.release.coords}<br>
             <b>Release Length:</b> ${f.release.length_mm} mm (${f.release.length_in} in)<br>
             <b>Release Weight:</b> ${f.release.weight_g} g`;

        let tag = document.getElementById("tagImage");
        tag.src = "images/" + f.release.tag_image;
        tag.style.display = "block";

    } else {
        // Clear for wild fish
        document.getElementById("releaseInfo").innerHTML = "";
        document.getElementById("tagTypeText").textContent = "";
        document.getElementById("tagImage").style.display = "none";
    }
}

// Button actions
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
