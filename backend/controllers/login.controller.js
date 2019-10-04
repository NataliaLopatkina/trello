const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');

exports.getUser = async function(req, res, next) {
    const { email, password } = req.body;
    const hash = crypto.createHash('md5').update(password).digest("hex");
    const queryEmail = { where: {email: email} }
    const queryPassword = { where: {password: hash} }

    try {
        const userEmail = await userService.getUser(queryEmail);

        if (userEmail) {

            try {
                const user = await userService.getUser(queryPassword);

                if(user) {
                    const userData = {id: user.id, name: user.name, email: user.email};
                    const tokenSecret = 'accessToken';
                    const tokenLife = { expiresIn: '3h' };
                    const accessToken  = jwt.sign(userData, tokenSecret, tokenLife);

                    return res.status(200).json({ message: 'Logged in!', accessToken: accessToken, user: user });
                }

                throw new Error('Неверный пароль')
            }

            catch(e) {
                return res.status(404).json({message: e.message, email: false})
            }
        }

        throw new Error('Аккаунт с таким адресом электронной почты не существует')
    }

    catch(e) {
        return res.status(404).json({ message: e.message, password: false })
    }
}
