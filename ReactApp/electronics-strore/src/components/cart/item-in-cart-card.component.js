import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { CardActionArea, CardActions, Box } from "@mui/material";
import { Link } from "react-router-dom";

import "./item-in-cart-card.component.css";
import GoodsSummary from "../goods/goods-summary.component";


export default function ItemInCartCard(props) {
  const { item, handleRemoveItem } = props; 

  return (
    <Box className="item-container">
      <Card className="item-card">
        <Link to={`/details/${item.id}`} className="item-card__link">
          <CardActionArea>
            <GoodsSummary item={item} />
          </CardActionArea>
        </Link>

        <CardActions>
          <IconButton onClick={() => handleRemoveItem(item)} aria-label="add-to-cart" size="large">
            <RemoveShoppingCartIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
