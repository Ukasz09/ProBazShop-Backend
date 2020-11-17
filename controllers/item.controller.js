const db = require("../models");
const Item = db.items;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create an item
  const item = new Item({

              name: req.body.name,
              description: req.body.description,              
              imageURL: req.body.imageURL,
              size: req.body.size,
              color: req.body.color,
              price: req.body.price,
              starRating: req.body.starRating,
              category: req.body.category,
              colorGroup: req.body.colorGroup,
              availableQty: req.body.availableQty
          },
);

  // Save Item in the database
  item
    .save(item)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

//Find all items with given words in name
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Item.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items. "
      });
    });
};

// Find an single Item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Item.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Item with id=" + id });
    });
};
  
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found!`
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};


// Delete an Item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
        });
      } else {
        res.send({
          message: "Item was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id
      });
    });
};
  
//delete all items
exports.deleteAll = (req, res) => {
  Item.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Items were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all items."
      });
    });
};

exports.filter = (req, res) =>  {

  var filterCategory = req.body.category;
  var filterColor = req.body.color;
  var filterSize = req.body.size;
  

  let filterParameters;

  if (filterColor != '' && filterCategory != '' && filterBrand != '') {
      filterParameters = { $and: [{ name: filterSize }, { $and: [{ category: filterCategory }, { brand: filterBrand }] }]};
  }
  else if (filterSize == '' && filterCategory != '' && filterColor != '') {
      filterParameters = { $and: [{ category: filterCategory }, { brand: filterBrand }] };
  }
  else if (filterSize != '' && filterCategory == '' && filterBrand != '') {
      filterParameters = { $and: [{ name: name }, { brand: filterBrand }] };
  }
  else if (filterSize != '' && filterCategory != '' && filterBrand == '') {
      filterParameters = { $and: [{ name: name }, { category: filterCategory }] };
  }
  else if (filterSize == '' && filterCategory == '' && filterBrand != '') {
      filterParameters = { brand: filterBrand };
  }
  else if (filterSize != '' && filterCategory == '' && filterBrand == '') {
      filterParameters = { name: filterSize };
  }
  else if (filterSize == '' && filterCategory != '' && filterBrand == '') {
      filterParameters = { category:filterCategory };
  }
  else {
      filterParameters = {};
  }

  Item.find(filterParameters, (err, doc) => {
      if (!err) {
          res.render({
              list: doc
          });
      }
      else {
          console.log('Error in retrieving product list : ' + err);
      }
  });
 
};

