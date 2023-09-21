import {DEV_URL_SERVICE_BASE} from "./constants.js";

export const ping = async () => {
    const response = await fetch(`${DEV_URL_SERVICE_BASE}/image-upload/api/ping`, {
        method: 'POST'
    });
    return await response.json()
}