import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "", songId: props.songId };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    event.preventDefault();
    this.setState({ content: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.state.songId,
        },
      })
      .then(() => {
        this.setState({ content: "" });
      })
      .catch((error) => {
        console.error("Error submitting lyric:", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler}>
        <label>Add a Lyric</label>
        <input
          type="text"
          value={this.state.content}
          onChange={this.onChangeHandler}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default LyricCreate;
