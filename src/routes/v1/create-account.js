const db = require("../../database/database");

const createAccount  = async (req,res) =>{
    const {username, password, password1, email } = req.body;

    if(!username || !password || !password1, !email){
        res.send({
            status: 400,
            code: "XX0001",
            message: "Os campos são obrigatórios."
        });
    }

    if(password !== password1){
        res.send({
            status:400,
            code: "XX0002",
            message: "As senhas não iguais."
        });
    }

    //VERIFICA SE O USUÁRIO JÁ EXISTE
    let data; 
    data = await showUser(username, res);
    if(data.result.length != 0){
        res.send({
            status: 400,
            code: "LG004",
            message: "Usuário já existe."
        });
    }

    let created;
    created = await createUser(username,password,email, res);
    if(created.code){
        res.send(created);
    }

    res.send(created)


}


const showUser = (username, res) =>{
    return new Promise( async (resolve, reject) => {
        await db.query("SELECT * FROM users WHERE username = ?",[username], (error, result, fields) => {
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

const createUser = (username, password, email) =>{
    return new Promise( async (resolve, reject) => {
        await db.query("INSERT INTO users (username, password, email) VALUES (?,?,?)",[username,password,email], (error, result, fields) => {
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

module.exports = createAccount;