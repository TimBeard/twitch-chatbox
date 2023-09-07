import { reactive } from 'vue'
import { ChatClient, ChatMessage as CMsg } from '@twurple/chat'

import authProvider from './AuthProvider.ts'
import { MessageProps } from './MessageProps.ts'
import { channel } from './ChannelInfoProvider.ts'
import { badges } from './BadgesProvider.ts'

const chat: ChatClient = new ChatClient({ authProvider, channels: [channel] })

export const messages = reactive<MessageProps[]>([])

chat.onMessage(async (channel: string, user: string, text: string, msg: CMsg) => {

  const message: MessageProps = {
    id: msg.id || '',
    channel,
    name: user,
    user: msg.userInfo.displayName || '',
    color: msg.userInfo.color || '#FFFFFF',
    text,
    badges: []
  }

  msg.userInfo.badges.forEach((version, setId) => {

    const badgeSet = badges.find(set => set.id === setId)

    if (badgeSet) {

      const badgeVersion = badgeSet.getVersion(version)

      if (badgeVersion) {
        message.badges.push(badgeVersion)
      }
    }
  })

  messages.push(message)
})

chat.connect()
