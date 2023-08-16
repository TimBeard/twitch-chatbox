<script setup lang="ts">
const { user, color, text } = defineProps<{
  user: string,
  color: string,
  text: string
}>()
</script>

<template>
  <li class="twitch-chat-message">
    <h1 class="chat-message-title" :style="`--color: ${color}`">{{ user }}</h1>
    <p class="chat-message-content">{{ text }}</p>
  </li>
</template>

<style lang="scss">
@keyframes slideInRight {

  from {
    opacity: 0;
    transform: translateX(25%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.twitch-chat-message {
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);

  & + & {
    margin-top: 1em;
  }
}

.chat-message {

  &-title {
    width: fit-content;
    font-size: 1em;
    color: var(--color);
    line-height: normal;
    margin: 0;
    animation: 0.2s ease-in 1 forwards slideInRight;
  }

  &-content {
    width: fit-content;
    text-align: justify;
    margin: 0;
    animation: 0.2s ease-in 1 forwards slideInRight;
  }
}
</style>
