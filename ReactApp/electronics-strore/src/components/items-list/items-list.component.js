import Grid from "@mui/material/Grid";

// Import custom components
import ItemCard from "./item-card.component";

export default function ItemsList(props) {
  const { items } = props;

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      {items.map((item, index) => {
        return <ItemCard key={item.id} item={item} />;
      })}
    </Grid>
  );
}
