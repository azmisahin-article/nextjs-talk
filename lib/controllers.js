/**
 * @file Controllers
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://www.mongodb.com/features/mongodb-rest-api
 * */

// import required modules
import { ObjectId } from "mongodb";

/**
 * create partner
 * @param {partner} document model
 * @returns Document<partner>
 */
export async function createPartner(document) {

    // pre logic
    document.calendar = new Date();

    // get collection
    let collection = await getCollection("partner");

    // add document
    let response = await collection
        .insertOne(document);

    // after logic
    if (response && response.acknowledged) {
        document._id = response.insertedId
        return document;
    } else return null;
}

/**
 * read all partner
 * @returns [partner]
 */
export async function readPartner() {
    // get collection
    let collection = await getCollection("partner");

    // find them
    let results = await collection
        .find({
            "calendar": {
                $lt: new Date(),
                // last 1 day
                $gte: new Date(new Date().setDate(new Date().getDate() - 24))
            }
        })
        // last record
        .sort({ $natural: -1 })
        //
        .toArray();

    // response
    return results;
}

/**
 * read partner with filter parameter
 * @returns [partner]
 * @param {JSON} filter parameter
 */
export async function readPartnerByFilter(filter) {
    // get collection
    let collection = await getCollection("partner");

    // find them
    let results = await collection
        .find(filter)
        // last record
        .sort({ $natural: -1 })
        //
        .toArray();

    // response
    return results;
}

/**
 * read partner by id
 * @param {ObjectId} id 
 * @returns partner
 */
export async function readPartnerById(id) {
    // get collection
    let collection = await getCollection("partner");

    // find them
    let results = await collection
        .findOne({
            _id: new ObjectId(id)
        })

    // response
    return results;
}

/**
 * update partner by id
 * @param {ObjectId} id
 * @param {JSON} document 
 * @returns partner
 */
export async function updatePartnerById(id, document) {
    // get collection
    let collection = await getCollection("partner");

    // create a filter
    const filter = { _id: new ObjectId(id) }
    // create a document that sets
    const update = {
        $set: document
    }
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };

    // find them
    let results = await collection
        .updateOne(filter, update, options);

    // response
    return results;
}

/**
 * delete partner by id
 * @param {ObjectId} id
 * @returns partner
 */
export async function deletePartnerById(id) {
    // get collection
    let collection = await getCollection("partner");

    // create a filter
    const filter = { _id: new ObjectId(id) }

    // find them
    let results = await collection
        .deleteOne(filter);

    // response
    return results;
}
