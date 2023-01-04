import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { CardActionArea, CardActions, Box } from "@mui/material";
import { Link } from "react-router-dom";
// Import custom components
import GoodsSummary from "../goods/goods-summary.component";
// Import custom types and utils
import useCartItems from "../../utils/hooks/use-cart-item.hook";
import GoodsInCartShort from "../../types/dto/goods-in-cart-short.dto";

import "./item-card.component.css";

export default function ItemCard(props) {
  const { item } = props;
  const { cartItems, setCartItems } = useCartItems();

  /**
   * Handle Add item to cart button click event.
   * Adds item id to the store.
   */
  const handleAddItemToCartClick = () => {
    let newCartItems = cartItems.slice();
    const product = new GoodsInCartShort(item.id, 1);
    newCartItems.push(product);
    setCartItems(newCartItems);
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
          <IconButton
            onClick={handleAddItemToCartClick}
            aria-label="add-to-cart"
            size="large"
          >
            <AddShoppingCartOutlinedIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
