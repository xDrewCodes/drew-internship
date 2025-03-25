
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NftCard = ({ card, colClass }) => {

    const [currentTime, setCurrentTime] = useState(Date.now())

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

    return (
        <>
            {
                !card
                    ?
                    <div
                        data-aos='fade-in'
                        data-aos-duration='600'
                        className={colClass}>
                        <div className="nft__item">
                            <div className="author_list_pp">
                                <div>
                                    <div className="lazy skelly-pp" src="" alt="" />
                                    <i className="fa fa-check"></i>
                                </div>
                            </div>
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
                                <div className="lazy nft__item_preview skelly-fill skelly skelly-item" />
                            </div>
                            <div className="nft__item_info">
                                <h4 className="skelly">author author</h4>
                                <h4 className="nft__item_price skelly">price</h4>
                                <div className="nft__item_like">
                                    <span className="skelly">likes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div
                        data-aos='fade-in'
                        data-aos-duration='600'
                        className={colClass}>
                        <div className="nft__item">
                            <div className="author_list_pp">
                                <Link
                                    to={card.authorId ? `/author/${card.authorId}` : '#'}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title={`Creator: ${card.authorId}`}
                                >
                                    <img className="lazy" src={card.authorImage} alt="" />
                                    <i className="fa fa-check"></i>
                                </Link>
                            </div>

                            {card.expiryDate && (
                                <div className="de_countdown">
                                    {calcTime(card.expiryDate)}
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

                                <Link to={`/item-details/${card.nftId}`}>
                                    <img
                                        src={card.nftImage}
                                        className="lazy nft__item_preview"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="nft__item_info">
                                <Link to={`/item-details/${card.nftId}`}>
                                    <h4>{card.title}</h4>
                                </Link>
                                <div className="nft__item_price">{card.price} ETH</div>
                                <div className="nft__item_like">
                                    <i className="fa fa-heart"></i>
                                    <span>{card.likes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )

}

export default NftCard
