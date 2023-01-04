import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Box } from "@mui/material";
import { Link } from "react-router-dom";

// Import custom components
import GoodsSummary from "../goods/goods-summary.component";
import NumberInputBar from "../number-input-bar/number-input-bar.component";
// Import custom types and utils
import { formatter } from "../../utils/formatter";

import "./item-in-cart-card.component.css";

export default function ItemInCartCard(props) {
  const { item, handleRemoveItem, onChangeCount } = props;

  const handleChangeCount = (count) => {
    onChangeCount(item.goods.id, count);
  };

  return (
    <Box className="item-wrapper">
      <Card className="item-card">
        <Box className="product-info">
          <Link to={`/details/${item.goods.id}`} className="item-card__link">
            <CardActionArea>
              <GoodsSummary item={item.goods} />
            </CardActionArea>
          </Link>
        </Box>

        <CardActions className="card-actions">
          <Box className="remove">
            <IconButton
              onClick={() => handleRemoveItem(item)}
              aria-label="add-to-cart"
              size="large"
            >
              <RemoveShoppingCartIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Box className="count">
            <NumberInputBar
              count={item.count}
              onChangeCount={handleChangeCount}
            />
          </Box>
          <Box className="info">
            <Typography variant="body2" color="textSecondary">
              The total cost of {item.count}{" "}
              {item.count > 1 ? "pieces" : "piece"} is{" "}
              {formatter.format(item.goods.cost * item.count, 0)}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
