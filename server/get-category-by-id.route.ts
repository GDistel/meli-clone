import { Request, Response } from 'express';
import axios from 'axios';

export async function getCategoryById(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('Invalid id');
    }
    const meliItemResponse = await axios.get(`https://api.mercadolibre.com/categories/${id}`);
    if (!meliItemResponse?.data) {
        return res.status(500).send('Could not retrieve the desired data from Mercado Libre');
    }
    return res.status(200).json(meliItemResponse?.data);
}