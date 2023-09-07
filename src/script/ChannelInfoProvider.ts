import { HelixUser } from '@twurple/api'
import { Api } from './ApiClient.ts'

export const channel: string = window.location.hash.substring(1)
export const user: HelixUser | null = await Api.users.getUserByName(channel)
