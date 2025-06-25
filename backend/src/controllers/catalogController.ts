import { Catalog } from "../models/Catalog";
import { Request, Response } from "express";
import { User } from "../models/User";


export const createCatalog = async (req: Request, res: Response): Promise<void> => {
    const { userId , catalogData } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const newCatalog = new Catalog({
            ...catalogData,
            owner: userId,
        });
        await newCatalog.save();
        user.catalogsId.push(newCatalog._id);
        await user.save();
        res.status(201).json({ message: 'Catalog created successfully', catalog: newCatalog });
        return;
    } catch (error) {
        console.error('Error creating catalog:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}

export const getCatalogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req.user as any)?._id;
        const catalogs_user = await Catalog.find({ owner: userId });
        if (!catalogs_user || catalogs_user.length === 0) {
            res.status(404).json({ message: 'No catalogs found for this user' });
            return;
        }
        res.status(200).json({ catalogs: catalogs_user });
        return;

    } catch (error) {
        console.error('Error fetching catalogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}