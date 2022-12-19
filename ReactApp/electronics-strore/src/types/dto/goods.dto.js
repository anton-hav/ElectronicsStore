import { NIL as NIL_UUID } from 'uuid';

export default class GoodsDto {
    id = NIL_UUID;
    name = "";
    summary = "";
    description = "";
    cost = null;
    brand = "";

    constructor(id, name, summary, description, cost, brand) {        
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.description = description;
        this.cost = cost;
        this.brand = brand;
    }

    /**
     * Mapping from api response (as an json) to GoodsDto
     * @param {*} response - response object as a JSON
     * @returns 
     */
    static fromResponse(response) {
        return new GoodsDto(
            response.id,
            response.name,
            response.summary,
            response.description,
            response.cost,
            response.brand
        );
    }
}



