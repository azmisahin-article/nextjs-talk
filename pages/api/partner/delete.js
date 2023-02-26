/**
 * @file delete
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://www.mongodb.com/features/mongodb-rest-api
 * */

import { deletePartnerById } from "@/lib/controllers";
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

        // Guard clause checks
        if (!body) res
            .status(400)
            .send("Bad request")

        // add ip
        body.ip = req.clientIp

        // Main Logic
        let partner;

        // check partner
        partner = await readPartnerById(body._id)

        // no record
        if (!partner) {
            res
                .status(406)
                .send("Not Acceptable Request")
        } else {
            // delete logic
            partner = await deletePartnerById(body._id)
        }

        // finaly logic        
        let results = await partner

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