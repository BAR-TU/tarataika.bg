const authPage = (permissions) => {
    return (req, res, next) => {
        const userRole = req.role;
        if(permissions.includes(userRole)) {
            next();
        } else {
            return res.status(401).json("Нямате достъп!")
        }
    }
};

const authListings = () => {

};

module.exports = {authPage, authListings};