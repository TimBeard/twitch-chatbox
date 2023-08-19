<script setup lang="ts">
import { reactive } from 'vue'

import { MessageProps } from './script/MessageProps.ts'
import ChatClient from './script/ChatClient.ts'

import ChatMessage from './components/ChatMessage.vue'

const messages = reactive<MessageProps[]>([])

function onMsgLeave() {
  messages.shift()
}

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
