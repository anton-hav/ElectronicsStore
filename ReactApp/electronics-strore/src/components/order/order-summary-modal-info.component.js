import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { blue } from "@mui/material/colors";
// Import custom components
import OrderPurchasesTable from "./order-purchases-table.component";
// Import services
import GoodsService from "../../services/goods.service";
// Import custom types and utils
import { formatter } from "../../utils/formatter";
import OrderStatuses from "../../utils/order-statuses";

const _goodsService = new GoodsService();

const emails = ["username@gmail.com", "user02@gmail.com"];

function ModalInfo(props) {
  const { onClose, order, owner, purchases, goods, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>Order information</DialogTitle>
      <Box marginLeft={2}>
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
          variant="body1"
          component="div"
        >
          Created: {order.dateTimeOfCreate.toString().split("G")[0]}
        </Typography>
        <Typography
          sx={{ textAlign: "left" }}
          gutterBottom
          variant="body1"
          component="div"
        >
          by: {owner ? owner.email : null}
        </Typography>
        <Typography sx={{ textAlign: "left" }} variant="body1">
          {`Status: ${
            OrderStatuses.getStatusByValue(Number(order.status)).statusName
          }`}
        </Typography>
      </Box>
      <Divider />
      <OrderPurchasesTable goods={goods} purchases={purchases} />
    </Dialog>
  );
}

ModalInfo.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function OrderSummaryModalInfo(props) {
  const { open, order, owner, purchases, onClose } = props;
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    const getGoods = async () => {
      let data = await Promise.all(
        purchases.map(async (p) => {
          let goodsDto = await _goodsService.getItemByIdFromApi(p.goodsId);
          return goodsDto;
        })
      );
      setGoods(data);
    };

    if (goods.length === 0 && purchases.length !== 0) {
      getGoods();
    }
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <ModalInfo
        open={open}
        order={order}
        owner={owner}
        purchases={purchases}
        goods={goods}
        onClose={handleClose}
      />
    </div>
  );
}
