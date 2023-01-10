import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Import custom components
import FlashInfoWitdget from "./flash-info-widget.component";

import "./admin-panel-main.component.css";

export default function AdminPanelMainItem(props) {
  const {
    totalOrderNumber,
    onTotalOrderNumberClick,
    mostExpensiveOrderValue,
    todayOrders,
  } = props;

  return (
    <Box className="main-panel">
      <Paper className="paper">
        <Typography variant="h5" gutterBottom>
          Main panel.
        </Typography>
        <Box>
          <Typography sx={{ m: 1 }} variant="body1" textAlign={"left"}>
            On this page, the administrator can customize the contents of the
            store, process orders, view statistics and much more.
          </Typography>
          <Typography sx={{ m: 1 }} variant="body1" textAlign={"left"}>
            This page is currently under construction. More features coming
            soon.
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={4}>
            <FlashInfoWitdget
              bodyInfo={totalOrderNumber}
              title="Total order number"
              onClick={onTotalOrderNumberClick}
            />
          </Grid>
          <Grid item xs={4}>
            <FlashInfoWitdget
              bodyInfo={mostExpensiveOrderValue}
              title="Most expensive order"
            />
          </Grid>
          <Grid item xs={4}>
            <FlashInfoWitdget bodyInfo={todayOrders} title="Today's orders" />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
