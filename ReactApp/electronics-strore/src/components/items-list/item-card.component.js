import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { CardActionArea, CardActions, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Import storage and other utils
import { addItem } from "../../storage/slices/cart.slice";

import "./item-card.component.css";
import GoodsSummary from "../goods/goods-summary.component";



export default function ItemCard(props) {
  const { item } = props;

  const dispatch = useDispatch();

  return (
    <Box className="item-container">
      <Card className="item-card">
        <Link to={`/details/${item.id}`} className="item-card__link">
          <CardActionArea>
            <GoodsSummary item={item} />
          </CardActionArea>
        </Link>

        <CardActions>
          <IconButton onClick={() => dispatch(addItem(item.id))} aria-label="add-to-cart" size="large">
            <AddShoppingCartOutlinedIcon fontSize="inherit" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
