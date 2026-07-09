import {

    getSpecies,
    getSpeciesById,
    addSpecies,
    updateSpecies,
    deleteSpecies

} from "./api.js";

let editingSpeciesId = null;

/*********************************************************************
 Initialize
*********************************************************************/
export async function initializeSpecies() {

    registerEvents();

    await loadSpecies();

}

/*********************************************************************
 Register Events
*********************************************************************/
function registerEvents() {

    document
        .getElementById("btnSaveSpecies")
        .onclick = saveSpecies;

    document
        .getElementById("btnClearSpecies")
        .onclick = clearForm;

}

/*********************************************************************
 Load Species
*********************************************************************/
async function loadSpecies() {

    try {

        const data = await getSpecies();

        const tbody =
            document.querySelector("#tblSpecies tbody");

        tbody.innerHTML = "";

        data.forEach(s => {

            tbody.innerHTML += `

<tr>

<td>${s.species_id}</td>

<td>${s.scientific_name}</td>

<td>${s.common_name}</td>

<td>${s.kingdom}</td>

<td>${s.family}</td>

<td>${s.iucn_status}</td>

<td>${s.category}</td>

<td>

<button class="editSpecies"
data-id="${s.species_id}">

Edit

</button>

<button class="deleteSpecies"
data-id="${s.species_id}">

Delete

</button>

</td>

</tr>

`;

        });

        registerGridEvents();

    }

    catch(err){

        alert(err.message);

    }

}

function registerGridEvents(){

    document
    .querySelectorAll(".editSpecies")
    .forEach(btn=>{

        btn.onclick=()=>editSpecies(
            Number(btn.dataset.id)
        );

    });

    document
    .querySelectorAll(".deleteSpecies")
    .forEach(btn=>{

        btn.onclick=()=>deleteSpeciesRecord(
            Number(btn.dataset.id)
        );

    });

}

/*********************************************************************
 Save Species
*********************************************************************/
async function saveSpecies() {

    try {

        const scientificName =
            document.getElementById("txtScientificName").value.trim();

        const commonName =
            document.getElementById("txtCommonName").value.trim();

        const kingdom =
            document.getElementById("txtKingdom").value.trim();

        const family =
            document.getElementById("txtFamily").value.trim();

        const iucn =
            document.getElementById("cmbIUCN").value;

        const category =
            document.getElementById("cmbCategory").value;

        if (scientificName === "") {

            alert("Scientific Name is required.");

            return;

        }

        if (editingSpeciesId == null) {

            await addSpecies(

                scientificName,
                commonName,
                kingdom,
                family,
                iucn,
                category

            );

            alert("Species added successfully.");

        }
        else {

            await updateSpecies(

                editingSpeciesId,
                scientificName,
                commonName,
                kingdom,
                family,
                iucn,
                category

            );

            alert("Species updated successfully.");

        }

        clearForm();

        await loadSpecies();

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

}

/*********************************************************************
 Edit Species
*********************************************************************/
async function editSpecies(id) {

    try {

        const data =
            await getSpeciesById(id);

        if (!data || data.length === 0) {

            alert("Species not found.");

            return;

        }

        const s = data[0];

        editingSpeciesId = id;

        document.getElementById("txtScientificName").value =
            s.scientific_name;

        document.getElementById("txtCommonName").value =
            s.common_name;

        document.getElementById("txtKingdom").value =
            s.kingdom;

        document.getElementById("txtFamily").value =
            s.family;

        document.getElementById("cmbIUCN").value =
            s.iucn_status;

        document.getElementById("cmbCategory").value =
            s.category;

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

}

/*********************************************************************
 Delete Species
*********************************************************************/
async function deleteSpeciesRecord(id) {

    if (!confirm("Delete this Species?"))
        return;

    try {

        await deleteSpecies(id);

        await loadSpecies();

    }
    catch (err) {

        console.error(err);

    
        if (err.message.includes("23503")) {

    alert(
        "Cannot delete this species because it is being used by one or more Plant or Animal observations."
    );

}
else {

    alert(err.message);

}

    }

}

/*********************************************************************
 Clear Form
*********************************************************************/
function clearForm() {

    editingSpeciesId = null;

    document.getElementById("txtScientificName").value = "";

    document.getElementById("txtCommonName").value = "";

    document.getElementById("txtKingdom").value = "";

    document.getElementById("txtFamily").value = "";

    document.getElementById("cmbIUCN").selectedIndex = 0;

    document.getElementById("cmbCategory").selectedIndex = 0;

}

