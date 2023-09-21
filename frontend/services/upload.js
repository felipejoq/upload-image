import {DEV_URL_SERVICE_BASE} from "../config/constants.js";

export const uploadImage = async (form) => {
    const data = new FormData(form);

    const response = await fetch(`${DEV_URL_SERVICE_BASE}/api/upload`, {
        method: 'POST',
        body: data
    });

    const responseServer = await response.json();

    if (!response.ok) {
        throw new Error(responseServer.error);
    }

    return responseServer;
}