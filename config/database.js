const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

    mongoose.connect("mongodb://127.0.0.1/Task-Lists", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Conectando ao mongodb"))
    .catch((err) => console.error(err));


