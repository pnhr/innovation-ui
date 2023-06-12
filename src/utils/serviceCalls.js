
import { protectedResources } from "../authConfig";

export const getData = async (uri) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Ocp-Apim-Subscription-Key', '4df45bfe83204ec19b9b82f2ee0745d2');

    const bearer = `Bearer `;
    headers.append("Authorization", bearer);

    let options = {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: headers
    };

    let data = await fetch(uri, options)
        .then(r => r.json())
        .then(resp => resp)
        .catch(error => console.error("Error at getData : ", error));
    return data;
}

export const postData = async (uri, data) => {

    let optioins = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    var result = await fetch(uri, optioins)
        .then(r => r.json())
        .then(resp => resp)
        .catch(error => console.error("Error at getData : ", error));

    return result
}