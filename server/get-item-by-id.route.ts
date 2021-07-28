import { Request, Response } from 'express';
import axios from 'axios';
import { AUTHOR } from './config';

export async function getItemById(req: Request, res: Response) {
    const resourceUrl = `https://api.mercadolibre.com/items/${req.params.id}`;
    const meliItemResponse = await axios.get(resourceUrl);
    const meliItemDescriptionResponse = await axios.get(`${resourceUrl}/description`);
    if (!meliItemResponse) {
        return res.status(500).send('Could not retrieve the desired data from Mercado Libre');
    }
    const processedItem = processItemResponse(meliItemResponse.data, meliItemDescriptionResponse.data);
    return res.status(200).json(processedItem);
}

function processItemResponse(meliItem: any, meliItemDescription: any) {
    return {
        author: AUTHOR,
        item: {
            id: meliItem.id,
            title: meliItem.title,
            price: {
                currency: meliItem.currency_id,
                price: Math.floor(meliItem.price),
                decimals: +(meliItem.price % 1).toFixed(2)
            },
            picture: meliItem.thumbnail,
            condition: meliItem.condition,
            free_shipping: meliItem.shipping?.free_shipping,
            sold_quantity: meliItem.sold_quantity,
            description: meliItemDescription.plain_text
        }
    };
}