/*********************************************************************
 STR GIMS Enterprise
 Animals Module
*********************************************************************/

import {

    getAnimals,
    getAnimal,
    getSpecies,
    getForestRanges,
    addAnimal,
    updateAnimal,
    deleteAnimal

} from "./api.js";

let animals = [];
let filteredAnimals = [];

let editingAnimalId = null;

const session = JSON.parse(sessionStorage.getItem("gims_session"));

/*********************************************************************
 Initialize Animals
*********************************************************************/
export async function initializeAnimals() {

    console.log("Animals Initialized");

    registerEvents();

    await loadSpecies();

    await loadForestRanges();

    await loadAnimals();

}

/*********************************************************************
 Register Events
*********************************************************************/
function registerEvents() {

    document.getElementById("btnRefresh").onclick =
        loadAnimals;

    document.getElementById("btnAddAnimal").onclick =
        openAnimalModal;

    document.getElementById("btnCancelAnimal").onclick =
        closeAnimalModal;

    document.getElementById("btnSaveAnimal").onclick =
        saveAnimal;

    document.getElementById("txtSearch").onkeyup =
        filterAnimals;

    document.getElementById("btnCloseAnimalView").onclick = () => {

        document.getElementById("viewAnimalModal").style.display = "none";

    };

}

/*********************************************************************
 Load Animals
*********************************************************************/
async function loadAnimals() {

    try {

        animals = await getAnimals();

        filteredAnimals = [...animals];

        drawTable(filteredAnimals);

        registerGridEvents();

    }

    catch (err) {

        console.error(err);

        alert("Unable to load animal observations.");

    }

}

