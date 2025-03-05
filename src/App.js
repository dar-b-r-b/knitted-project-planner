import React from "react";
import { Provider } from "./components/ui/provider";
import { Planner } from "./features/planner/Planner";
import { Header } from "./Header";

function App() {
  return (
    <Provider forcedTheme="light">
      <Header />
      <Planner />
    </Provider>
  );
}

export default App;
