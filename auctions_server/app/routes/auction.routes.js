module.exports = app => {
    const auctions = require("../controllers/auction.controller.js");

    var router = require("express").Router();

    // Create a new auction
    router.post("/", auctions.create);

    // Retrieve all auctions
    router.get("/", auctions.findAll);

    // router.get("/pubslished", auctions.findAllPublished);

    // Retrieve a single auction with id
    router.get("/:id", auctions.findOne);

    router.put(":id", auctions.update);

    router.delete(":id", auctions.delete);

    router.delete("/", auctions.deleteAll);

    app.use('/api/auctions', router);
}