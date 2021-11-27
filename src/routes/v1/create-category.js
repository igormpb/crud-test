const db = require("../../database/database");

const categoryCreate = async (req,res) =>{
    const {name, image} = req.body;

    if(!name || !image) {
        res.send({
            status: 400,
            code: "CG001",
            message: "Os campos são obrigatórios."
        });
    }

    let data;
    data = await insert(name, image,res);

    res.send(data)
}

const insert = (name, image, res) => {
    return new Promise( async (resolve, reject) => {
            await db.query("INSERT INTO category (name, image) VALUES (?, ?);", [name, image], (err, result) => {
                try {
                    if(err){
                    console.log(err)
                    res.send({
                        status: 500,
                        code: "CG002",
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
                        code: "CG003",
                        message: "Algo aconteceu, tente novamente."
                    });
                }
            });
    });
}

module.exports = categoryCreate;