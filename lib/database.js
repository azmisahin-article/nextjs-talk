/**
 * @file Database
 * @author azmisahin@outlook.com
 * @description Creating Node Js api using MongoDB.
 * @see https://medium.com/@azmisahin/nodejs-mongodb-1cbf2cd8071c
 */

// import required modules
import { config } from "dotenv";
import { MongoClient } from "mongodb";
// load environment
config();

// Use UTC
process.env.TZ = 'UTC'

// database connection string
const uri = process.env.ARTICLE_CLUSTER_URL || "";

// connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// connector
const client = new MongoClient(uri, options);

// database client
export default client