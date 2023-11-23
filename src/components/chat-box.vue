<template>
  <section class="chat-box">
    <div class="chat-box-wrapper">
      <ChatMessage
        v-for="message in chat"
        :key="message.id"
        v-bind="message"
        @exit-view="removeMessage(message.id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useChatMessages } from '../composables/chat-messages'

import ChatMessage from './chat-message.vue'

const { params: { id: channel } } = useRoute()
const chat = useChatMessages(channel as string)

function removeMessage(msgId?: string): void {

  if (!msgId) {
    return
  }

  const msgIndex: number = chat.value.findIndex(({ id }) => id === msgId)

  chat.value.splice(msgIndex, 1)
}
</script>

<style lang="scss">
.chat-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;

  &-wrapper {
    height: fit-content;
  }
}
</style>
