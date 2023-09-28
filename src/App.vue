<script setup lang="ts">
import ChatMessage from './components/ChatMessage.vue'

import { messages } from './script/ChatClient.ts'
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
          :is-highlight="msg.isHighlight"
          :is-reply="msg.isReply"
          :parent-message="msg.parentMessage"
          :badges="msg.badges"
          :emotes="msg.emotes"
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
