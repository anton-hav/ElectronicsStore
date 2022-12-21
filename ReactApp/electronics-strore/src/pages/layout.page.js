import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
// Import custom components
import NavBar from "../components/nav-bar/nav-bar.component";

export default function Layout() {
  const navigation = useNavigation();
  const counterOfItems = useSelector((state) => state.cart.items.length);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar counterOfItems={counterOfItems} />
        {navigation.state === "loading" ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : null}
      </header>
      <div className="App-body">
        <div className={navigation.state === "loading" ? "loading" : ""}>
          <Outlet />
        </div>
      </div>
      <footer className="App-footer">
        <div className="footer__copy">The Electronics store 2022 &copy;</div>
      </footer>
    </div>
  );
}
