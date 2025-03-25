
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Slider from "react-slick"
import NftCard from "../UI/NftCard"

const NewItems = () => {
  const [newItems, setNewItems] = useState([])
  const [currentTime, setCurrentTime] = useState(Date.now())
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
          {!newItems || newItems.length === 0 ? (
            <Slider {...sliderSettings}>
              {
                new Array(4).fill(0).map((_, index) => (
                  <NftCard card={null} key={index} />
                ))
              }
            </Slider>
          ) : (

            <Slider {...sliderSettings}>
              {
                newItems.map(newItem => (
                  <NftCard card={newItem} key={newItem.id} colClass={''} />
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
