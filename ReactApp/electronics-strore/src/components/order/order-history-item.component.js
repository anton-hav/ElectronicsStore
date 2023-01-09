import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Import custom components
import OrderSummaryModalInfo from "./order-summary-modal-info.component";
// Import services
import UserService from "../../services/user.service";
import PurchaseService from "../../services/purchase.service";
// Import custom types and utils
import { formatter } from "../../utils/formatter";
import OrderStatuses from "../../utils/order-statuses";
import useToken from "../../utils/hooks/useToken";
import UnauthorizedError from "../../types/errors/unauthorized.error";

import "./order-history-item.component.css";

const _userService = new UserService();
const _purchaseService = new PurchaseService();

const cardStyles = [
  "card-created",
  "card-confirmed",
  "card-delivered",
  "card-cancelled",
];

export default function OrderHistoryItem(props) {
  const { order } = props;
  const { token, setToken } = useToken();
  const [purchases, setPurchases] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    /**
     * Get purchases for current order.
     */
    const getPurchases = async () => {
      let data;
      try {
        data = await _purchaseService.getPurchasesByOrderId(
          token.accessToken,
          order.id
        );
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          if (newToken) {
            data = await _purchaseService.getPurchasesByOrderId(
              token.accessToken,
              order.id
            );
            setToken(newToken);
          }
        }
      }
      setPurchases(data);
    };

    if (purchases.length === 0) {
      getPurchases();
    }
  });

  /**
   * Handles click event on the order card.
   */
  const handleOnClick = () => {
    setOpenModal(true);
  };

  /**
   * Handles close event of the modal dialog.
   */
  const handleOnCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box className="order-wrapper">
      <Card className={cardStyles[order.status]}>
        <Box>
          <CardActionArea onClick={handleOnClick}>
            <CardContent>
              <Box>
                <Box className="header">
                  <Typography
                    sx={{ textAlign: "left" }}
                    gutterBottom
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    Created: {order.dateTimeOfCreate.toString().split("G")[0]}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "left" }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {`Total amount: ${formatter.format(
                      purchases.reduce(
                        (sum, current) => sum + current.cost * current.count,
                        0
                      )
                    )}`}
                  </Typography>
                </Box>

                <Typography sx={{ textAlign: "left" }} variant="body1">
                  {`Status: ${
                    OrderStatuses.getStatusByValue(Number(order.status))
                      .statusName
                  }`}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Box>
      </Card>
      <OrderSummaryModalInfo
        open={openModal}
        order={order}
        purchases={purchases}
        onClose={handleOnCloseModal}
      />
    </Box>
  );
}
