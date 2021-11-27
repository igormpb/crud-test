const db = require("../../database/database")

const prodcutShow = async (req, res) => {

    let data;
    data = await show(res);
  
    res.send(data);
}

const show = (res) =>{ 
    return new Promise( async (resolve, reject) => {
        try {
            await db.query("SELECT * FROM product AS p JOIN category AS c ON p.idcategory =  c.idcategory", (err, result) => {
                if(err){
                    console.log(err)
                    res.send({
                        status: 500,
                        code: "PT008",
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
                code: "PT009",
                message: "Algo aconteceu, tente novamente."
            });
        }
    });
};

module.exports = prodcutShow;