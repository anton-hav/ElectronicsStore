import { v4 as uuidv4 } from "uuid";
import { useLoaderData } from "react-router-dom";


// Import custom components
import GoodsDetails from "../components/goods/goods-details.component";
// Import services
import GoodsService from "../services/goods.service";
// Import data transfer objects and utils
import GoodsDto from "../types/dto/goods.dto";

const _goodsService = new GoodsService();

export async function loader({params}){
  const item = await _goodsService.getItemByIdFromApi(params.id);
  return item;
}

export default function Details() {
  const item = useLoaderData();

  return (
    <div>
      <GoodsDetails item={item} />
    </div>
  );
}