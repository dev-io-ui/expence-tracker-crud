
const Expence = require('../models/expence');

exports.getAllExpence = (req, res, next) => {
    Expence.findAll()
    .then((users)=>{
        console.log(users)
        res.status(200).json(users);
    })
    .catch((err)=>{
        console.log("err in getAllApoointment method");
    });
  };
  
  exports.postAddExpence= (req, res, next) => {
    const price = req.body.price;
    const product_details = req.body.product_details;
    const catagary = req.body.catagary;
    
    Expence.create({
        price: price,
        product_details: product_details,
        catagary: catagary,
    })
   .then((user)=>{
    console.log("appointmnet created successfully");
    console.log(res);
    res.status(201).json({ message: 'Appointment created', user });
    })
    .catch((err)=>{
      console.log(err , 'in postAddAppoin method');
    });

     
   
  };

  exports.deleteExpence = (req,res,next)=>{
    const id = req.params.id;
    Expence.destroy({
        where : {
            id:id
        }
    })
    .then((result)=>{
        console.log(result,"user deleted");
        res.status(200);
    })
    .catch((err)=>{
        console.log(err ,"error while deleting user by id");
    })
  }

  exports.editExpence = (req,res,next)=>{
    const id = req.params.id;
    const updatedUser = req.body;

    Expence.update(updatedUser, {
        where: {
            id: id
        }
    })
    .then(([updatedCount]) => {
        if (updatedCount === 0) {
            return res.json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'user updated successfully' });
    })
    .catch((err)=>{
        console.log(err ,"error while edititng user by id");
    });
  }