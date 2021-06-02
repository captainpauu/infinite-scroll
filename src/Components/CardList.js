import React, { Component } from "react";
import { connect } from "react-redux";

import JsonPlaceholder from "../APIs/JsonPlaceholder";
import CardItem from "./CardItem";
import { fetchCards, fetchCardsFailed, fetchCardsSuccess } from "./../Actions";
import { bindActionCreators } from "redux";

class CardList extends Component {
  constructor(props) {
    super(props);

    window.onscroll = () => {
      if (this.props.error || this.props.isLoading || !this.props.loadMore)
        return;

      // load more items if we touch bottom of document
      if (
        document.documentElement.offsetHeight ===
        window.innerHeight + document.documentElement.scrollTop
      ) {
        this.loadCards();
      }
    };
  }

  componentDidMount() {
    this.props.fetchCards();
    this.loadCards();
  }

  //call api to load cards and wait till api provides response
  async loadCards() {
    await JsonPlaceholder.get("/posts", {
      params: {
        _start: this.props.cardList.length + 1,
      },
    })
      .then((res) => {
        this.props.fetchCardsSuccess({
          loadMore: !(res.data.length < 10),
          cardList: res.data,
        });
      })
      .catch((err) => {
        this.props.fetchCardsFailed();
      });
  }

  renderCardList() {
    if (this.props.cardList.length > 0) {
      return this.props.cardList.map((card) => {
        return (
          <div key={card.id}>
            <CardItem item={card} />
          </div>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    return (
      <div className="card-list">
        <p>Scroll down to load more!!</p>
        <ul>{this.renderCardList()}</ul>
        <div style={{ color: "#f00" }}>{this.props.error}</div>
        {this.props.isLoading && <div>Loading...</div>}
        {!this.props.loadMore && <div>Loading Complete</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cardList: state.cardList,
    isLoading: state.isLoading,
    error: state.error,
    loadMore: state.loadMore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchCards, fetchCardsFailed, fetchCardsSuccess },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
