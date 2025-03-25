import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("users");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
    let collection = await db.collection("users");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if(!result) {
        res.send("Usuário não encontrado!").status(404);
    } else res.send(result).status(200);
})

router.post("/", async (req, res) => {
    try {
        let newDocument = {
            username: req.body.username,
            password: req.body.password
        }
        let collection = await db.collection("users");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar usuário");
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                username: req.body.username,
                password: req.body.password
            }
        }

        let collection = await db.collection("users");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar usuário");
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        let collection = await db.collection("users");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao deletar usuário");
    }
})

export default router;