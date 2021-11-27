const db = require("../../database/database");

const productCreate = async (req,res) =>{
    const {idCategory, nameProduct, imageProduct, price} = req.body;
    
    if(!idCategory || !nameProduct || !imageProduct|| !price) {
        res.send({
            status: 400,
            code: "PT004",
            meesage: "Os campos são obrigatórios."
        })
    }

    if( typeof price !== 'number'){
        res.send({
            status: 400,
            code:"PT007",
            message: "Preço só é permitido inteiros."
        })
    }

    let iHaveCategory;
    iHaveCategory = await ShowIdCategory(idCategory,res)
   
    if(!iHaveCategory){
        res.send({
            status: 400,
            code: "PT003",
            message: "Está categoria não existe!"
        })
    }

    let data;
    data = await insertProduct(idCategory, nameProduct, imageProduct, price, res)
    if(data.code){
        res.send(data)
    }
    res.send({
        status: data.status
    })

}

const ShowIdCategory = (idCategory, res) => {
    return new Promise(async (resolve, reject) =>{
        await db.query("SELECT * FROM category WHERE idcategory = ?", idCategory, (err, result) => {
            try {
                if(err){
                    console.log(err);
                    res.send({
                        status: 500,
                        code: "PT001",
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
                        code: "PT002",
                        message: "Algo aconteceu, tente novamente."
                    })
            }
        })
    })
}


const insertProduct = (idcategory,nameProduct, imageProduct,price, res) => {
    return new Promise( async (resolve, reject) => {
            await db.query("INSERT INTO product (idcategory, name_product, image_product, price) VALUES (?, ?, ?, ?)", [idcategory,nameProduct, imageProduct, price], (err, _) => {
                try {
                    if(err){
                    console.log(err)
                    res.send({
                        status: 500,
                        code: "PT005",
                        message: "Algo aconteceu, tente novamente."
                    });
                    db.end();
                    }
                    resolve({
                        status: 200,
                    });
                } catch (e) {
                    res.send({
                        status: 500,
                        code: "CG006",
                        message: "Algo aconteceu, tente novamente."
                    });
                }
            });
    });
}

module.exports = productCreate;