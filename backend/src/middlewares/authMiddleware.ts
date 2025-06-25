// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User }from '../models/User'; // Asegúrate de que la ruta sea correcta

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  console.log('Token received:', token); // Para depuración
    console.log(new Date());
   if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

 try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const dataUser = await User.findById((decoded as any).userId, '-password -updatedAt -createdAt'); // Exclude password and updatedAt fields
        if (!dataUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        req.user = dataUser; // Attach user data to the request object
        next(); // Call the next middleware or route handler
     } catch (error) {
         console.error('Error verifying user:', error);
         res.status(401).json({ message: 'Unauthorized' });
     }
};
