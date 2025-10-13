const loginService = require('../service/loginService');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret-key'; 

async function getUserByName(req, res) {
    let {userName, userPassword} = req.body

    if (!userName || !userPassword) {
         return res.status(400).json({
            success: false, 
            error: "Username and password must be included"
        })
    }

    try {
        let result = await loginService.getUserByName(userName);

         if (!result) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        if (result.userPassword !== userPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid password'
            })
        }

    const token = jwt.sign(
      { id: result.userId, userName: result.userName },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

        return res.status(200).json({
            success: true, 
            message: 'Login successful',
            token,
            data: {
        userId: result.userId,
        userName: result.userName,
        rolesId: result.rolesId
    }
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: error.message
        })
    }
}

module.exports = {
    getUserByName
}