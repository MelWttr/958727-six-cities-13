import { OfferCardType } from '../../types/offer-card';
import { PlaceCardType } from '../../types/place-card';
import { useState } from 'react';
import { capitalize } from '../../helpers/capitalize';
import ReviewForm from '../../components/review-form/review-form';
import { ReviewType } from '../../types/review';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceCardList from './../../components/place-card-list/place-card-list';
import cn from 'classnames';
import Map from '../../components/map/map';

type OfferPageProps = {
  cards: PlaceCardType[];
  offer: OfferCardType;
  reviews: ReviewType[];
  authorizationStatus: string;
};

function OfferPage(props: OfferPageProps): JSX.Element {
  const { cards: cardsFromProps, offer, reviews, authorizationStatus } = props;
  const cards = cardsFromProps.slice(1, 4);

  const [ marked, setIsMarked ] = useState(offer.isFavorite);

  const handleMarkButtonClick = () => setIsMarked(!marked);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              offer.images.map((item) => (
                <div key={item} className="offer__image-wrapper">
                  <img className="offer__image" src={item} alt="Photo studio" />
                </div>
              ))
            }

          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
              <button
                onClick={handleMarkButtonClick}
                className="offer__bookmark-button button"
                type="button"
              >
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${offer.rating * 20}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{capitalize(offer.type)}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
            Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What`&apos;`s inside</h2>
              <ul className="offer__inside-list">
                {
                  offer.goods.map((item) => <li key={item} className="offer__inside-item">{item}</li>)
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width={74}
                    height={74}
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                <span className="offer__user-status">{offer.host.isPro}</span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
            Reviews · <span className="reviews__amount">{reviews.length}</span>
              </h2>
              <ReviewsList reviews={reviews}/>
              <ReviewForm authorizationStatus={authorizationStatus}/>
            </section>
          </div>
        </div>
        <section className="offer__map map">
          <Map
            selectedPointId={offer.id}
            cards={[{...offer, previewImage: ''}, ...cards]}
            city={cards[0].city}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <PlaceCardList
              className={cn(
                'near-places__list',
                'places__list'
              )}
              cards={cards}
              cardBlockName='near-places'
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;


