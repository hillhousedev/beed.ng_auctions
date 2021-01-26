const db = require("../models")
const Auction = db.auctions;
const Op = db.Sequelize.Op;

// Create and save a new Auction
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    // Create auction 
    const auction = {
        title: req.body.title,
        start_time: req.body.start_time,
        end_time: req.body.end_time 
    };

    console.log(auction);
    // Save Auction in the database
    Auction.create(auction)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the auction."
            });
        });

};


//Retrieve all Auctions from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Auction.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving auctions."
            });
        });
};



// Find a single Auction with an Id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Auction.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Auction with id=" + id
            });
        });
};

// Update a Auction by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Auction.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Auction was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannnot update Auction with id=${id}. Maybe Auction was not found or req.body is empty!`

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Auction with id=" + id
            });
        });
};

// Delete a Auction with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;

    Auction.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Auction was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Auction with id=${id}. Maybe Auction was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Auction with id=" + id
            });
        });

};

// Delete all Auctions from the database.
exports.deleteAll = (req, res) => {
    Auction.destroy({
        where: {},
        truncate: false

    })
        .then(nums => {
            res.send({ message: `${nums} Auctions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all Auctions."
            });
        });
};


// // Find all published Auctions
// exports.findAllClosed = (req, res) => {
//     Auction.findAll({ where: { closed: true } })
//         .then(data => {
//             res.send(data);

//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occured while retrieving Auctions."
//             });
//         });
// };

