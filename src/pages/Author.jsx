import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {

  const { id } = useParams()
  const [author, setAuthor] = useState()
  const [collection, setCollection] = useState()
  const [followText, setFollowText] = useState('Follow')

  async function fetchAuthor() {

    let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=' + id
    const response = await axios.get(url)

    response.data.nftCollection.map(nft => {
      nft.authorImage = response.data.authorImage
      return nft
    })

    setAuthor(response.data)

  }

  function follow() {

    if (followText === 'Follow') {
      setFollowText('Unfollow');
      setAuthor({ ...author, followers: author.followers + 1 });
    } else {
      setFollowText('Follow');
      setAuthor({ ...author, followers: author.followers - 1 });
    }

  }

  useEffect(() => {
    fetchAuthor()
  }, [])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author && author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author && author.authorName}
                          <span className="profile_username">@{author && author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author && author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{author && author.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={follow}>
                        {followText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">

                  {author &&
                    <AuthorItems nfts={author.nftCollection} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
