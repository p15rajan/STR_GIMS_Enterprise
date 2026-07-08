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


export async function getPlant(id) {

    return await post("get_plant", {
        p_plant_id: id
    });

}

export async function updatePlant(
    plantId,
    species,
    range,
    latitude,
    longitude,
    observedOn,
    remarks
) {

    return await post("update_plant", {

        p_plant_id: plantId,

        p_species: species,

        p_range: range,

        p_lat: latitude,

        p_lon: longitude,

        p_date: observedOn,

        p_remarks: remarks

    });

}

export async function deletePlant(id) {

    return await post("delete_plant", {

        p_plant_id: id

    });

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

/*********************************************************************
 ANIMALS CRUD
*********************************************************************/

export async function getAnimal(id) {

    return await post("get_animal", {
        p_animal_id: id
    });

}

export async function addAnimal(
    species,
    range,
    gender,
    ageClass,
    latitude,
    longitude,
    observedOn,
    observedBy,
    remarks
) {

    return await post("add_animal", {

        a_species: species,
        a_range: range,
        a_gender: gender,
        a_age_class: ageClass,
        a_lat: latitude,
        a_lon: longitude,
        a_date: observedOn,
        a_user: observedBy,
        a_remarks: remarks

    });

}

export async function updateAnimal(
    animalId,
    species,
    range,
    gender,
    ageClass,
    latitude,
    longitude,
    observedOn,
    remarks
) {

    return await post("update_animal", {

        a_animal_id: animalId,
        a_species: species,
        a_range: range,
        a_gender: gender,
        a_age_class: ageClass,
        a_lat: latitude,
        a_lon: longitude,
        a_date: observedOn,
        a_remarks: remarks

    });

}

export async function deleteAnimal(id) {

    return await post("delete_animal", {

        a_animal_id: id

    });

}