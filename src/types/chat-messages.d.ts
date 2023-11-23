import type { Badges } from 'tmi.js'

export type Emotes = {
  [emoteid: string]: string[]
}

export type ParsedEmote = {
  name: string
  from: number
  to: number
}

export type ChatMessageData = {
  id?: string
  type?: string
  channel: string
  name?: string
  color: string
  badges?: Badges
  message: string
  emotes?: Emotes
  time: string
}
