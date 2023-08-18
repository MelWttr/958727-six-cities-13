import { NameSpace } from '../../const';
import { OfferCardType } from '../../types/offer-card';
import {State} from '../../types/state';

export const getSingleOffer = (state: State): OfferCardType | null => state[NameSpace.SingleOffer].singleOffer;
export const getSingleOfferError = (state: State): string | undefined => state[NameSpace.SingleOffer].error;
export const getIsSingleOfferLoading = (state: State): boolean => state[NameSpace.SingleOffer].isLoading;

