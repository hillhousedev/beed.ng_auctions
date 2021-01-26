const fs = require("fs");

const db = require("../models");
const Image = db.auctions;

const uploadFiles = async ( req, res ) => {
    try {
        console.log(req.file);

        if (req.file == undefined){
            return res.send(`You must select a file.`);
        }

        
    }
}