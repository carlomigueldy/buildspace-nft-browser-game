import { Box } from "@chakra-ui/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/Index";
import { GlobalContext } from "./state/global";

function App() {
  return (
    <Router>
      <GlobalContext.Provider value={{}}>
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgColor="blue.900"
        >
          <Switch>
            <Route path="/" component={IndexPage} />
          </Switch>
        </Box>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
