const db = require("../models");
const mongoose = require('mongoose');
const Tutorial = db.tutorials;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tutorial."
      });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" }} : {};
    Tutorial.find(condition)
        .then (data => {
            if(!data)
                console.log("find nothing");
            else
                res.send(data);
                console.log(data);
        })
        .catch(err => {
           res.status(500).send({ message: err.message || "Some error occurred while retrieving tutorials" });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log (id);

    Tutorial.findById(id)
        .then(data =>{
            if(!data)
                res.status(404).send({message: "Not found Tutorial with id  " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send ({message: "Error fucking retrieving Tutorial with id " + err});
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not empty!"
        });
    }

    const id = req.params.id;
    console.log("data: " + req);
    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data)
                res.status(404).send({message: "Cannot update Tutorial with id=${id}. Maybe Tutorial was not found."});
            else res.send({message: "Tutorial was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({message: "Error updating Tutorial with id= " + err});
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);

    Tutorial.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id = ${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error: " + err
            })
        })
};

exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
        .then(data => {
            res.send({ message: `${data.deletedCount} Tutorials were deleted successfully` });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occured while removing all tutorials." });
        })
};

exports.findAllPublished = (req, res) => {

};