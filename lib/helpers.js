/**
 * @file user interface tools and helpers
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://www.mongodb.com/features/mongodb-rest-api
 * */

// global define
export const api = process.env.ARCTICLE_API_URL
let aborter;

/**
 * Logger
 * @param {string} type 
 * @param {any} data 
 */
async function log(type, data) {
    console[type](data)
}

/**
 * take any end point
 * @param {string} uri 
 * @param {json} options 
 * @returns 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
 */
async function take(endpoint, options = {}) {
    const uri = `${api}${endpoint}`
    const { timeout = 8000 } = options;

    aborter = new AbortController();
    const id = setTimeout(() => aborter.abort(), timeout);
    let response = null

    try {
        response = await fetch(uri, {
            ...options,
            signal: aborter.signal
        });
    } catch (error) {
        log("error", error)
    }

    clearTimeout(id);
    return response;
}

/**
 * send end point
 * @param {string} endpoint path
 * @param {json} data {}
 * @returns 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
async function send(endpoint, data) {

    let response = null
    try {
        response = await take(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    } catch (error) {
        log("error post", error)
    }

    return response
}

/**
 * get endpoint
 * @param {string} endpoint path
 * @returns [] | null
 */
export async function get(endpoint) {
    //
    let result;

    // get
    let response = await take(endpoint);

    // response success
    if (response.ok) {
        // everything is ok
        result = await response.json()
    } else {
        result = null
    }

    return result;
}

/**
 * data generation with endpoint
 * @param {string} endpoint path
 * @param {json} data 
 * @returns {} | null
 */
export async function create(endpoint, data) {

    //
    let result;

    // get
    let response = await send(endpoint, data);

    // response success
    if (response.ok) {
        // everything is ok
        result = await response.json()
    } else {
        result = null
    }

    return result;
}

/**
 * Parallel worker [ Beta ]
 * @param {[]} source 
 * @param {[]} target 
 * @returns 
 */
export async function parallelWorker(source, target) {

    let results;
    try {
        const responses = await Promise.all(target);
        for (let index = 0; index < responses.length; index++) {
            let raw = responses[index];
            let json = await target().json()
            // set default
            // result[index] = raw | json
            // set source
            source[index] = raw | json
        }
    } catch (error) {
        log("error", error)
    }
    return results;
}