const componentService = require('../service/componentService');

async function getComponents(req, res) {

    try {
        let result = await componentService.getComponents();

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

async function getComponentById(req, res) {
    let {componentId} = req.params;

    if (!componentId) {
         return res.status(400).json({
            success: false, 
            error: "ComponentId must be included"
        })
    }

    try {
        let result = await componentService.getComponentById(componentId);
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

module.exports = {
    getComponents,
    getComponentById
}