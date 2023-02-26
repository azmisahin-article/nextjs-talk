/**
 * @file collection
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 * @see https://www.mongodb.com/features/mongodb-rest-api
 * */

// import required modules
import client from "./database.js";

// defination
var connection
var db;

// database Name
const databaseName = process.env.ARTICLE_CLUSTER_DATABASE || "";

/**
 * Global connection
 */
async function globalConfiguration() {
    if (!global.db) {
        connection = await client.connect();
        global.db = connection.db(databaseName)
    }
    db = global.db
}

/**
 * get document collection
 * @param {string} collactionName collaction name
 * @returns DB.collection<Document>
 */
export async function getCollection(collactionName) {
    // Global confiuration
    await globalConfiguration()
    // get collection
    return await db.collection(collactionName);
}