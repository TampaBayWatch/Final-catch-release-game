let fishData=[]; let usedFish=[];
async function loadFish(){ let r=await fetch("fish.json"); fishData=await r.json(); }
function fadeIn(el){ el.style.display="block"; setTimeout(()=>el.style.opacity=1,20);}
function fadeOut(el,cb){ el.style.opacity=0; setTimeout(()=>{el.style.display="none";cb();},800);}
function pickFish(){ if(usedFish.length===fishData.length) usedFish=[]; let rem=fishData.filter(f=>!usedFish.includes(f.id)); let f=rem[Math.floor(Math.random()*rem.length)]; usedFish.push(f.id); return f;}
function showFish(f){
 document.getElementById("species").textContent=f.species;
 document.getElementById("fishImage").src="images/"+f.fish_image;
 document.getElementById("catchInfo").innerHTML=
 `<b>Catch Location:</b> ${f.catch.location} (${f.catch.lat}, ${f.catch.lon})<br>
  <b>Length:</b> ${f.catch.length_mm} mm (${f.catch.length_in} in)<br>
  <b>Weight:</b> ${f.catch.weight_g} g (${f.catch.weight_lb} lbs)`;
 if(f.origin.toLowerCase().includes("hatch")){
   document.getElementById("releaseInfo").innerHTML=
   `<b>Release Date:</b> ${f.release.date}<br>
    <b>Release Location:</b> ${f.release.location}<br>
    <b>Release Length:</b> ${f.release.length_mm} mm (${f.release.length_in} in)<br>
    <b>Release Weight:</b> ${f.release.weight_g} g`;
   document.getElementById("tagImage").src="images/"+f.tag_image;
   document.getElementById("tagImage").style.display="block";
 } else {
   document.getElementById("releaseInfo").innerHTML="";
   document.getElementById("tagImage").style.display="none";
 }
}
document.getElementById("castBtn").onclick=()=>{ fadeOut(document.getElementById("castBtn"),()=>{ let f=pickFish(); showFish(f); fadeIn(document.getElementById("fishCard")); }); };
document.getElementById("againBtn").onclick=()=>{ fadeOut(document.getElementById("fishCard"),()=>{ let f=pickFish(); showFish(f); fadeIn(document.getElementById("fishCard")); }); };
loadFish();