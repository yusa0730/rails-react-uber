import React, {Fragment, useEffect, useReducer} from "react";
import {
  initialState as foodInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods';
import { fetchFoods } from "../apis/foods";
import { REQUEST_STATE } from "../constants";

import styled from 'styled-components';

import { COLORS } from '../style_constants';
import { LocalMallIcon } from '../components/Icons';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;


export const Foods = ({
  match
}) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodInitialState);

  useEffect(() => {
    dispatch({type: foodsActionTypes.FETCHING});
    console.log('matchのtest');
    console.log(match);
    console.log(dispatch);
    console.log(foodsState);
    fetchFoods(match.params.restaurantsId)
      .then((data) =>{
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
  }, [])

  return (
    <Fragment>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
        <Fragment>
          <p>
            ロード中
          </p>
        </Fragment>
      :
        foodsState.foodsList.map(food =>
          <div key={food.id}>
            {food.name}
          </div>
        )
      }
    </Fragment>
  )
}