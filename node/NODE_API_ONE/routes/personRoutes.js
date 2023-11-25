const router = require("express").Router()

router.post('/person',async (req, res)=>{
    const {name, salary , approved} = req.body
    const person ={
        name,
        salary,
        approved
    }
        if (!name){
           res.status(422).json({error : "o campo nome é obrigatório"}) 
        }
        /*if (!salary){
            res.status(422).json({error : "o campo salary é obrigatório"}) 
         }
        if (!approved){
            res.status(422).json({error : "o campo approved é obrigatório"}) 
        }*/

    try {
        await Person.create(person)
        res.status(201).json({mensage : "pessoa inserida com sucesso!!"})
    } catch (error) {
        res.status(500).json({error : error})
    }
}    
)


modules.exports = router 