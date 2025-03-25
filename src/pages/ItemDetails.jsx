import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {

  const { id } = useParams()
  const [nft, setNft] = useState()

  async function fetchNFT() {

    const url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=' + id
    const response = await axios.get(url)

    setNft(response.data)

  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNFT()
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {
          !!nft ?
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div className="img-fluid img-rounded mb-sm-30 nft-image skelly"></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2 className="skelly">nft title nft title</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views skelly">
                          <i className="fa fa-eye skelly"></i>
                          views
                        </div>
                        <div className="item_info_like skelly">
                          <i className="fa fa-heart skelly"></i>
                          likes
                        </div>
                      </div>
                      <p className="skelly">
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                        illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6 className="skelly">owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div className="skelly-pp skelly"></div>
                            </div>
                          </div>
                          <div className="author_list_info skelly" style={{ marginLeft: '70px', height: '25px', marginBottom: '10px', marginTop: '20px' }}>owner</div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6 className="skelly">creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <div className="skelly-pp skelly"></div>
                            </div>
                          </div>
                          <div className="author_list_info skelly" style={{ marginLeft: '70px', height: '25px', marginTop: '20px' }}>creator</div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6 className="skelly" style={{ margin: '16px 0' }}>Price</h6>
                        <div className="nft-item-price">
                          <span className="skelly" style={{ marginRight: '8px' }}>oo</span>
                          <span className="skelly">price</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            :
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={nft.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{nft.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nft.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nft.likes}
                        </div>
                      </div>
                      <p>
                        {nft.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nft.ownerId}`}>
                                <img className="lazy" src={nft.ownerImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nft.creatorId}`}>
                                <img className="lazy" src={nft.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nft.creatorId}`}>{nft.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nft.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        }
      </div>
    </div>
  );
};

export default ItemDetails;
