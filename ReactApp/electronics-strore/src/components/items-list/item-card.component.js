import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { CardActionArea, CardActions, Box } from "@mui/material";
import { Link } from "react-router-dom";
// Import custom components
import GoodsSummary from "../goods/goods-summary.component";
// Import storage and other utils
import useCartItemIds from "../../utils/hooks/useCartItemIds";

import "./item-card.component.css";


export default function ItemCard(props) {
  const { item } = props;
  const { ids, setIds } = useCartItemIds();

  /**
   * Handle Add item to cart button click event.
   * Adds item id to the store.
   */
  const handleAddItemToCartClick = () => {
    let newIds = ids.slice();
    newIds.push(item.id);
    setIds(newIds);
  };

  return (
    <Box className="item-container">
      <Card className="item-card">
        <Link to={`/details/${item.id}`} className="item-card__link">
          <CardActionArea>
            <GoodsSummary item={item} />
          </CardActionArea>
        </Link>

        <CardActions>
          <IconButton onClick={handleAddItemToCartClick} aria-label="add-to-cart" size="large">
            <AddShoppingCartOutlinedIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
