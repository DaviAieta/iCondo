import { Request, Response } from "express"
import Person from '../models/person.models'
import Unit from "../models/unit.models"
import Condominium from '../models/condominium.models'
import bcrypt from 'bcrypt'

export class PersonController{
    static async listPeople(req: Request, res: Response){
        try{
            const people = await Person.findAll()
            return res.render('people/list', { people })
        } catch(error){
            return res.status(500).json({ error: error })
        }
    }
    static async createPerson(req: Request, res: Response){
        if(req.method == 'GET'){
            try{
                const units = await Unit.findAll()
                const condominiums = await Condominium.findAll()
                return res.render('people/create', { units, condominiums })
            }catch(error){
                return res.status(500).json({ error: error })
            }
        }
        
        else{
            const {
                nome, sobrenome, data_nascimento, cpf, telefone,
                email, operador, administrador, morador, id_unidade,
                primeiro_acesso, senha
            } = req.body

            // const data_cadastro = usar API de data para pegar o dia cadastrado  

            const tokenScript = `${nome}${cpf}${email}`
            const generatedToken = await bcrypt.hash(tokenScript, 10)

            try{
                if(primeiro_acesso == 'sim'){
                    
                }
                await Person.create({
                    nome: nome, sobrenome: sobrenome, data_nascimento: data_nascimento,
                    cpf: cpf, telefone: telefone, email: email, operador: operador,
                    administrador: administrador, morador: morador, id_unidade: id_unidade,
                    primeiro_acesso
                })
            }catch(error){
                return res.status(500).json({ error: error })
            }
        
        }
    }
}