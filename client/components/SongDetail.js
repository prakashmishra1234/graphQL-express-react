import React, { Component } from "react";
import { graphql } from "react-apollo";
import fetchSong from "../queries/fetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    const { song } = this.props.data;

    return (
      <div>
        <Link to="/">Back</Link>
        {/* <h3>Song Detail</h3> */}
        <h3>{song.title}</h3>
        <LyricList />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: (props) => ({
    variables: { id: props.params.id },
  }),
})(SongDetail);
