import { User } from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
        return;
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        // Send response with token
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', token });
        return;
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token;
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

        res.status(200).json({ message: 'User verified', user: dataUser });
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({}, '-password'); // Exclude password field
        res.status(200).json(users);
        return;
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token'); // Clear the token cookie
        res.status(200).json({ message: 'Logout successful' });
        return;
    }
    catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

