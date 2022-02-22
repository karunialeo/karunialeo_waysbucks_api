const { tb_product, tb_user, tb_order} = require('../../models')

exports.addOrder = async (req, res) => {
    try {
        const { data } = req.body;
        // code here
        let newOrder = await tb_order.create({
            ...data,
            idUser: req.tb_user.id,
            idProduct: req.body.idProduct,
            qty: req.body.qty,
            price: req.body.price,
            toppings: req.body.toppings,
        })
            
        // code here
        res.send({
            status: 'Success...',
            data: {
                newOrder,
            }
        })


    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Server Error",
        });
    }   
};

exports.getOrders = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await tb_order.findAll({
            where: {
                idUser: id
            },
            include: [
              {
                model: tb_product,
                as: "product",
                attributes: {
                  exclude: ["idUser", "createdAt", "updatedAt"],
                },
              },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
    
        res.send({
            status: "Success on Getting Orders",
            data:{
                products: data
            },
        });
    } catch (error) {
        res.send({
        status: "Failed",
        message: "Server Error",
        });
    }
};