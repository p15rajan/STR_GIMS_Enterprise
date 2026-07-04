/*********************************************************************
 STR GIMS Enterprise
 Plants Module
*********************************************************************/

import {
    getPlants,
    getSpecies,
    getForestRanges,
    addPlant
} from "./api.js";

let plants = [];
let filteredPlants = [];

const session = JSON.parse(sessionStorage.getItem("gims_session"));

/*********************************************************************
 Initialize
*********************************************************************/
export async function initializePlants() {

    registerEvents();

    await loadSpecies();

    await loadForestRanges();

    await loadPlants();

}

/*********************************************************************
 Register Events
*********************************************************************/
function registerEvents() {

    document.getElementById("btnRefresh").onclick = loadPlants;

    document.getElementById("btnAddPlant").onclick = openPlantModal;

    document.getElementById("btnCancelPlant").onclick = closePlantModal;

    document.getElementById("btnSavePlant").onclick = savePlant;

    document.getElementById("txtSearch").onkeyup = filterPlants;

}

/*********************************************************************
 Load Plants
*********************************************************************/
async function loadPlants() {

    try {

        plants = await getPlants();

        filteredPlants = [...plants];

        drawTable(filteredPlants);

        registerGridEvents();

    }

    catch (err) {

        console.error(err);

        alert("Unable to load plants.");

    }

}

/*********************************************************************
 Draw Table
*********************************************************************/
function drawTable(rows) {

    const tbody = document.querySelector("#plantsTable tbody");

    tbody.innerHTML = "";

    if (!rows || rows.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center">
                    No records found.
                </td>
            </tr>`;

        return;

    }

    rows.forEach(p => {

        tbody.innerHTML += `

        <tr>

            <td>${p.scientific_name}</td>

            <td>${p.common_name}</td>

            <td>${p.range_name}</td>

            <td>${Number(p.latitude).toFixed(6)}</td>

            <td>${Number(p.longitude).toFixed(6)}</td>

            <td>${p.observed_on}</td>

            <td>

                
        <button class="btnEdit"
             data-id="${p.plant_id}">

             ✏ Edit

        </button>

        <button class="btnDelete"
            data-id="${p.plant_id}">

            🗑 Delete

        </button>

        <button class="btnView"
            data-id="${p.plant_id}">

            👁 View

        </button>
            </td>

        </tr>

        `;

    });

}

/*********************************************************************
 Search
*********************************************************************/
function filterPlants() {

    const text = document
        .getElementById("txtSearch")
        .value
        .toLowerCase();

    filteredPlants = plants.filter(p =>

        p.scientific_name.toLowerCase().includes(text) ||

        p.common_name.toLowerCase().includes(text) ||

        p.range_name.toLowerCase().includes(text)

    );

    drawTable(filteredPlants);

    registerGridEvents();
}
/*********************************************************************
 Grid Events 
*********************************************************************/
function registerGridEvents() {

    document
        .querySelectorAll(".btnEdit")
        .forEach(btn => {

            btn.onclick = () => {

                editPlant(btn.dataset.id);

            };

        });

    document
        .querySelectorAll(".btnDelete")
        .forEach(btn => {

            btn.onclick = () => {

                deletePlant(btn.dataset.id);

            };

        });

    document
        .querySelectorAll(".btnView")
        .forEach(btn => {

            btn.onclick = () => {

                viewPlant(btn.dataset.id);

            };

        });



}

/*********************************************************************
 Load Species
*********************************************************************/
async function loadSpecies() {

    const cmb = document.getElementById("cmbSpecies");

    cmb.innerHTML = "";

    const data = await getSpecies();

    data
        .filter(x => x.category === "Plant")
        .forEach(s => {

            cmb.innerHTML +=

            `<option value="${s.species_id}">

                ${s.scientific_name}

            </option>`;

        });

}

/*********************************************************************
 Load Forest Ranges
*********************************************************************/
async function loadForestRanges() {

    const cmb = document.getElementById("cmbRange");

    cmb.innerHTML = "";

    const data = await getForestRanges();

    data.forEach(r => {

        cmb.innerHTML +=

        `<option value="${r.range_id}">

            ${r.range_name}

        </option>`;

    });

}

/*********************************************************************
 Open Modal
*********************************************************************/
function openPlantModal() {

    document.getElementById("plantModal").style.display = "block";

    document.getElementById("txtObservedOn").value =
        new Date().toISOString().split("T")[0];

}

/*********************************************************************
 Close Modal
*********************************************************************/
function closePlantModal() {

    document.getElementById("plantModal").style.display = "none";

}

/*********************************************************************
 Save Plant
*********************************************************************/
async function savePlant() {

    try {

        const species =
            Number(document.getElementById("cmbSpecies").value);

        const range =
            Number(document.getElementById("cmbRange").value);

        const latitude =
            parseFloat(document.getElementById("txtLatitude").value);

        const longitude =
            parseFloat(document.getElementById("txtLongitude").value);

        const observedOn =
            document.getElementById("txtObservedOn").value;

        const remarks =
            document.getElementById("txtRemarks").value;

        if (isNaN(latitude) || isNaN(longitude)) {

            alert("Please enter valid coordinates.");

            return;

        }

        await addPlant(

            species,

            range,

            latitude,

            longitude,

            observedOn,

            session.user_id,

            remarks

        );

       alert("✅ Plant saved successfully.");

       clearPlantForm();

       closePlantModal();

       await loadPlants();

    }

    catch (err) {

        console.error(err);

        alert("Unable to save plant.\n\n" + err.message);

    }

}

/*********************************************************************
 Edit Plant
*********************************************************************/
async function editPlant(id){

    console.log("Edit", id);

}

/*********************************************************************
 Delete Plant
*********************************************************************/
async function deletePlant(id){

    console.log("Delete", id);

}

/*********************************************************************
 View Plant
*********************************************************************/
async function viewPlant(id){

    console.log("View", id);

}

/*********************************************************************
 Clear Plant Form
*********************************************************************/
function clearPlantForm() {

    document.getElementById("cmbSpecies").selectedIndex = 0;

    document.getElementById("cmbRange").selectedIndex = 0;

    document.getElementById("txtLatitude").value = "";

    document.getElementById("txtLongitude").value = "";

    document.getElementById("txtObservedOn").value = "";

    document.getElementById("txtRemarks").value = "";

}