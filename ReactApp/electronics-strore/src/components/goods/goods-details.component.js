import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";

import { Box } from "@mui/material";

import "./goods-details.component.css";

import { formatter } from "../../utils/formatter";

export default function GoodsDetails(props) {
  const { item } = props;

  return (
    <Box className="goods-details">
      <Paper>
        <Box className="goods-details-paper">
          <Box className="goods-details-paper__header">
            <Box className="good-details-paper__header-title">
              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="h3"
                component="div"
              >
                {item.name}
              </Typography>
              <Typography
                sx={{ textAlign: "center" }}
                gutterBottom
                variant="body1"
                component="div"
              >
                by {item.brand}
              </Typography>
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              {`${formatter.format(item.cost)}`}
            </Typography>
          </Box>
          <Box className="goods-details-paper__media">
            <Skeleton variant="rounded" width={450} height={450} />
          </Box>

          <Box className="goods-details-paper__summary">
            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Summary
            </Typography>
            <Typography
              sx={{ textAlign: "left" }}
              variant="body2"
              color="text.secondary"
            >
              {item.summary}
            </Typography>
          </Box>

          <Box className="goods-details-paper__description">
            <Typography
              sx={{ textAlign: "center" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Description
            </Typography>
            <Typography
              sx={{ textAlign: "left" }}
              variant="body2"
              color="text.secondary"
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
