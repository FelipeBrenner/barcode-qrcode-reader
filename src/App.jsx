import { StyledEngineProvider } from "@mui/styled-engine";
import { Home } from "./components/Home";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Home />
    </StyledEngineProvider>
  );
}

export default App;
