import { Query, graphql } from "react-apollo";
import React from "react";
import gql from 'graphql-tag'
import { Input, Container } from './shared'

const EDIT_MESSAGE = gql`
mutation($message: String!, $id: ID!){
  updateMessage(message: $message, id: $id){
    id
  }
  updateEditId(editId: null) @client{
    id
  }
}
`

class EditMessage extends React.Component {
  state = {
    message: "",
    focused: false
  };

  componentDidMount() {
    const { message } = this.props;
    if (message) {
      this.setState({ message });
    }
  }

  handleInput = e => {
    this.setState({ message: e.target.value });
  };

  onFocus = e => {
    this.setState({ focused: true });
  };

  onBlur = e => {
    this.setState({ focused: false });
  };

  onPress = e => {
    const { message, focused } = this.state;
    const { messageId, mutate } = this.props;
    if (e.key === "Enter" && focused && message.length > 0) {
      mutate({
        variables: {
          message,
          id: messageId
        }
      });
      this.setState({message: ""})
    }
  };

  render() {
    const { message } = this.state;
    return (
      <Container>
        <Input
          onFocus={this.onFocus}
          onKeyPress={this.onPress}
          onBlur={this.onBlur}
          onChange={this.handleInput}
          value={message}
        />
      </Container>
    );
  }
}

export default graphql(EDIT_MESSAGE)(EditMessage);