
// SPDX-License-Identifier: Apache-2.0

import type { Route, TFunction } from './types.js';

import Component from '@polkadot/app-calendar';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'network',
    icon: 'calendar-alt',
    name: 'calendar',
    text: t('nav.calendar', 'Event calendar', { ns: 'apps-routing' })
  };
}