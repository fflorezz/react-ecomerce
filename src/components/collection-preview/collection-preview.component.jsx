import React from "react";

import "./collection-preview.styles.scss";

import CollectionItem from "../collection-item/collection-item.commponent";
import { withRouter } from "react-router-dom";

const CollectionPreview = ({ title, items, match, history, routeName }) => (
  <div className="collection-preview">
    <h1
      className="title"
      onClick={() => history.push(`${match.url}/${routeName}`)}
    >
      {title.toUpperCase()}
    </h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
