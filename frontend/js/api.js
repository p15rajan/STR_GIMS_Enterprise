/*********************************************************************
 STR GIMS Enterprise
 API Layer
*********************************************************************/

import CONFIG from "./config.js";

async function post(endpoint, body = {}) {

    const response = await fetch(
        `${CONFIG.RPC_URL}/${endpoint}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return await response.json();
}

export async function login(username, password) {

    return await post("login_user", {
        p_username: username,
        p_password: password
    });

}

export async function getDashboard() {

    return await post("get_dashboard");

}

export async function getPlants() {

    return await post("get_plants");

}

export async function getAnimals() {

    return await post("get_animals");

}

/*********************************************************************
 PLANTS CRUD
*********************************************************************/

export async function getSpecies() {

    return await post("get_species");

}

export async function getForestRanges() {

    return await post("get_forest_ranges");

}

export async function addPlant(
    species,
    range,
    latitude,
    longitude,
    observedOn,
    observedBy,
    remarks
) {

    return await post("add_plant", {

        p_species: species,
        p_range: range,
        p_lat: latitude,
        p_lon: longitude,
        p_date: observedOn,
        p_user: observedBy,
        p_remarks: remarks

    });

}