import './App.css';
import { useState } from 'react';
import { MyIdeas, Overview, ReviewIdeas } from './pages';
import { PageLayout } from './components/PageLayout';
import { Switch, Route } from "react-router-dom";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { MsalProvider } from "@azure/msal-react";

const Pages = () => {
  return (
    <Switch>
      <Route path="/createidea" component={Overview} />
      <Route exact path="/" component={MyIdeas} />
      <Route path="/reviewideas" component={ReviewIdeas} />
    </Switch>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <PageLayout>
        <AuthenticatedTemplate>
          <Pages />
        </AuthenticatedTemplate>
      </PageLayout>
    </MsalProvider>
  );
};
export default App;
