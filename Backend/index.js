const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db/config');
const app = express();
const PORT = process.env.PORT || 3001;

connectToDatabase();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.status(200).send("Hola Mundo");
});

app.use("/users", require("./routes/user.routes"));
app.use("/auth", require("./routes/auth.routes"));


app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`)
});