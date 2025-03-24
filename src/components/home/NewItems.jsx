import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Slider from "react-slick"

const NewItems = () => {
  const [newItems, setNewItems] = useState([])
  const [currentTime, setCurrentTime] = useState(Date.now())  // Store current time
  const [expireTimes, setExpireTimes] = useState({})

  const sliderSettings = {
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
  }

  async function getItems() {
    let url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
    let response = await axios.get(url)
    setNewItems(response.data)
    console.log(response.data)

    // Set the expire times in a separate state
    let initialExpireTimes = {}
    response.data.forEach(item => {
      initialExpireTimes[item.id] = item.expiryDate
    })
    setExpireTimes(initialExpireTimes)
  }

  function calcTime(expire) {
    const timeLeft = expire - currentTime
    let prettyTimeLeft = ''

    if (timeLeft > 0) {
      prettyTimeLeft += Math.floor(timeLeft / 1000 / 60 / 60) + 'h '
      prettyTimeLeft += Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)) + 'm '
      prettyTimeLeft += Math.floor((timeLeft % (1000 * 60)) / 1000) + 's'
    } else {
      prettyTimeLeft = 'Expired'
    }

    return prettyTimeLeft
  }


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    getItems()
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          { !newItems || newItems.length === 0 ? (
            'loading...'
          ) : (
          
            <Slider {...sliderSettings}>
              {
                newItems.map(newItem => (
                  <div className="" key={newItem.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${newItem.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${newItem.authorId}`}
                        >
                          <img className="lazy" src={newItem.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
      
                      {newItem.expiryDate && (
                        <div className="de_countdown">
                          {calcTime(expireTimes[newItem.id] || newItem.expiryDate)}
                        </div>
                      )}
      
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
      
                        <Link to="/item-details">
                          <img
                            src={newItem.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{newItem.title}</h4>
                        </Link>
                        <div className="nft__item_price">{newItem.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{newItem.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </Slider>

          )
        }
        </div>
      </div>
    </section>
  )
}

export default NewItems
