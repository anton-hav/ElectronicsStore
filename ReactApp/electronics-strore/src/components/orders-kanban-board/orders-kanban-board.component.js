import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// Import custom components
import OrderSummary from "../order/order-summary.component";

export default function OrdersKanbanBoard(props) {
  const { orders, onStatusChange } = props;

  return (
    <Box>
      <Box>
        <Typography sx={{ m: 1 }} variant="body1" textAlign={"left"}>
          To move the order to another column, change its status in the
          selection field. For detailed information about the order, click on
          it.
        </Typography>
      </Box>
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <Typography sx={{ m: 1 }} variant="h6" textAlign={"centre"}>
              Created
            </Typography>
          </Box>
          {orders
            .filter((o) => o.status === 0)
            .map((order) => (
              <OrderSummary
                order={order}
                key={order.id}
                onStatusChange={onStatusChange}
              />
            ))}
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography sx={{ m: 1 }} variant="h6" textAlign={"centre"}>
              Confirmed
            </Typography>
          </Box>
          {orders
            .filter((o) => o.status === 1)
            .map((order) => (
              <OrderSummary
                order={order}
                key={order.id}
                onStatusChange={onStatusChange}
              />
            ))}
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography sx={{ m: 1 }} variant="h6" textAlign={"centre"}>
              Delivered
            </Typography>
          </Box>
          {orders
            .filter((o) => o.status === 2)
            .map((order) => (
              <OrderSummary
                order={order}
                key={order.id}
                onStatusChange={onStatusChange}
              />
            ))}
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography sx={{ m: 1 }} variant="h6" textAlign={"centre"}>
              Cancelled
            </Typography>
          </Box>
          {orders
            .filter((o) => o.status === 3)
            .map((order) => (
              <OrderSummary
                order={order}
                key={order.id}
                onStatusChange={onStatusChange}
              />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}
