<script setup lang="ts">
import { reactive } from 'vue'
import { ChatClient, ChatMessage as CMsg } from '@twurple/chat'

import authProvider from './script/AuthProvider.ts'
import { MessageProps } from './script/MessageProps.ts'

import ChatMessage from './components/ChatMessage.vue'

const channel: string = window.location.hash.substring(1)
const chat: ChatClient = new ChatClient({ authProvider, channels: [channel] })

const messages = reactive<MessageProps[]>([])

function onMsgLeave() {
  messages.shift()
}

chat.onMessage((channel: string, user: string, text: string, msg: CMsg) => {

  const message: MessageProps = {
    id: msg.id || '',
    channel,
    name: user,
    user: msg.userInfo.displayName || '',
    color: msg.userInfo.color || '#FFFFFF',
    text
  }

  messages.push(message)
})

chat.connect()
</script>

<template>
  <div class="twitch-chatbox-container">
    <transition-group name="chat" tag="ul" class="twitch-chatbox">
      <ChatMessage
          v-for="msg in messages"
          :key="msg.id"
          :id="msg.id"
          :user="msg.user"
          :color="msg.color"
          :text="msg.text"
          @leave="onMsgLeave"
      />
    </transition-group>
  </div>
</template>

<style lang="scss">
.twitch-chatbox {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  padding: 0;
  margin: 0;
  list-style-type: none;

  &-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    overflow: hidden;
  }
}

.chat {

  &-enter-active,
  &-leave-active {
    transition: 0.4s ease-out;
    transition-property: transform, opacity;
  }

  &-enter-from {
    opacity: 0;
    transform: translateX(25%);
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(-25%);
  }
}
</style>
