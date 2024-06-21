// SPDX-License-Identifier: Apache-2.0

import type { AccountStoreApi } from './account-store-api.js';

export interface ElectronMainApi {
  accountStore: AccountStoreApi
}
