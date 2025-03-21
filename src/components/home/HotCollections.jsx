import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from 'react-slick';

const HotCollections = () => {

  const [collections, setCollections] = useState([]);

  const collSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  async function getCollections() {
    try {
      let response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  }

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {!collections || collections.length === 0 ? (
            <Slider {...collSettings}>
            {
            new Array(4).fill(0).map((_, index) => (
              <div className="skelly-container" key={index}>
                <div className="nft_coll skelly-container">
                  <div className="nft_wrap skelly-container">
                      <div className="skelly skelly-fill"></div>
                  </div>
                  <div className="nft_coll_pp">
                    <div className="skelly-pp"></div>
                  <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info skelly-container">
                      <h4 className="skelly">Author Name</h4>
                    <h6 className="skelly">ERC-121</h6>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          ) : (
            <Slider {...collSettings}>
              {collections.map((collection) => (
                <div className="" key={collection.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details/">
                        <img src={collection.nftImage || 'https://via.placeholder.com/150'} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={collection.authorImage || 'https://via.placeholder.com/50'} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}

        </div>
      </div>
    </section>
  );
};

export default HotCollections;
