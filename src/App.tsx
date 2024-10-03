import { Grid, GridItem, Show } from "@chakra-ui/react";

export default function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"} bg={"gold"}>
        Nav
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} bg={"green"}>
          Aside
        </GridItem>
      </Show>
      <GridItem area={"main"} bg={"coral"}>
        Main
      </GridItem>
    </Grid>
  );
}
