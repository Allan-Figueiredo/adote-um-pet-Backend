const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {
    if(!token) {
        throw new Error('Token não fornecido')
    }

    try {
        const decoded = jwt.verify(token, 'nossosecret')
        const userId = decoded.id
        const user = await User.findOne({_id: userId})
        
        if (!user) {
            throw new Error('Usuário não encontrado')
        }
        
        return user
    } catch (error) {
        throw new Error('Token inválido')
    }
}

module.exports = getUserByToken