/*********************************************************************
 Draw Table
*********************************************************************/
function drawTable(rows) {

    const tbody =
        document.querySelector("#animalsTable tbody");

    tbody.innerHTML = "";

    if (!rows || rows.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center">
                    No animal records found.
                </td>
            </tr>`;

        return;

    }

    rows.forEach(a => {

        tbody.innerHTML += `

<tr>

<td>${a.scientific_name}</td>

<td>${a.common_name}</td>

<td>${a.range_name}</td>

<td>${a.gender}</td>

<td>${a.age_class}</td>

<td>${Number(a.latitude).toFixed(6)}</td>

<td>${Number(a.longitude).toFixed(6)}</td>

<td>${a.observed_on}</td>

<td>

<button class="btnEdit"
data-id="${a.animal_id}">

✏ Edit

</button>

<button class="btnDelete"
data-id="${a.animal_id}">

🗑 Delete

</button>

<button class="btnView"
data-id="${a.animal_id}">

👁 View

</button>

</td>

</tr>

`;

    });

}

/*********************************************************************
 Search Animals
*********************************************************************/
function filterAnimals() {

    const text = document
        .getElementById("txtSearch")
        .value
        .trim()
        .toLowerCase();

    filteredAnimals = animals.filter(a =>

        (a.scientific_name ?? "").toLowerCase().includes(text) ||

        (a.common_name ?? "").toLowerCase().includes(text) ||

        (a.range_name ?? "").toLowerCase().includes(text) ||

        (a.gender ?? "").toLowerCase().includes(text) ||

        (a.age_class ?? "").toLowerCase().includes(text)

    );

    drawTable(filteredAnimals);

    registerGridEvents();

}

/*********************************************************************
 Register Grid Events
*********************************************************************/
function registerGridEvents() {

    document
        .querySelectorAll(".btnEdit")
        .forEach(btn => {

            btn.onclick = () => {

                editAnimal(Number(btn.dataset.id));

            };

        });

    document
        .querySelectorAll(".btnDelete")
        .forEach(btn => {

            btn.onclick = () => {

                deleteAnimalRecord(Number(btn.dataset.id));

            };

        });

    document
        .querySelectorAll(".btnView")
        .forEach(btn => {

            btn.onclick = () => {

                viewAnimal(Number(btn.dataset.id));

            };

        });

}

/*********************************************************************
 Load Animal Species
*********************************************************************/
async function loadSpecies() 

{

    console.log("******** loadSpecies() ********");
    
    try {

        const cmb =
            document.getElementById("cmbAnimalSpecies");

        cmb.innerHTML = "";

        const data = await getSpecies();

        data
            .filter(s => s.category === "Animal")
            .forEach(s => {

                cmb.innerHTML += `
                    <option value="${s.species_id}">
                        ${s.scientific_name}
                    </option>`;

            });

    }

    catch (err) {

        console.error(err);

        alert("Unable to load animal species.");

    }

}

/*********************************************************************
 Load Forest Ranges
*********************************************************************/
async function loadForestRanges() {

    try {

        const cmb =
            document.getElementById("cmbAnimalRange");

        cmb.innerHTML = "";

        const data = await getForestRanges();

        data.forEach(r => {

            cmb.innerHTML += `
                <option value="${r.range_id}">
                    ${r.range_name}
                </option>`;

        });

    }

    catch (err) {

        console.error(err);

        alert("Unable to load forest ranges.");

    }

}

/*********************************************************************
 Open Animal Modal
*********************************************************************/
function openAnimalModal() {

    editingAnimalId = null;

    clearAnimalForm();

    document.getElementById("animalModalTitle").innerHTML =
        "Add Animal Observation";

    document.getElementById("animalModal").style.display =
        "block";

    document.getElementById("txtAnimalObservedOn").value =
        new Date().toISOString().split("T")[0];

}

/*********************************************************************
 Close Animal Modal
*********************************************************************/
function closeAnimalModal() {

    document.getElementById("animalModal").style.display =
        "none";

}

/*********************************************************************
 Clear Animal Form
*********************************************************************/
function clearAnimalForm() {

    document.getElementById("cmbAnimalSpecies").selectedIndex = 0;

    document.getElementById("cmbAnimalRange").selectedIndex = 0;

    document.getElementById("cmbGender").selectedIndex = 0;

    document.getElementById("cmbAgeClass").selectedIndex = 0;

    document.getElementById("txtAnimalLatitude").value = "";

    document.getElementById("txtAnimalLongitude").value = "";

    document.getElementById("txtAnimalObservedOn").value = "";

    document.getElementById("txtAnimalRemarks").value = "";

}

/*********************************************************************
 Save Animal
*********************************************************************/
async function saveAnimal() {

    try {

        const species =
            Number(document.getElementById("cmbAnimalSpecies").value);

        const range =
            Number(document.getElementById("cmbAnimalRange").value);

        const gender =
            document.getElementById("cmbGender").value;

        const ageClass =
            document.getElementById("cmbAgeClass").value;

        const latitude =
            parseFloat(document.getElementById("txtAnimalLatitude").value);

        const longitude =
            parseFloat(document.getElementById("txtAnimalLongitude").value);

        const observedOn =
            document.getElementById("txtAnimalObservedOn").value;

        const remarks =
            document.getElementById("txtAnimalRemarks").value;

        if (isNaN(latitude) || isNaN(longitude)) {

            alert("Please enter valid latitude and longitude.");

            return;

        }

if (editingAnimalId === null) {

    await addAnimal(

        species,
        range,
        gender,
        ageClass,
        latitude,
        longitude,
        observedOn,
        session.user_id,
        remarks

    );

    alert("✅ Animal observation added successfully.");

}
else {

    await updateAnimal(

        editingAnimalId,
        species,
        range,
        gender,
        ageClass,
        latitude,
        longitude,
        observedOn,
        remarks

    );

    alert("✅ Animal observation updated successfully.");

}

closeAnimalModal();

clearAnimalForm();

await loadAnimals();

}

catch (err) {

    console.error(err);

    alert("Unable to save animal.\n\n" + err.message);

}

}

/*********************************************************************
 Edit Animal
*********************************************************************/
async function editAnimal(id) {

    try {

        const data = await getAnimal(id);

        if (!data || data.length === 0) {

            alert("Animal observation not found.");

            return;

        }

        const a = data[0];

        editingAnimalId = id;

        document.getElementById("animalModalTitle").innerHTML =
            "Edit Animal Observation";

        document.getElementById("cmbAnimalSpecies").value =
            a.species_id;

        document.getElementById("cmbAnimalRange").value =
            a.range_id;

        document.getElementById("cmbGender").value =
            a.gender;

        document.getElementById("cmbAgeClass").value =
            a.age_class;

        document.getElementById("txtAnimalLatitude").value =
            a.latitude;

        document.getElementById("txtAnimalLongitude").value =
            a.longitude;

        document.getElementById("txtAnimalObservedOn").value =
            a.observed_on;

        document.getElementById("txtAnimalRemarks").value =
            a.remarks ?? "";

        document.getElementById("animalModal").style.display =
            "block";

    }

    catch (err) {

        console.error(err);

        alert("Unable to load animal details.");

    }

}

/*********************************************************************
 Delete Animal
*********************************************************************/
async function deleteAnimalRecord(id) {

    if (!confirm("Are you sure you want to delete this animal observation?"))
        return;

    try {

        await deleteAnimal(id);

        alert("✅ Animal observation deleted successfully.");

        await loadAnimals();

    }

    catch (err) {

        console.error(err);

        alert("Unable to delete animal.\n\n" + err.message);

    }

}

/*********************************************************************
 View Animal
*********************************************************************/
async function viewAnimal(id) {

    try {

        const data = await getAnimal(id);

        if (!data || data.length === 0) {

            alert("Animal observation not found.");

            return;

        }

        const a = data[0];

        document.getElementById("viewAnimalScientific").innerHTML =
            a.scientific_name ?? "";

        document.getElementById("viewAnimalCommon").innerHTML =
            a.common_name ?? "";

        document.getElementById("viewAnimalRange").innerHTML =
            a.range_name ?? "";

        document.getElementById("viewAnimalGender").innerHTML =
            a.gender ?? "";

        document.getElementById("viewAnimalAgeClass").innerHTML =
            a.age_class ?? "";

        document.getElementById("viewAnimalLatitude").innerHTML =
            Number(a.latitude).toFixed(6);

        document.getElementById("viewAnimalLongitude").innerHTML =
            Number(a.longitude).toFixed(6);

        document.getElementById("viewAnimalObservedOn").innerHTML =
            a.observed_on;

        document.getElementById("viewAnimalRemarks").innerHTML =
            a.remarks ?? "";

        document.getElementById("viewAnimalModal").style.display =
            "block";

    }

    catch (err) {

        console.error(err);

        alert("Unable to load animal observation.");

    }

}
