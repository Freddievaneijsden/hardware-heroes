const userService = require('../service/userService');

async function getUsers(req, res) {

    try {
        let result = await userService.getUsers(); 

        return res.status(200).json({
            success: true, 
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: error.message
        })
    }
}

async function getUserById(req, res) {
    let {userId} = req.params;

    if (!userId) {
         return res.status(400).json({
            success: false, 
            error: "UserId must be included"
        })
    }

    try {
        let result = await userService.getUserById(userId);
        return res.status(200).json({
            success: true, 
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: error.message
        })
    }
}

async function createUser(req, res){
    let {userName, userPassword, rolesId} = req.body;

    if (!userName || !userPassword || !rolesId || userName.trim().length < 1) {
        return res.status(400).json({
            success: false, 
            error: "All fields are required"
        })
    }

    if (rolesId < 1 || rolesId > 3 ){
         return res.status(400).json({
            success: false, 
            error: "RolesId must be 1, 2 or 3"
        })
    }
    
    try {
        let result = await userService.createUser(userName, userPassword, rolesId);
        return res.status(201).json({
            success: true, 
            data: result,
            message: 'You have created an account!'
        })

    } catch (error) {
         return res.status(500).json({
            success: false, 
            error: error.message
         });
    }
}

async function updateUser(req, res) {
    let {userId} = req.params; 
    let {userName, userPassword, rolesId} = req.body;

     if (!userName || !userPassword || !rolesId || userName.trim().length < 1) {
        return res.status(400).json({
            success: false, 
            error: "All fields are required"
        })
    }

        try {
        let result = await userService.updateUser(userName, userPassword, rolesId, userId);
        return res.status(200).json({
            success: true, 
            data: result,
            message: 'You have updated an account!'
        })

    } catch (error) {
         return res.status(500).json({
            success: false, 
            error: error.message
         });
    }
}
async function deleteUser(req, res) {
    let {userId} = req.params;

    if (!userId) {
         return res.status(400).json({
            success: false, 
            error: "UserId must be included"
        })
    }

   try {
        const user = await userService.getUserById(userId);
        
        if (!user || user.length === 0) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        await userService.deleteUser(userId);
        
        return res.status(200).json({
            success: true, 
            message: 'You have deleted an account!'
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false, 
            error: error.message
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}