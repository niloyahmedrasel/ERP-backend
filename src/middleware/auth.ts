import jwt from 'jsonwebtoken';
import { EmployeeRepository } from '../repository/user';
import { Request, Response, NextFunction } from 'express';

const employeeRepository = new EmployeeRepository();

const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, 'secret', async (err, user) => {
        if (err) {
            console.log('Invalid token');
            return res.sendStatus(403); 
        }

        console.log('Decoded User:', user);

        if (typeof user === 'object' && user !== null) {
            const authenticatedUser = await employeeRepository.findById(user.id);
            if (!authenticatedUser) {
                console.log('User not found');
                return res.sendStatus(404); 
            }

            req.user = authenticatedUser; 
            next(); 
        }
    });
};

export default authenticateToken;
