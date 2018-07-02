import React from "react";
import Message from "./message";
import colors from "../../style/colors";
import styled from "styled-components";
import Waypoint from "react-waypoint";
import ErrorMessage from '../icons/error';
import LoadingSpinner from '../icons/loading';


const ScrollContainer = styled.div`
  background-color: ${colors.background};
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.props.subscribeToNewMessages();
    this.props.subscribeToUpdate();
  }

  scrollToBottom = behavior => {
    this.messagesEnd.current.scrollIntoView({ behavior });
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.loading) {
      this.scrollToBottom("instant");
    }
    const { data, currentChannel } = this.props;
    if (
      prevProps.data &&
      prevProps.data.listMessages &&
      data &&
      data.listMessages
    ) {
      if (
        prevProps.data.listMessages.messages.length + 1 ===
        data.listMessages.messages.length) {
        this.scrollToBottom("instant");
      }
    }
    if(prevProps.currentChannel !== currentChannel) {
      this.scrollToBottom("instant");
    }
  }

  renderData() {
    const { loading, error, data, userId } = this.props;
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage /> 
    if(!data.listMessages) return <LoadingSpinner /> 
    const reversed = [...data.listMessages.messages].reverse();
    return reversed.map((message, i) => {
      return <Message userId={userId} key={`${message.id}_${i}`} {...message} />;
    });
  }

  render() {
    return (
      <ScrollContainer id={"infi_scroll_target"}>
        <Waypoint onEnter={this.props.onLoadMore} />
        {this.renderData()}
        <div style={{ float: "left", clear: "both" }} ref={this.messagesEnd} />
      </ScrollContainer>
    );
  }
}

export default MessagePage;

//scroll area <- this component triggers react rerender on each scroll.
