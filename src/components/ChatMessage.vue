<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { HelixChatBadgeVersion } from '@twurple/api'

import ChatBadge from './ChatBadge.vue'

const { id, user, color, text, badges, emotes } = defineProps<{
  id: string,
  user: string,
  color: string,
  text: string,
  badges: HelixChatBadgeVersion[],
  emotes?: Map<string, string[]>
}>()

const emit = defineEmits<{ leave: [id: string] }>()
const message = ref<HTMLElement>()

function attachEmotes(text: string, emotes?: Map<string, string[]>) {

  if (!emotes) return text

  let output: string = text

  let cursor = 0

  emotes.forEach((emote, offset) => {

    const emoteTag = `<img class="chat-message-emote" src="https://static-cdn.jtvnw.net/emoticons/v2/${emote}/default/dark/1.0" alt="${emote}" />`

    const [from, to] = offset.split('-').map(parseFloat)

    const start = output.slice(0, from + cursor)
    const end = output.slice(cursor + to + 1)

    output = start + emoteTag + end
    cursor += emoteTag.length - (to - from + 1)
  })

  return output
}

onMounted(() => {

  if (!message.value) return

  const observer: IntersectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      const { top }: DOMRectReadOnly = entry.boundingClientRect

      if (top <= 0) {
        emit('leave', id)
      }
    })
  }, { rootMargin: '8px', threshold: 1.0 })

  observer.observe(message.value)
})
</script>

<template>
  <li class="twitch-chat-message" ref="message" :style="`--color: ${color}`">
    <div class="chat-message-header">
      <h1 class="chat-message-title">{{ user }}</h1>

      <ul class="chat-message-badges">
        <ChatBadge
            v-for="badge in badges"
            :key="`${id}-${badge.id}`"
            :badge="badge"
        />
      </ul>
    </div>

    <p
        class="chat-message-content"
        v-html="attachEmotes(text, emotes)"
    />
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
  position: relative;
  padding: 1em 1em 1em 1.5em;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 100%;
    background-color: var(--color);
  }

  & + & {
    margin-top: 1em;
  }
}

.chat-message {

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-title {
    width: fit-content;
    font-size: 1em;
    color: var(--color);
    line-height: 1.75;
    margin: 0 0 0.5em;
    animation: 0.2s ease-in 1 forwards slideInRight;
  }

  &-badges {
    display: flex;
    align-items: center;
    list-style-type: none;
    gap: 0.5em;
  }

  &-content {
    width: fit-content;
    text-align: justify;
    line-height: 1.75;
    margin: 0;
    animation: 0.2s ease-in 1 forwards slideInRight;
  }

  &-emote {
    vertical-align: middle;
  }
}
</style>
