import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

const withDB = async (operations, res) => {
	try {
		const client = await MongoClient.connect("mongodb://localhost:27017", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = client.db("table-games");

		await operations(db);

		client.close();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error connecting to the database", error: error });
		console.log(error);
	}
};

app.get("/api/game/:name", async (req, res) => {
	withDB(async (db) => {
		const name = parseInt(req.params.name);

		const gameData = await db.collection("games").findOne({ id: name });
		res.status(200).json(gameData);
	}, res);
});

app.get("/api/games", async (req, res) => {
	withDB(async (db) => {
		const gameData = await db
			.collection("games")
			.find({}, gameData)
			.toArray()
			.then((items) => {
				return items;
			});
		res.status(200).send(gameData);
	}, res);
});

app.post("/api/game/insert", async (req, res) => {
	withDB(async (db) => {
		await db.collection("games").insertOne(req.body);
		res.status(200).send("Success!");
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen("8000", () => console.log("Listening..."));
