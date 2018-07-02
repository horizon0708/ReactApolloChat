import { graphql } from "react-apollo";
import React from "react";
import gql from "graphql-tag";
import { Input, Container, Flash } from "./shared";

const ADD_MESSAGE = gql`
  mutation($message: String!, $channelId: ID!, $userId: ID!) {
    createMessage(message: $message, channelId: $channelId, userId: $userId) {
      id
    }
  }
`;

class CreateMessage extends React.Component {
  state = {
    message: "",
    focused: false,
    flash: " "
  };

  componentDidMount() {
    const { message } = this.props;
    if (message) {
      this.setState({ message });
    }
  }

  onFocus = e => {
    this.setState({ focused: true });
  };

  onBlur = e => {
    this.setState({ focused: false });
  };

  handleInput = e => {
    this.setState({ message: e.target.value });
  };

  onPress = e => {
    const { message, focused } = this.state;
    const { channelId, userId, mutate } = this.props;
    if (e.key === "Enter" && focused && message.length > 0) {
      if(userId) {
        mutate({
          variables: {
            message,
            channelId,
            userId
          }
        });
      } else {
        this.setState({flash: "You must be signed in to send messages!"}, ()=>{
          setTimeout(()=>this.setState({flash: " "}), 3000);
        })
      }
      this.setState({message: ""})
    }
  };

  render() {
    const { message, flash } = this.state;
    const { userId } = this.props;
    return (
      <Container>
        <Input
          placeholder={userId ? "Start chatting by typing here!" : "You must be signed in to chat with others"}
          onFocus={this.onFocus}
          onKeyPress={this.onPress}
          onBlur={this.onBlur}
          onChange={this.handleInput}
          value={message}
        />
        <Flash>
          {" "}{flash}   
        </Flash> 
      </Container>
    );
  }
}

export default graphql(ADD_MESSAGE)(CreateMessage);
