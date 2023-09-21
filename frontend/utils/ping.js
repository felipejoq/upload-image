import {DEV_URL_SERVICE_BASE} from "../config/constants.js";

export const ping = async () => {
    const response = await fetch(`${DEV_URL_SERVICE_BASE}/api/ping`, {
        method: 'POST'
    });
    return await response.json()
}