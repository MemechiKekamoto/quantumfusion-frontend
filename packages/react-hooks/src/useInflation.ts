// Copyright 2017-2024 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@polkadot/api';
import type { BN } from '@polkadot/util';
import type { Inflation } from './types.js';

import { useEffect, useState } from 'react';

import { getInflationParams } from '@polkadot/apps-config';
import { BN_MILLION, BN_ZERO } from '@polkadot/util';

import { createNamedHook } from './createNamedHook.js';
import { useApi } from './useApi.js';
import { useCall } from './useCall.js';

const EMPTY: Inflation = { idealInterest: 0, idealStake: 0, inflation: 0, stakedFraction: 0, stakedReturn: 0 };

function calcInflation (api: ApiPromise, totalStaked: BN, totalIssuance: BN, numAuctions: BN): Inflation {
  const { auctionAdjust, auctionMax, falloff, maxInflation, minInflation, stakeTarget } = getInflationParams(api);
  const stakedFraction = totalStaked.isZero() || totalIssuance.isZero()
    ? 0
    : totalStaked.mul(BN_MILLION).div(totalIssuance).toNumber() / BN_MILLION.toNumber();
  // Ideal is less based on the actual auctions
  const idealStake = stakeTarget - (Math.min(auctionMax, numAuctions.toNumber()) * auctionAdjust);
  const idealInterest = maxInflation / idealStake;
  // inflation calculations
  const inflation = 100 * (minInflation + (
    stakedFraction <= idealStake
      ? (stakedFraction * (idealInterest - (minInflation / idealStake)))
      : (((idealInterest * idealStake) - minInflation) * Math.pow(2, (idealStake - stakedFraction) / falloff))
  ));

  return {
    idealInterest,
    idealStake,
    inflation,
    stakedFraction,
    stakedReturn: stakedFraction
      ? (inflation / stakedFraction)
      : 0
  };
}

function useInflationImpl (totalStaked?: BN): Inflation {
  const { api } = useApi();
  const totalIssuance = useCall<BN>(api.query.balances?.totalIssuance);
  const auctionCounter = useCall<BN>(api.query.auctions?.auctionCounter);
  const [state, setState] = useState<Inflation>(EMPTY);

  useEffect((): void => {
    const numAuctions = api.query.auctions
      ? auctionCounter
      : BN_ZERO;

    numAuctions && totalIssuance && totalStaked && setState(
      calcInflation(api, totalStaked, totalIssuance, numAuctions)
    );
  }, [api, auctionCounter, totalIssuance, totalStaked]);

  return state;
}

export const useInflation = createNamedHook('useInflation', useInflationImpl);
