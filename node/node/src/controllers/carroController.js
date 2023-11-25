const CarsService = require("../services/carroService")

module.exports= {
    searchAllCars: async(req, res) =>{
    let json = { error: '', result: []}

    let cars = await CarsService.searchAllCars()

    for (let i in cars){
        json.result.push({
            codigo : cars[i].codigo, 
            descricao : cars[i].modelo,
        })
        }
        res.json(json)
    },
    searchOne : async (req,res)=>{
        let json = {error : '', result : {} }

        let code = req.params.codigo 
        let car  = await CarsService.searchOne(code)

        if(car){
            json.result = car
        }
        res.json(json)
    },
    insertCar :async (req,res)=>{
        let json = {error : '', result : {} }

        let modelo = req.body.modelo
        let placa = req.body.placa

        if (modelo && placa){
            let carCode  = await CarsService.insertCar(modelo, placa)
            json.result = {
                codigo : carCode, 
                modelo : modelo,
                placa : placa
            }
        }
        else{
            json.error = 'campos nao enviados'
        }
        res.json(json())
    },
    alterCar : async (req,res)=>{
        let json = {error : '', result : {} }
        
        let codigo = req.params.codigo
        let modelo = req.body.modelo
        let placa = req.body.placa

        if (codigo && modelo && placa){
           await CarsService.alterCar(codigo, modelo, placa)
            json.result = {
                codigo : codigo, 
                modelo : modelo,
                placa : placa
            }
        }
        else{
            json.error = 'campos nao enviados'
        }
        res.json(json)
    },
    deleteCar : async(req, res) =>{
        let json = {error : '', result : 'arquivo excluido com sucesso !!' }
        await CarsService.deleteCar(req.params.codigo)
        res.json(json)
    }
}