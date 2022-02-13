const {tb_user, tb_transaction, tb_product, tb_topping} = require('../../models')

exports.addTransaction = async (req,res) => {
    try {
        await tb_transaction.create(req.body)

        res.send({
            status: "Success",
            message: "Add Transaction Successfully"
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
}