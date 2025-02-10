const express = require('express');
const { MongoClient } = require("mongodb");
const path = require('path');

const app = express();
const port = 3000;


// Static dosyalar için
app.use(express.static('public'));

const uri = "mongodb+srv://saitumitunal:lal2442@cluster0.irf2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// API endpoint
app.get('/api/data', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("hs_db");
        const collection = database.collection("haksahipleri");
        
        const documents = await collection.find({}).toArray();
        res.json(documents);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Bir hata oluştu" });
    }
});

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server http://localhost:${port} adresinde çalışıyor`);
});
