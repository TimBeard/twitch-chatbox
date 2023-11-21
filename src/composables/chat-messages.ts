import { Ref, ref } from 'vue'
import tmi from 'tmi.js'

import type { ChatMessageData } from '../types/chat-box'

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
      color: tags.color || 'currentColor',
      badges: tags.badges,
      message,
      emotes: tags.emotes
    })
  })

  client.connect()

  return chat
}

/*
{
    "badge-info": {
        "subscriber": "8"
    },
    "badges": {
        "subscriber": "6",
        "superultracombo-2023": "1"
    },
    "client-nonce": "bc9fcaf971575d1f529cb6bf14805e77",
    "color": "#53B222",
    "display-name": "djkikiss",
    "emote-only": true,
    "emotes": {
        "emotesv2_93f6fc78a96b46b9ba132dd112983967": [
            "0-8"
        ]
    },
    "first-msg": false,
    "flags": null,
    "id": "f39a6827-9365-42cb-8fbd-91a679f5ae83",
    "mod": false,
    "returning-chatter": false,
    "room-id": "37523739",
    "subscriber": true,
    "tmi-sent-ts": "1700573337035",
    "turbo": false,
    "user-id": "442925345",
    "user-type": null,
    "emotes-raw": "emotesv2_93f6fc78a96b46b9ba132dd112983967:0-8",
    "badge-info-raw": "subscriber/8",
    "badges-raw": "subscriber/6,superultracombo-2023/1",
    "username": "djkikiss",
    "message-type": "chat"
}
*/
