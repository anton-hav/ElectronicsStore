import React from "react";
import { Paper, Grid, Box, Typography, Button } from "@mui/material";
// Import custom components
import ItemInCartCard from "./item-in-cart-card.component";
// Import custom types and utils
import { formatter } from "../../utils/formatter";

import "./cart.component.css";

export default function CartView(props) {
  const {
    items,
    message,
    handlePurchaseClick,
    handleRemoveItemClick,
    onChangeCount,
  } = props;

  return (
    <Box className="cart">
      {message !== undefined ? (
        <Box className="cart__message-box">
          <Typography variant="body1" color="text.primary">
            {message}
          </Typography>
        </Box>
      ) : (
        <Paper>
          <Box className="cart-paper">
            <Box>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
              >
                {items.map((item) => {
                  return (
                    <ItemInCartCard
                      key={item.goods.id}
                      item={item}
                      handleRemoveItem={handleRemoveItemClick}
                      onChangeCount={onChangeCount}
                    />
                  );
                })}
              </Grid>
            </Box>

            <Box className="cart-paper__summary">
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {`The cost of the goods in your cart ${formatter.format(
                    items.reduce(
                      (sum, item) => sum + item.goods.cost * item.count,
                      0
                    )
                  )}`}
                </Typography>
              </Box>
              <Box className="cart-paper__summary-button">
                <Button onClick={handlePurchaseClick} variant="contained">
                  Purchase
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
