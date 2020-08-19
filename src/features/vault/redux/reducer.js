import initialState from './initialState';
import { reducer as fetchBalancesReducer } from './fetchBalances';
import { reducer as fetchPoolBalancesReducer } from './fetchPoolBalances';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchDepositReducer } from './fetchDeposit';
import { reducer as fetchClaimReducer } from './fetchClaim';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
import { reducer as fetchFarmReducer } from './fetchFarm';
import { reducer as fetchHarvestReducer } from './fetchHarvest';
import { reducer as fetchPriceReducer } from './fetchPrice';

const reducers = [
  fetchBalancesReducer,
  fetchPoolBalancesReducer,
  fetchApprovalReducer,
  fetchDepositReducer,
  fetchClaimReducer,
  fetchWithdrawReducer,
  fetchFarmReducer,
  fetchHarvestReducer,
  fetchPriceReducer
];


export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}