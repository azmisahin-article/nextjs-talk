/**
 * @file read
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://www.mongodb.com/features/mongodb-rest-api
 * */

import { readPartner, readPartnerByFilter } from "@/lib/controllers";
import { run } from "../middleware";

/**
 * post
 * partner
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {

    try {

        // 
        await run(req, res)

        // Get data submitted in request's body.
        let body = req.body

        // filter checks
        if (!body) {
            // if need
        }

        // Main Logic
        let partners;

        // logic check partner
        partners = body != null ? await readPartner() : await readPartnerByFilter(body)

        // finaly logic        
        let results = await partners

        // reponse result
        if (!results) res
            .status(404)
            .send("Not found");
        else res
            .status(200)
            .send(results);
    } catch (error) {
        res
            // 422 Unprocessable Entity
            .status(422)
            .send(error)
    }
}