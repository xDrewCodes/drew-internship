import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {

  const [ topSellers, setTopSellers ] = useState()

  async function getTopSellers() {

    let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
    let response = await axios.get(url)
    let responseFiltered = response.data.sort((a, b) => b.price - a.price)
    setTopSellers(responseFiltered)

  }

  useEffect(() => {
    getTopSellers()
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers &&
              topSellers.map(seller => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
