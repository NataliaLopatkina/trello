const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
const axios = require('axios');

exports.registration = async function (req, res, next) {
    const { name, email, password } = req.body;
    const hash = crypto.createHash('md5').update(password).digest("hex");

    try {
        const user = await userService.getUser({ where: { email: email } });

        if (!user) {
            await userService.createUser({ name, email, password: hash });
            return res.status(201).json({ message: 'Пользователь зарегистрирован.' })
        }

        throw new Error('Почта уже используется другим аккаунтом. Вы можете использовать вход.')
    }

    catch (e) {
        return res.status(403).json({ message: e.message })
    }
}

exports.login = async function (req, res, next) {
    const { email, password } = req.body;
    const hash = crypto.createHash('md5').update(password).digest("hex");

    try {
        const user = await userService.getUser({ where: { email: email, password: hash } });

        if (user) {
            const userData = { id: user.id, name: user.name, email: user.email };
            const tokenSecret = 'accessToken';
            const tokenLife = { expiresIn: '3h' };
            const accessToken = jwt.sign(userData, tokenSecret, tokenLife);

            return res.status(200).json({ message: 'Пользователь найден!', accessToken: accessToken, user });
        }

        throw new Error('Неверный логин или пароль!')
    }

    catch (e) {
        return res.status(404).json({ message: e.message })
    }
}

exports.google = async function (req, res, next) {
    const { token } = req.body;

    try {

        const result = await axios.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token, {
            Accept: 'application/json'
        })

        const name = result.data.given_name;
        const email = result.data.email;

        let user = await userService.getUser({ where: { email } });

        if (!user) {
            user = await userService.createUser({ name, email });
        }
  
        const userData = { id: user.id, name: user.name, email: user.email };
        const tokenSecret = 'accessToken';
        const tokenLife = { expiresIn: '3h' };
        const accessToken = jwt.sign(userData, tokenSecret, tokenLife);

        return res.status(200).json({ message: 'Пользователь найден!', accessToken: accessToken, user });
    }

    catch (e) {
        return res.status(400).json({ message: 'Пользователь не зарегистрирован!' })
    }

}
