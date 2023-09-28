import { reactive } from 'vue'
import { ChatClient, ChatMessage as CMsg } from '@twurple/chat'

import authProvider from './AuthProvider.ts'
import { MessageProps } from './MessageProps.ts'
import { channel } from './ChannelInfoProvider.ts'
import { badges } from './BadgesProvider.ts'

const chat: ChatClient = new ChatClient({ authProvider, channels: [channel] })

export const messages = reactive<MessageProps[]>([])

function transformEmotesMap(emotesMap?: Map<string, string[]>): Map<string, string> {

  if (!emotesMap) return new Map()

  const transformedMap: Map<string, string> = new Map()

  for (const [emoteId, offsets] of emotesMap.entries()) {

    for (const offset of offsets) {

      const [start, end] = offset.split('-').map(parseFloat)
      transformedMap.set([start, end].join('-'), emoteId)
    }
  }

  const sortedTransformedMap: Map<string, string> = new Map([...transformedMap.entries()]
    .sort((a, b) => a[0].split('-').map(parseFloat)[0] - b[0].split('-').map(parseFloat)[0]));

  return sortedTransformedMap
}

function getParentMessage(parentId: string |null): string | undefined {
  const parentMessage = messages.find(msg => msg.id === parentId)
  return parentMessage?.text
}

chat.onMessage(async (channel: string, user: string, text: string, msg: CMsg) => {

  const message: MessageProps = {
    id: msg.id || '',
    channel,
    name: user,
    user: msg.userInfo.displayName || '',
    color: msg.userInfo.color || '#FFFFFF',
    text: text.replace(/[<>"^]/g, (e) => `&#${e.charCodeAt(0)};`),
    isHighlight: msg.isHighlight,
    isReply: msg.isReply,
    parentMessage: getParentMessage(msg.parentMessageId),
    badges: [],
    emotes: transformEmotesMap(msg.emoteOffsets)
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
