import React from "react";
import { Link } from "react-router-dom";
import NftCard from "../UI/NftCard";

const AuthorItems = ({ nfts }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {
            nfts.map(nft => (
              <NftCard card={nft} colClass='col-3' key={nft.id} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
