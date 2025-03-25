import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {

  const [expItems, setExpItems] = useState()
  const [itemsShown, setItemsShown] = useState(8)

  async function getExploreItems() {

    const url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
    const response = await axios.get(url)
    console.log(response.data)
    setExpItems(response.data)

  }

  useEffect(() => {
    getExploreItems()
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
        {expItems &&

          expItems.slice(0, itemsShown).map(expItem => {
            return (
              <NftCard card={expItem} colClass={'col-3'} key={expItem.id} />
            )
          })

        }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
