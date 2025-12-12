import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import themes from "./themes";
import { LoadingProvider } from "./layout/Context/loading";
import ContextLoading from "./ui-component/loading";
import MainRoutes from "./routes/main";
import { GoogleOAuthProvider } from '@react-oauth/google'
import chatRoomConnect from "redux/actions/chat";
import baseInit from "redux/actions/base";

const App = () => {
    const customization = useSelector((state) => state.customization);
    chatRoomConnect();
    baseInit();

    // Use placeholder client ID if not configured (prevents errors, but Google OAuth won't work)
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'placeholder-client-id';

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <LoadingProvider>
                        <ContextLoading />
                        <MainRoutes />
                    </LoadingProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </GoogleOAuthProvider>
    );
};

export default App;