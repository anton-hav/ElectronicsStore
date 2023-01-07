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
// Import services
import UserService from "../../services/user.service";
import PurchaseService from "../../services/purchase.service";
// Import custom types and utils
import { formatter } from "../../utils/formatter";
import OrderStatuses from "../../utils/order-statuses";
import useToken from "../../utils/hooks/useToken";
import UnauthorizedError from "../../types/errors/unauthorized.error";

import "./order-summary.component.css";

const _userService = new UserService();
const _purchaseService = new PurchaseService();

export default function OrderSummary(props) {
  const { order, onStatusChange } = props;
  const { token, setToken } = useToken();
  const [user, setUser] = useState();
  const [purchases, setPurchases] = useState([]);

  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    /**
     * Get information about the owner (user) of the order.
     */
    const getUser = async () => {
      let user;
      try {
        user = await _userService.getUserInformationById(
          token.accessToken,
          order.userId
        );
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          if (newToken) {
            user = await _userService.getUserInformationById(
              token.accessToken,
              order.userId
            );
            setToken(newToken);
          }
        }
      }

      setUser(user);
    };

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

      //   const data = await _purchaseService.getPurchasesByOrderId(
      //     token.accessToken,
      //     order.id
      //   );
      setPurchases(data);
    };

    if (user === undefined) {
      getUser();
    }

    if (purchases.length === 0) {
      getPurchases();
    }
  });

  /**
   * Handles status changes.
   * @param {*} event React event.
   */
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onStatusChange(order, newStatus);
  };

  return (
    <Box className="order-wrapper">
      <Card className="card">
        <Box className="info">
          <CardActionArea>
            <CardContent>
              <Box className="summary">
                <Typography
                  sx={{ textAlign: "left" }}
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  ID: {order.id}
                </Typography>
                <Typography
                  sx={{ textAlign: "left" }}
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  created: {order.dateTimeOfCreate.toString().split("G")[0]}
                </Typography>
                <Typography
                  sx={{ textAlign: "left" }}
                  gutterBottom
                  variant="body1"
                  component="div"
                >
                  by: {user ? user.email : null}
                </Typography>
                <Typography
                  sx={{ textAlign: "left" }}
                  gutterBottom
                  variant="body1"
                  component="div"
                >
                  {`Total amount: ${formatter.format(
                    purchases.reduce(
                      (sum, current) => sum + current.cost * current.count,
                      0
                    )
                  )}`}
                </Typography>
                <Typography sx={{ textAlign: "left" }} variant="body1">
                  {`Status: ${
                    OrderStatuses.getStatusByValue(Number(order.status))
                      .statusName
                  }`}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="select-label">Status</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  {OrderStatuses.getStatuses().map((st) => (
                    <MenuItem key={st.value} value={st.value}>
                      {st.statusName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}
