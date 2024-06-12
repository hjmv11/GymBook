// This section will connect to the database and listen for server start.
const mongoose = require('mongoose')

const db = async() => {
    try {
        await mongoose.connect(process.env.ATLAS_URI)
    } catch (e) {
        console.log(e)
    }
}

module.exports = db

