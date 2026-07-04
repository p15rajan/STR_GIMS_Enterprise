/*********************************************************************
 STR GIMS Enterprise
 System Health Monitor
*********************************************************************/

import CONFIG from "./config.js";

const STATUS = {

    postgrest: false,

    geoserver: false

};

async function checkPostgREST() {

    try {

        const r = await fetch(CONFIG.API_URL);

        STATUS.postgrest = r.ok;

    }

    catch {

        STATUS.postgrest = false;

    }

}

async function checkGeoServer() {

    try {

        const r = await fetch(CONFIG.GEOSERVER);

        STATUS.geoserver = r.ok;

    }

    catch {

        STATUS.geoserver = false;

    }

}

function updateScreen() {

    const postgrest =
        document.getElementById("statusPostgREST");

    if(postgrest){

        postgrest.innerHTML =
            STATUS.postgrest ? "🟢 Online" : "🔴 Offline";

    }

    const geo =
        document.getElementById("statusGeoServer");

    if(geo){

        geo.innerHTML =
            STATUS.geoserver ? "🟢 Online" : "🔴 Offline";

    }

}

export async function monitorHealth(){

    await checkPostgREST();

    await checkGeoServer();

    updateScreen();

}

setInterval(monitorHealth,10000);