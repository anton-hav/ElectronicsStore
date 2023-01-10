import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
// Import services
import OrderSheetService from "../../services/orderSheet.service";
import UserService from "../../services/user.service";
// Import custom components
import OrdersKanbanBoard from "../orders-kanban-board/orders-kanban-board.component";
//Import custom types and utils
import OrderSheetDto from "../../types/dto/order-sheet.dto";
import useToken from "../../utils/hooks/useToken";
import UnauthorizedError from "../../types/errors/unauthorized.error";

import "./admin-panel-orders.component.css";

const _orderSheetService = new OrderSheetService();
const _userService = new UserService();

export default function AdminPanelOrdersItem(props) {
  const { token, setToken } = useToken();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      let data;
      try {
        data = await _orderSheetService.getOrdersFromApi(token.accessToken);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          if (newToken) {
            data = await _orderSheetService.getOrdersFromApi(
              newToken.accessToken
            );
            setToken(newToken);
          }
        }
      }

      setOrders(data);
    };

    if (orders.length === 0) {
      getOrders();
    }
  });

  /**
   * Handles the orders status change event
   * @param {OrderSheetDto} order - order object
   * @param {number} status - status value
   */
  const handleStatusChange = (order, status) => {
    const updateOrderSheet = async (orderForUpdate) => {
      let result;
      try {
        result = await _orderSheetService.updateOrderSheet(
          token.accessToken,
          orderForUpdate
        );
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          if (newToken) {
            result = await _orderSheetService.updateOrderSheet(
              token.accessToken,
              orderForUpdate
            );
            setToken(newToken);
          }
        }
      }
    };

    let index = orders.findIndex((o) => o.id === order.id);
    order.status = status;
    const newOrders = [
      ...orders.slice(0, index),
      order,
      ...orders.slice(index + 1),
    ];
    setOrders(newOrders);
    updateOrderSheet(order);
  };

  return (
    <Box className="orders-panel">
      <Paper className="paper">
        <Typography variant="h5" gutterBottom>
          Orders manage panel.
        </Typography>
        <Box>
          <Typography sx={{ m: 1 }} variant="body1" textAlign={"left"}>
            On this page, the administrator can manage status of orders.
          </Typography>
        </Box>
        <Divider variant="middle" />
        <OrdersKanbanBoard
          orders={orders}
          onStatusChange={handleStatusChange}
        />
      </Paper>
    </Box>
  );
}
