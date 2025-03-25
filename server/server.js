import express from 'express';
import cors from 'cors';
import path from 'path';

import events from "./routes/events.js";
import users from "./routes/users.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/static", express.static(path.resolve("src", "static")));
app.use("/events", events);
app.use("/users", users);


app.get("/*", (req, res) => {
    res.sendFile(path.resolve("src", "index.html"));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
