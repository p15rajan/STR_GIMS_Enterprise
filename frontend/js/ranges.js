import {
    getForestRanges,
    getForestRange,
    addForestRange,
    updateForestRange,
    deleteForestRange
} from "./api.js";

let editingRangeId = null;

/*********************************************************************
 Initialize
*********************************************************************/
export async function initializeRanges() {

    registerEvents();

    await loadRanges();

}

/*********************************************************************
 Register Events
*********************************************************************/
function registerEvents() {

    document
        .getElementById("btnSaveRange")
        .addEventListener("click", saveRange);

    document
        .getElementById("btnClearRange")
        .addEventListener("click", clearForm);

}

/*********************************************************************
 Load Ranges
*********************************************************************/
async function loadRanges() {

    try {

        const data = await getForestRanges();

        const tbody =
            document.querySelector("#tblRanges tbody");

        tbody.innerHTML = "";

        data.forEach(r => {

            const tr = document.createElement("tr");

            tr.innerHTML = `

                <td>${r.range_id}</td>

                <td>${r.range_name}</td>

                <td>${r.division}</td>

                <td>${r.district}</td>

                <td>

                    <button class="editRange"
                        data-id="${r.range_id}">
                        Edit
                    </button>

                    <button class="deleteRange"
                        data-id="${r.range_id}">
                        Delete
                    </button>

                </td>

            `;

            tbody.appendChild(tr);

        });

        registerGridEvents();

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

}

/*********************************************************************
 Grid Events
*********************************************************************/
function registerGridEvents() {

    document
        .querySelectorAll(".editRange")
        .forEach(btn => {

            btn.onclick = () =>
                editRange(Number(btn.dataset.id));

        });

    document
        .querySelectorAll(".deleteRange")
        .forEach(btn => {

            btn.onclick = () =>
                deleteRangeRecord(Number(btn.dataset.id));

        });

}

/*********************************************************************
 Save
*********************************************************************/
async function saveRange() {

    try {

        const rangeName =
            document.getElementById("txtRangeName").value.trim();

        const division =
            document.getElementById("txtDivision").value.trim();

        const district =
            document.getElementById("txtDistrict").value.trim();

        if (!rangeName) {

            alert("Range Name is required.");

            return;

        }

        if (editingRangeId == null) {

            await addForestRange(

                rangeName,
                division,
                district

            );

            alert("Forest Range added successfully.");

        }
        else {

            await updateForestRange(

                editingRangeId,
                rangeName,
                division,
                district

            );

            alert("Forest Range updated successfully.");

        }

        clearForm();

        await loadRanges();

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

}

/*********************************************************************
 Edit
*********************************************************************/
async function editRange(id) {

    try {

        const data =
            await getForestRange(id);

        if (!data || data.length === 0) {

            alert("Forest Range not found.");

            return;

        }

        const r = data[0];

        editingRangeId = id;

        document.getElementById("txtRangeName").value =
            r.range_name;

        document.getElementById("txtDivision").value =
            r.division;

        document.getElementById("txtDistrict").value =
            r.district;

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

}

/*********************************************************************
 Delete
*********************************************************************/
async function deleteRangeRecord(id) {

    if (!confirm("Delete this Forest Range?"))
        return;

    try {

        await deleteForestRange(id);

        await loadRanges();

    }
    catch (err) {

        console.error(err);

        alert(err.message);

    }

}

/*********************************************************************
 Clear
*********************************************************************/
function clearForm() {

    editingRangeId = null;

    document.getElementById("txtRangeName").value = "";

    document.getElementById("txtDivision").value = "";

    document.getElementById("txtDistrict").value = "";

}