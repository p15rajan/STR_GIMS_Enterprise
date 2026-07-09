let map;
let baseMap;

let plantLayer;
let animalLayer;

export async function initializeMap() {

    console.log("Initializing Map...");

    if (map) {
        map.remove();
    }

    map = L.map("map", {
        zoomControl: true
    }).setView([11.55, 77.25], 10);

    baseMap = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap",
            maxZoom: 19
        }
    );

    baseMap.addTo(map);

}

plantLayer = L.tileLayer.wms(
    "http://localhost:8595/geoserver/STR_Plants/wms",
    {
        layers: "STR_Plants:Plants_inventory",
        format: "image/png",
        transparent: true,
        version: "1.1.1"
    }
);

 console.log("Plant Layer Created:", plantLayer);

animalLayer = L.tileLayer.wms(
    "http://localhost:8595/geoserver/animals/wms",
    {
        layers: "animals:str_animal_inventory",
        format: "image/png",
        transparent: true,
        version: "1.1.1"
    }
);

 console.log("Animal Layer Created:", animalLayer);

// Do NOT add WMS layers automatically.
// Only the OpenStreetMap base layer is shown initially.

L.control.scale().addTo(map);

registerEvents();

setTimeout(() => {

    map.invalidateSize();

}, 300);

console.log("Map Ready");

function registerEvents() {

    console.log("registerEvents() called");

    const btnPlants = document.getElementById("btnPlantsLayer");
    const btnAnimals = document.getElementById("btnAnimalsLayer");
    const btnBoth = document.getElementById("btnBothLayers");
    const btnClear = document.getElementById("btnClearLayers");

    console.log(btnPlants, btnAnimals, btnBoth, btnClear);

    btnPlants.onclick = function () {

        //console.log("PLANTS CLICKED");//

        clearLayers();

        map.addLayer(plantLayer);

        console.log("Plant layer added");

    };

    btnAnimals.onclick = function () {

        clearLayers();

        map.addLayer(animalLayer);

    };
    btnBoth.onclick = function () {

        clearLayers();

        map.addLayer(plantLayer);

        map.addLayer(animalLayer);

    };

    btnClear.onclick = function () {

       // console.log("CLEAR CLICKED");//

        alert("Clear Clicked");

        clearLayers();

    };

}

function clearLayers() {

    if (plantLayer && map.hasLayer(plantLayer)) {
        map.removeLayer(plantLayer);
    }

    if (animalLayer && map.hasLayer(animalLayer)) {
        map.removeLayer(animalLayer);
    }

}