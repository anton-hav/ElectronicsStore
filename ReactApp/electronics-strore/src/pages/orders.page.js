import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// Import services
import OrderSheetService from "../services/orderSheet.service";
import UserService from "../services/user.service";
// Import custom components
import OrderHistoryItem from "../components/order/order-history-item.component";
import AsideMenuSection from "../components/aside-menu/aside-menu-section.component";
//Import custom types and utils
import useToken from "../utils/hooks/useToken";
import UnauthorizedError from "../types/errors/unauthorized.error";
import OrdersByUserIdRequestModel from "../types/model/requests/get-order-sheets-request.model";
import OrderStatuses from "../utils/order-statuses";

const _orderSheetService = new OrderSheetService();
const _userService = new UserService();

export default function OrdersPage() {
  const { token, setToken } = useToken();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState(4);

  useEffect(() => {
    const getOrders = async () => {
      let data;
      const requestModel = new OrdersByUserIdRequestModel(token.userId);
      try {
        data = await _orderSheetService.getOrdersFromApi(
          token.accessToken,
          requestModel
        );
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          let newToken = await _userService.getTokenByRefreshToken(
            token.refreshToken
          );
          if (newToken) {
            data = await _orderSheetService.getOrdersFromApi(
              newToken.accessToken,
              requestModel
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
   * Handles the change of the value of status filter.
   * @param {*} event - React event
   */
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatusFilter(newStatus);
  };

  const statusFilterBar = (
    <Box sx={{ minWidth: 120, m: 1 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="select-label">Status</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={statusFilter}
          label="Status"
          onChange={handleStatusChange}
        >
          {[
            { statusName: "All", value: 4 },
            ...OrderStatuses.getStatuses(),
          ].map((st) => (
            <MenuItem key={st.value} value={st.value}>
              {st.statusName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{" "}
    </Box>
  );

  const filteredOrder =
    statusFilter !== 4
      ? orders.filter((o) => o.status === statusFilter)
      : orders;

  return (
    <Box>
      <Typography
        variant="h4"
        marginLeft={2}
        gutterBottom
        sx={{ textAlign: "left" }}
      >
        Order history.
      </Typography>
      <Grid container>
        <Grid item xs={3}>
          <AsideMenuSection title={"Filters"} component={statusFilterBar} />
        </Grid>
        <Grid item xs={9}>
          <Box>
            {filteredOrder.length > 0 ? (
              filteredOrder.map((order) => (
                <OrderHistoryItem order={order} key={order.id} />
              ))
            ) : (
              <Typography
                variant="body1"
                marginLeft={2}
                gutterBottom
                sx={{ textAlign: "centre" }}
              >
                No orders found.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
