const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
})

const user = mongoose.model('user', userSchema)

const uri = "mongodb://localhost:27017/shoe-store"

async function connectDb() {
    try {
        await mongoose.connect(uri)
        console.log(`✅ MongoDb connected successfully! Uri: ${uri}`);
    } catch (error) {
        console.log(`❌ MongoDB connection failed! Error: ${error}`);
    }
}

connectDb()

async function addUser(name, email) {
    const newUser = new user({ name: name, email: email })
    await newUser.save()
    console.log(`➕ Name: ${name} | Email: ${email}`);
}

async function searchUser(name) {
    const foundUser = await user.findOne({ name })

    if (foundUser) {
        console.log(`✅ User found! \n Name: ${foundUser.name} \n Email: ${foundUser.email} \n Id: ${foundUser.id}`);
    }
    else {
        console.log(`❌ User not found!`);
    }
}
addUser('Peter', 'peter@example.com')
searchUser('Peter')