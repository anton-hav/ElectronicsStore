import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./widget.component.css";

export default function FlashInfoWitdget(props) {
  const { title, bodyInfo, onClick } = props;

  return (
    <Box className="widget">
      <Paper className="paper">
        <Box className="header">
          <Typography variant="h7">{title}</Typography>
        </Box>
        <Box className="body">
          <Typography variant="h4">{bodyInfo}</Typography>
        </Box>
        <Box className="footer">
          {onClick ? <Button onClick={onClick}>More...</Button> : null}
        </Box>
      </Paper>
    </Box>
  );
}
