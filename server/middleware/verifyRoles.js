export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        let count;
        for (const role of req.role){
           if(role in rolesArray) count++;
        }
        if (count === 0) return res.sendStatus(401);
        next();
    }
};
