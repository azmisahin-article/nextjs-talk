/**
 * @file Cross-origin resource sharing
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
 * @see https://github.com/expressjs/cors
 * */

import Cors from 'cors'
import requestIp from 'request-ip'

// Initializing the cors middleware
const cors = Cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export async function run(req, res) {

    req.clientIp = requestIp.getClientIp(req);

    return new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}