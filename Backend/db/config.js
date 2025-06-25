const mongoose = require('mongoose');

const connectToDatabase = async () => {
    const stringConnection = process.env.DB_CNN;
    try {
        await mongoose.connect(stringConnection);
        console.log("Conectado a la DB");
    } catch (error) {
        console.error("Error")
        throw new Error();
    }
}
module.exports = {
    connectToDatabase
}