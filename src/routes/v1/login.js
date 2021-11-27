var jwt = require('jsonwebtoken');
const {SECRET} = require('../../../env')

const db = require("../../database/database");

const login = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.send({
            status: 400,
            code: "LG003",
            message: "Os campos são obrigatórios."
        })
    }


    let data;
    data = await showUser(username, password, res);
    if(!data.result || !Array.isArray(data.result) || data.result.length === 0){
        res.send({
            status: 400,
            code: "LG004",
            message: "Usuário/senha invalida."
        })
    }

    if(data.code) {
        res.send(data)
    }

    const resultJson = JSON.stringify(data.result)
    const token = jwt.sign({resultJson}, SECRET, {expiresIn: 3000})

    res.send({
        status: data.status,
        token
    })
    
}

const showUser = (username, password, res) =>{
    return new Promise( async (resolve, reject) => {
        await db.query("SELECT * FROM users WHERE username = ? AND password = ?",[username, password], (error, result, fields) => {
            try {
                if(error){
                    res.send({
                        status: 500,
                        code: "LG006",
                        message: "Algo aconteceu, tente novamente."
                    })
                    db.end()
                }
                resolve({
                    status: 200,
                    result
                })
            } catch (e) {
                res.send({
                    status: 500,
                    code: "LG005",
                    message: "Algo aconteceu, tente novamente."
                })
            }
    
        })
    })
}

module.exports = login;