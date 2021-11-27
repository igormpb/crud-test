const db = require("../../database/database");

const priceUpdate = async (req, res) => {
    const {price} = req.body;
    const {idproduct} = req.params

    console.log(idproduct)
    if(!price || !idproduct){
        res.send({
            status: 400,
            code: "PT0010",
            meesage: "Os campos são obrigatórios."
        })
    }

    let data; 
    data = await update(price, idproduct, res);
    res.send({status: data.status})
}

const update = (price, idproduct, res) =>{
    return new Promise(async (resolve, reject) => {
        try {
            await db.query("UPDATE product SET price = ? WHERE idproduct = ?", [price, idproduct], (err, result) => {
                if(err){
                    console.log(err)
                    res.send({
                        status: 500,
                        code: "SP0011",
                        message: "Algo aconteceu, tente novamente."
                    });
                    db.end();
                    return
                }
                console.log(result)
                resolve({
                    status: 200,
                });
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: 500,
                code: "CG0012",
                message: "Algo aconteceu, tente novamente."
            });
            return
        }
    });
}

module.exports = priceUpdate;

