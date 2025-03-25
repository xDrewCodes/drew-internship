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
    setExpItems(response.data)

  }

  useEffect(() => {
    getExploreItems()
  }, [])

  function sortItems(sort) {

    let sorted = [...expItems]

    switch (sort) {
      case 'price_low_to_high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price_high_to_low':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'likes_high_to_low':
        sorted.sort((a, b) => b.likes - a.likes)
        break
      default:
        break
    }

    setExpItems(sorted)

  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => sortItems(e.target.value)}>
          <option disabled value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!expItems
      ?
      new Array(8).fill(0).map((_, index) => <NftCard card={null} key={index} colClass={'col-3'} />)
      :
        expItems.slice(0, itemsShown).map(expItem => {
          return (
            <NftCard card={expItem} colClass={'col-3'} key={expItem.id} />
          )
        })

      }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={() => itemsShown < expItems.length ? setItemsShown(itemsShown + 4) : setItemsShown(expItems.length)}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
