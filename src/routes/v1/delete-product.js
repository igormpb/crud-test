const db = require("../../database/database");

const productDelete = async (req, res) => {
    const {idproduct} = req.params

    if(!idproduct){
        res.send({
            status: 400,
            code: "PT0010",
            meesage: "Os campos são obrigatórios."
        })
    }

    let isHaveProduct;
    isHaveProduct = await ShowIdProduct(idproduct, res)
    if(!isHaveProduct){
        res.send({
            status: 400,
            code: "PT0011",
            message: "Este produto não existe!"
        })
    }

    let data; 
    data = await deleteQuery(idproduct, res);
    res.send({status: data.status})
}

const ShowIdProduct = (idproduct, res) => {
    return new Promise(async (resolve, reject) =>{
        await db.query("SELECT * FROM product WHERE idproduct = ?", [idproduct], (err, result) => {
            try {
                if(err){
                    console.log(err);
                    res.send({
                        status: 500,
                        code: "PT0012",
                        message: "Algo aconteceu, tente novamente."
                    })
                }
                if(result.length === 0){
                    resolve(false)
                }
                resolve(true)
            } catch (error) {
                console.log(error);
                    res.send({
                        status: 500,
                        code: "PT0013",
                        message: "Algo aconteceu, tente novamente."
                    })
            }
        })
    })
}
const deleteQuery = (idproduct, res) =>{
    return new Promise(async (resolve, reject) => {
        try {
            await db.query("DELETE FROM product WHERE idproduct = ?", [idproduct], (err, result) => {
                if(err){
                    console.log(err)
                    res.send({
                        status: 500,
                        code: "PT0014",
                        message: "Algo aconteceu, tente novamente."
                    });
                    db.end();
                    return
                }
                resolve({
                    status: 200,
                });
            })
        } catch (error) {
            console.log(error)
            res.send({
                status: 500,
                code: "PT0015",
                message: "Algo aconteceu, tente novamente."
            });
            return
        }
    });
}

module.exports = productDelete;

