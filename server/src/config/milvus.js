const { MilvusClient } = require('@zilliz/milvus2-sdk-node');
require('dotenv').config();

const MILVUS_ADDRESS = process.env.MILVUS_ADDRESS || 'localhost:19530';
const MILVUS_USERNAME = process.env.MILVUS_USERNAME;
const MILVUS_PASSWORD = process.env.MILVUS_PASSWORD;

const connectMilvus = async () => {
    try {
        const client = new MilvusClient({
            address: MILVUS_ADDRESS,
            username: MILVUS_USERNAME,
            password: MILVUS_PASSWORD,
        });
        console.log('Connected to Milvus');
        return client;
    } catch (error) {
        console.error('Failed to connect to Milvus:', error);
        return null;
    }
};

module.exports = { connectMilvus };
