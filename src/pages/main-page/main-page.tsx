import { useCallback, useState, useEffect } from 'react';
import cn from 'classnames';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from './../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity, getFilterType, getIsOffersLoading, getSortedCards } from '../../store/offers-data/selectors';
import CityList from '../../components/city-list/city-list';
import Sorting from '../../components/sorting/sorting';
import { createOfferLocations } from '../../helpers/create-offer-locations';
import { Loader } from '../../components/loader/loader';
import { fetchOffers } from '../../store/api-actions';

function MainPage(): JSX.Element {
  const [activeCardId, setActiveCardId] = useState('');
  const activeCity = useAppSelector(getCity);
  const cards = useAppSelector(getSortedCards);
  const filter = useAppSelector(getFilterType);
  const isLoading = useAppSelector(getIsOffersLoading);
  const dispatch = useAppDispatch();

  const onMouseEnter = useCallback((id: string) => {
    setActiveCardId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveCardId('');
  }, []);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);


  if (isLoading) {
    return (
      <Loader />
    );
  }

  let locationForMap, offerLocations;

  const isCards = cards?.length !== 0;
  if (isCards) {
    locationForMap = cards[0].city.location;
    offerLocations = createOfferLocations(cards);

  }


  const noPlacesFound = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {cards.length} places to stay in {activeCity}
        </b>
      </section>
    </div>
  );

  const offersContainer = (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cards.length} places to stay in {activeCity}</b>
        <Sorting filter={filter}/>
        <PlaceCardList
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          cards={cards}
          className={cn(
            'cities__places-list',
            'places__list',
            'tabs__content'
          )}
          cardBlockName='cities'
        />
      </section>
      {
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              selectedPointId={activeCardId}
              locations={offerLocations}
              mainLocation={locationForMap}
            />
          </section>
        </div>
      }
    </div>
  );


  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CityList />
        </section>
      </div>
      <div className="cities">
        {isCards ? offersContainer : noPlacesFound}
      </div>
    </main>

  );
}

export default MainPage;
