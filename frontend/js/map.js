let map;

let baseLayer;
let plantLayer;
let animalLayer;

export async function initializeMap() {

    console.log("Initializing Map...");

    // Remove previous map if it exists
    if (map) {
        map.remove();
        map = null;
    }

    // Create map
    map = L.map("map", {
        zoomControl: true
    }).setView([11.55, 77.25], 10);

    // Base Map
    baseLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap Contributors",
            maxZoom: 19
        }
    );

    baseLayer.addTo(map);

    // Plants WMS
    plantLayer = L.tileLayer.wms(
        "http://localhost:8595/geoserver/STR_Plants/wms",
        {
            layers: "STR_Plants:str_plant_inventory",
            format: "image/png",
            transparent: true,
            version: "1.1.1"
        }
    );

    // Animals WMS
    animalLayer = L.tileLayer.wms(
        "http://localhost:8595/geoserver/animals/wms",
        {
            layers: "animals:str_animal_inventory",
            format: "image/png",
            transparent: true,
            version: "1.1.1"
        }
    );

    // Scale
    L.control.scale().addTo(map);

    // Register button events
    registerEvents();

    // Allow Leaflet to resize correctly
    setTimeout(() => {
        map.invalidateSize();
    }, 300);

    console.log("Map Ready");

}

function registerEvents() {

    const btnPlants = document.getElementById("btnPlantsLayer");
    const btnAnimals = document.getElementById("btnAnimalsLayer");
    const btnBoth = document.getElementById("btnBothLayers");
    const btnClear = document.getElementById("btnClearLayers");

    if (!btnPlants || !btnAnimals || !btnBoth || !btnClear) {

        console.error("Map toolbar buttons not found.");

        return;

    }

    btnPlants.onclick = function () {

        clearLayers();

        map.addLayer(plantLayer);

        console.log("Plants layer added");

    };

    btnAnimals.onclick = function () {

        clearLayers();

        map.addLayer(animalLayer);

        console.log("Animals layer added");

    };

    btnBoth.onclick = function () {

        clearLayers();

        map.addLayer(plantLayer);

        map.addLayer(animalLayer);

        console.log("Both layers added");

    };

    btnClear.onclick = function () {

        clearLayers();

        console.log("Layers cleared");

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