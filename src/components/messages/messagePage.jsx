import React from "react";
import Message from "./message";
import colors from "../../style/colors";
import styled from "styled-components";

const ScrollContainer = styled.div`
  background-color: ${colors.background};
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.props.subscribeToNewMessages();
    this.props.subscribeToUpdate();
    this.scrollToBottom("instant");
  }

  scrollToBottom = behavior => {
    this.messagesEnd.current.scrollIntoView({ behavior });
  };

  componentDidUpdate() {
    this.scrollToBottom("instant");
  }

  renderData() {
    const { loading, error, data } = this.props;
    if (loading) return <p> loading .. </p>;
    if (error) return <p> error! :( </p>;
    return data.channel.messages.map(message => {
      return <Message key={message.id} {...message} />;
    });
  }

  render() {
    return (
        <ScrollContainer>
          {this.renderData()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={this.messagesEnd}
          />
        </ScrollContainer>
    );
  }
}

// this component triggers react rerender on each scroll.
//        // <ScrollArea
//     style={{backgroundColor: colors.background, boxSizing: "border-box"}}
//     speed={0.8}
//     className="area"
//     contentClassName="content"
//     horizontal={false}
//     >
{
  /* </ScrollArea> */
}
