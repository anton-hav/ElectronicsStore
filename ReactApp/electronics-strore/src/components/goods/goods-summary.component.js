import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import { Box } from "@mui/material";

import "./goods-summary.component.css";

import { formatter } from "../../utils/formatter";

export default function GoodsSummary(props) {
  const { item } = props;

  return (
    <Box className="goods-summary">
      <CardMedia>
        <Skeleton variant="rounded" width={150} height={150} />
      </CardMedia>

      <CardContent>
        <Box className="goods-summary-content">
          <Box className="goods-summary-content__header">
            <Box>
              <Typography
                sx={{ textAlign: "left" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {item.name}
              </Typography>
              <Typography
                sx={{ textAlign: "left" }}
                gutterBottom
                variant="body2"
                component="div"
              >
                by {item.brand}
              </Typography>
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              {`${formatter.format(item.cost)}`}
            </Typography>
          </Box>

          <Typography
            sx={{ textAlign: "left" }}
            variant="body2"
            color="text.secondary"
          >
            {item.summary}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
}
