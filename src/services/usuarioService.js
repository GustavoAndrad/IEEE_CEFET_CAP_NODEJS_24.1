require("dotenv").config();
const bcrypt = require("bcrypt");
const knex = require("../database/index");
const jwt = require("jsonwebtoken");

async function createUsuario(nome, email, password, telefone){
    try{
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        const usuario = {
            nome: nome, 
            email: email, 
            password: hash, 
            telefone: telefone
        }

        await knex("usuario").insert(usuario);

        return "Usuário cadastrado";

    }catch(erro){
        throw erro;
    }
}

async function readUsuario(){
    try{
        const usuarios = await knex("usuario").select("*");

        if(usuarios.length === 0){
            throw new Error("Sem usuários");
        }

        return usuarios

    }catch(erro){
        throw erro;
    }
}

async function readUsuarioPorId(id){
    try{
        const usuario = await knex("usuario").select("*").where({id: id}).first();

        if(!usuario){
            throw new Error("Usuário não existe");
        }

        return usuario

    }catch(erro){
        throw erro;
    }
}

async function updateUsuario(id, nome, password, email, telefone){
    try{
        const usuario = await knex("usuario").select("*").where({id: id}).first();

        if(!usuario){
            throw new Error("Usuário não existe");
        }

        let hash;
        if(password){
            const salt = bcrypt.genSaltSync();
            hash = bcrypt.hashSync(password, salt);
        }

        const novoUsuario = {
            nome: nome, 
            email: email, 
            password: hash, 
            telefone: telefone
        }

        await knex("usuario").update(novoUsuario).where({id: id});

        return "Usuário atualizado"

    }catch(erro){
        throw erro
    }
}

async function deleteUsuario(id){
    try{
        const usuario = await knex("usuario").select("*").where({id: id}).first();

        if(!usuario){
            throw new Error("Usuário não existe");
        }

        await knex("usuario").delete().where({id: id});

        return "Usuário deletado"

    }catch(erro){
        throw erro
    }
}

async function login(email, password){
    try{
        const usuario = await knex("usuario").select("*").where({email: email}).first();

        if(!usuario){
            throw new Error("Usuário não existe");
        }

        const comparePassword = bcrypt.compareSync(password, usuario.password);
        if(!comparePassword){
            throw new Error("Senha errada");
        }

        const info = {
            id: usuario.id,
            nome: usuario.nome
        }

        const token = jwt.sign(info, process.env.JWT_KEY, {expiresIn: '24h'});
        return token;

    }catch(erro){
        throw erro;
    }
}

module.exports = {
    createUsuario,
    readUsuario,
    readUsuarioPorId,
    updateUsuario,
    deleteUsuario,
    login
}