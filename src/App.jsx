import "./style/App.css";
import { Routes, Route } from "react-router-dom";
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { USER_SETTINGS, USER_THEMES } from "./config"
import { PageLayout } from "./components";
import { PageNotFound } from "./pages";
import { appRoutes, getRequiredRoutes } from "./utils"

import { ConfigProvider, theme } from "antd";
import { useState } from "react";

const Pages = () => {
    const isAuthenticated = useIsAuthenticated();
    let routes = getRequiredRoutes(appRoutes, isAuthenticated);
    return <Routes>
        {
            routes.map(item => <Route key={item.path} path={item.path} element={item.element} />)
        }
        <Route path="*" element={<PageNotFound />} />
    </Routes>;
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {

    const [IsDarkTheme, setIsDarkTheme] = useState(USER_SETTINGS.theme === USER_THEMES.Dark);

    const getUserThemeSetting = () => {
        if (IsDarkTheme)
            return getDarkThemeSetting();
        return getLightThemeSetting();
    }

    const getDarkThemeSetting = () => {
        return {
            algorithm: theme.darkAlgorithm,
            token: {
                logoBackground: '#FFFFFF'
            }
        }
    }
    const getLightThemeSetting = () => {
        return {
            algorithm: theme.compactAlgorithm,
            token: {
                logoBackground: '#000000'
            }
        }
    }

    return (
        <MsalProvider instance={instance}>
            <ConfigProvider theme={getUserThemeSetting()}>
                <PageLayout IsDarkTheme={IsDarkTheme} setIsDarkTheme={setIsDarkTheme}>
                    <Pages />
                </PageLayout>
            </ConfigProvider>
        </MsalProvider>
    );
};

export default App;
