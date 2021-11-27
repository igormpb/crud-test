const db = require("../../database/database")

const categoryShow = async (req, res) => {

    let data;
    data = await show(res);
  
    res.send(data);
}

const show = (res) =>{ 
    return new Promise( async (resolve, reject) => {
        try {
            await db.query("SELECT * FROM category", (err, result) => {
                if(err){
                    console.log(err)
                    res.send({
                        status: 500,
                        code: "G005",
                        message: "Algo aconteceu, tente novamente."
                    });
                    db.end();
                }

                resolve({
                    status: 200,
                    result
                });
            })
        } catch (error) {
            res.send({
                status: 500,
                code: "CG004",
                message: "Algo aconteceu, tente novamente."
            });
        }
    });
};

module.exports = categoryShow;