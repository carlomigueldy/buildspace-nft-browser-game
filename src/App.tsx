import { Box } from "@chakra-ui/layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CharacterSelectionPage from "./pages/CharacterSelection";
import IndexPage from "./pages/Index";
import { GlobalContext } from "./state/global";

function App() {
  return (
    <Router>
      <GlobalContext.Provider value={{}}>
        <Switch>
          <Route
            path="/character-selection"
            component={CharacterSelectionPage}
          />
          <Route path="/" component={IndexPage} />
        </Switch>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
