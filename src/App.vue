<script setup lang="ts">
import { reactive, watch } from 'vue'

import { MessageProps } from './script/MessageProps.ts'
import ChatClient from './script/ChatClient.ts'

import ChatMessage from './components/ChatMessage.vue'

const messages = reactive<MessageProps[]>([])

ChatClient.on('message', (channel, tags, message, self) => {

  if (self) return

  const msg: MessageProps = {
    id: tags.id || '',
    channel,
    user: tags['display-name'] || '',
    color: tags.color || '#FFFFFF',
    text: message
  }

  messages.push(msg)
})

watch(messages, () => {

  if (messages.length > 16) {
    messages.shift()
  }
})
</script>

<template>
  <ul class="twitch-chatbox">
    <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :user="msg.user"
        :color="msg.color"
        :text="msg.text"
    />
  </ul>
</template>

<style lang="scss">
.twitch-chatbox {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  height: fit-content;
  min-height: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
</style>
