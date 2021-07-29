
import * as express from 'express';
import { getCategoryById } from './get-category-by-id.route';
import { getItemById } from './get-item-by-id.route';
import { getAllItems } from "./get-items.route";

const app: express.Application = express();

app.route('/api/items').get(getAllItems);
app.route('/api/items/:id').get(getItemById);
app.route('/api/categories/:id').get(getCategoryById);

app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:9000");
});
