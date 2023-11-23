import { Ref, ref } from 'vue'
import tmi from 'tmi.js'

import type { ChatMessageData } from '../types/chat-messages'

import assignColor from '../utils/assign-color'

export function useChatMessages(channel: string) {

  const chat: Ref<ChatMessageData[]> = ref([])
  const client = tmi.Client({
    channels: [channel]
  })

  client.on('message', (channel, tags, message) => {

    chat.value.push({
      id: tags.id,
      type: tags['message-type'],
      channel: channel.substring(1),
      name: tags['display-name'],
      color: tags.color || assignColor(tags.username),
      badges: tags.badges,
      message,
      emotes: tags.emotes,
      time: new Date().toLocaleTimeString()
    })
  })

  client.connect()

  return chat
}
