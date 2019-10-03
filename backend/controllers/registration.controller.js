const crypto = require('crypto');
const userService = require('../services/user');

exports.createUser = async function (req, res, next) {
    const { name, email, password } = req.body;
    const hash = crypto.createHash('md5').update(password).digest("hex");
    const queryReceipt = { where: { email: email } }
    const queryCreate = { name, email, password: hash };

    try {
        const user = await userService.getUser(queryReceipt);

        if (!user) {
            await userService.createUser(queryCreate);
            return res.status(201).json({ message: 'User is registered!' })
        }

        throw new Error('User with this email is already registered!')
    }

    catch (e) {
        return res.status(403).json({ message: e.message })
    }
}
