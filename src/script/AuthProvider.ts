import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { AccessToken, RefreshingAuthProvider } from '@twurple/auth'

import { Database } from './database.types.ts'

const dbUrl: string = import.meta.env.VITE_BOP_SB_URL
const dbKey: string = import.meta.env.VITE_BOP_SB_KEY

const clientId: string = import.meta.env.VITE_BOP_CLIENT_ID
const clientSecret: string = import.meta.env.VITE_BOP_CLIENT_SECRET

const options = {
  auth: {
    persistSession: false
  }
}

const db: SupabaseClient = createClient<Database>(dbUrl, dbKey, options)

const { data} = await db
  .from('tokens')
  .select('accessToken,refreshToken,expiresIn,obtainmentTimestamp')
  .limit(1)
  .single()

const authProvider: RefreshingAuthProvider = new RefreshingAuthProvider({ clientId, clientSecret })

async function setToken(userId: any, newTokenData: any) {

  console.log(userId)

  await db
    .from('tokens')
    .update(newTokenData)
    .eq('id', 1)
}

authProvider.onRefresh(setToken)

await authProvider.addUserForToken(data as AccessToken, ['chat'])

export default authProvider
