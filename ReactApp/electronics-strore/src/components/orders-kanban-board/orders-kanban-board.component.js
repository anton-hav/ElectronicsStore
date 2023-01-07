import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Import custom components
import OrderSummary from "../order/order-summary.component";

export default function OrdersKanbanBoard(props) {
  const { orders, onStatusChange } = props;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Orders Kanban board.
      </Typography>
      <Box>
        <Typography sx={{ m: 1 }} variant="body1" textAlign={"left"}>
          This is a kanban for managing order statuses.
        </Typography>
      </Box>
      {orders.map((order) => (
        <OrderSummary
          order={order}
          key={order.id}
          onStatusChange={onStatusChange}
        />
      ))}
    </Box>
  );
}
