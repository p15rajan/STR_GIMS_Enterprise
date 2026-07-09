import { getDashboard } from "./api.js";
import { initializeMap } from "./map.js";

export async function initializeDashboard() {


     console.log("Dashboard initialized");
    
    await loadDashboard();

    console.log("Dashboard loaded");
    

    await initializeMap();
    console.log("Map initialized");
    
}

async function loadDashboard() {

    try {

        const data = await getDashboard();

        if (!data || data.length === 0)
            return;

        const d = data[0];

        document.getElementById("plantCount").innerHTML =
            d.total_plants ?? 0;

        document.getElementById("animalCount").innerHTML =
            d.total_animals ?? 0;

        document.getElementById("speciesCount").innerHTML =
            (d.plant_species ?? 0) +
            (d.animal_species ?? 0);

        document.getElementById("rangeCount").innerHTML =
            d.forest_ranges ?? 0;

    }

    catch (err) {

        console.error(err);

    }

}