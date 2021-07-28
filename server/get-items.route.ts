import { Request, Response } from 'express';
import axios from 'axios';
import { AUTHOR, MAX_ITEMS } from './config';
import { ICategory, IItem } from './interfaces';

export async function getAllItems(req: Request, res: Response) {
    const mlApiResponse = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.searchTerm}`);
    const processedResponse = processItemsResponse(mlApiResponse);
    return res.status(200).json(processedResponse);
}

function processItemsResponse(mlApiResponse: any) {
    const availableCategories: ICategory[] = getCategoriesFromAvailableFilters(mlApiResponse.data.available_filters);
    const orderedCategories: string[] = getCategoryNamesByResultsRelevance(availableCategories);
    const processedItems: IItem[] = getProcessedItems(mlApiResponse.data.results.slice(0, MAX_ITEMS));
    return {
        author: AUTHOR,
        categories: orderedCategories,
        items: processedItems
    };
}

function getProcessedItems(items: any[]): IItem[] {
    return items.map(item => ({
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: Math.floor(item.price),
            decimals: +(item.price % 1).toFixed(2).substring(2)
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
    }));
}

function getCategoryNamesByResultsRelevance(availableCategories: ICategory[]): string[] {
    const sortedCategories: ICategory[] = availableCategories.sort(
        (firstCateg: ICategory, secondCateg: ICategory) => secondCateg.results - firstCateg.results
    );
    return sortedCategories.map(categ => categ.name);
}

function getCategoriesFromAvailableFilters(availableFilters: any): ICategory[] {
    const categoryFilter = availableFilters.find((filter: any) => filter.id === 'category');
    return categoryFilter?.values || [];
}
