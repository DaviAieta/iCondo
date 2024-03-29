import { Request, Response } from "express"
import Unit from '../models/unit.models'
import Condominium from '../models/condominium.models'

export class UnitController{
    static async listUnits(req: Request, res: Response){
        try{
        const units = await Unit.findAll({
            include: [{
                model: Condominium,
                attributes: ['razao_social'],
                as: 'condominios'
            }]
        })
            return res.render('units/list', { units })
        }catch(error){
            console.log(error)
            return res.status(500).json({error: error})
        }
    }

    static async createUnit(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                const condominiums = await Condominium.findAll()
                return res.render('units/create', { condominiums })
            }catch(error){
                return res.status(500).json({error: error})
            }
        }

        else{
            const unit = req.body
            try{
                await Unit.create(unit)
                return res.redirect('/units')
            }catch(error){
                return res.status(500).json({error: error})
            }
        }
    }

    static async deleteUnit(req: Request, res: Response){
        const unitID = req.params.id
        if(req.method == 'GET'){
            try{
                return res.render('units/delete', { unitID })
            }catch(error){
                return res.status(500).json({error: error})
            }
        }

        else{
            try{
                await Unit.destroy({
                    where: { id_unidade: unitID }
                })
                return res.redirect('/units')
            }catch(error){
                return res.status(500).json({error: error})
            } 
        }
    }
}