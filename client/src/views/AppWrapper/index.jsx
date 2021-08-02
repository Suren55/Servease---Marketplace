import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import routes from "../../routes";
import { logout } from "../../redux/reducers/auth";

import JobsList from "../JobsList";

const Container = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
`;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  logout: logout,
};
const AppWrapper = (props) => {
  return (
    <Container>
      <Content>
        <Switch>
          {routes.map((route, index) => {
            if (route.route === "/app") {
              return (
                <Route exact path={route.route} component={JobsList} key={route + "+" + index} />
              );
            }
            return (
              <Route
                exact
                path={"/app" + route.route}
                component={route.component}
                key={route + "+" + index}
              />
            );
          })}
        </Switch>
      </Content>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
