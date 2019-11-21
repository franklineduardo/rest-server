const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {

    const token = req.get("token");

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.user = decoded.user;
        next();

    })
}

module.exports.adminRole = (req, res, next) => {

    let user = req.user;

    if (user.role == "ADMIN_ROLE") {
        next();
    } else {
        res.status(400).json({
            message: "error"
        })
    }

}