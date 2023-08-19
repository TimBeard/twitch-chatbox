<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { id, user, color, text } = defineProps<{
  id: string,
  user: string,
  color: string,
  text: string
}>()

const emit = defineEmits<{ leave: [id: string] }>()
const message = ref<HTMLElement>()

onMounted(() => {

  if (!message.value) return

  const threshold: number = message.value.offsetHeight
  const observer: IntersectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      const { top }: DOMRectReadOnly = entry.boundingClientRect

      if (top <= threshold) {
        emit('leave', id)
      }
    })
  }, { rootMargin: '8px', threshold: 1.0 })

  observer.observe(message.value)
})
</script>

<template>
  <li class="twitch-chat-message" ref="message">
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
    line-height: 1.25;
    margin: 0 0 0.5em;
    animation: 0.2s ease-in 1 forwards slideInRight;
  }

  &-content {
    width: fit-content;
    text-align: justify;
    line-height: 1.25;
    margin: 0;
    animation: 0.2s ease-in 1 forwards slideInRight;
  }
}
</style>
