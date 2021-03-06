import React from "react";
import queryString from "../utility/queryParser";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import OnLogin from './onLogin'
import styled from 'styled-components'
import colors from '../style/colors';
import ErrorMessage from '../components/icons/error'
import Loading from '../components/icons/loading'
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  font-size: 1.5rem;
  background-color: ${colors.background};
  display: flex;
  justify-content: center;
  text-align: center;
`


const LOG_IN = gql`
  query($code: String!) {
    userLogin(code: $code) {
      token
      name
      id
    }
  }
`;

// redirect back to the main page
class Index extends React.Component {
  state = {
    code: null
  };

  componentDidMount() {
    const { history } = this.props;
    const { search } = this.props.location;
    if (search) {
      const param = queryString.parse(search);
      console.log(param);
      if (param.code) {
        this.setState({ code: param.code });
      } else {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }


  render() {
    const { history } = this.props;
    const { code } = this.state;
    if (code) {
      return (
        // <p>{code}</p>
        <Query query={LOG_IN} variables={{ code }}>
          {({ error, loading, data }) => {
            if (error) {
              return <Container> <ErrorMessage /> </Container>;
            } // push to error page??
            if (loading) return <Container> <Loading message={"Logging you in!"} /> </Container>;
            // save token to local storage
            // set current user
            return <OnLogin history={history} data={data} /> 
          }}
        </Query>
      );
    }
    return <div>you should have been redirected!!!</div>;
  }
}

export default Index;
