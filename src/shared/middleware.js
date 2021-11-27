const jwt = require('jsonwebtoken');
const {SECRET} = require('../../env');

module.exports = (req,res,next) =>{
    const tokenHeader = req.headers.authorization;
    if(!tokenHeader){
        res.send({
            status: 401,
            code: "MD0010",
            message: "Você não tem autorização!"
        });
        return;
    }
    const token = tokenHeader.split(' ');
    if(token[0] !== "Bearer"){
        res.send({
            status: 401,
            code: "MD0011",
            message: "Você não tem autorização!"
        })
        return;
    }
    if(token.length !== 2){
        res.send({
            status: 401,
            code: "MD0013",
            message: "Você não tem autorização!"
        })
        return;
    }

    jwt.verify(token[1], SECRET, (err, _) => {
        if(err){
            res.send({
                status: 401,
                code: "MD0014",
                message: "Você não tem autorização!"
            });
        }
        next();
    });
}