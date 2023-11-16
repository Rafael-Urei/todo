import { Grid } from "@mui/material";
import { GridItem } from "../GridItem";

export function Dashboard() {
  return (
    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"}>
      <GridItem size={5} />
      <GridItem size={5} />
      <GridItem size={10} />
    </Grid>
  );
}
