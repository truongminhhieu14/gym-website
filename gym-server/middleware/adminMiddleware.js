const jwt = require('jsonwebtoken')
async function adminMiddleware(req, res, next) {
    try {
        if(!req.user || req.use.role !== "admin") {
            return res.status(403).json({
                message: "You do not have access!",
                error: true,
                success: false
            });
        }
        next()
        
    } catch (err) {
        return res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false
        });     
    }
    
}

module.exports = adminMiddleware