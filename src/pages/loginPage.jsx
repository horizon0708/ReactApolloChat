import React from "react";
import queryString from "query-string";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import OnLogin from './onLogin'

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
              console.log(error)
              // history.push("/");
              return <p> error </p>;
            } // push to error page??
            if (loading) return <p> logging you in .. </p>;
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
