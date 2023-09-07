import { ApiClient } from '@twurple/api'

import authProvider from './AuthProvider.ts'

export const Api: ApiClient = new ApiClient({ authProvider })
