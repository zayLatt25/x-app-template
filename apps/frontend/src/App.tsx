import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar, SubmissionModal } from "./components";
import { lightTheme } from "./theme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Settings from "./routes/settings";
import Login from "./routes/login";
import Form from "./routes/form";
import Milestones from "./routes/milestones";
import Profile from "./routes/profile";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={lightTheme}>
        <DAppKitProvider
          usePersistence
          requireCertificate={false}
          genesis="test"
          nodeUrl="https://testnet.vechain.org/"
          logLevel={"DEBUG"}
        >
          <div className="bg-[#506c4c]">
            <Navbar />
            <div className="min-h-screen relative">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reduceForm" element={<Form type="reduce" />} />
                <Route path="/offsetForm" element={<Form type="offset" />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/milestones" element={<Milestones />} />
              </Routes>
            </div>
          </div>
          {/* MODALS  */}
          <SubmissionModal />
        </DAppKitProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
