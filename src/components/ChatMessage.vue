<script setup lang="ts">
import { ref } from 'vue'
import { HelixChatBadgeVersion } from '@twurple/api'

import ChatBadge from './ChatBadge.vue'

const { id, user, color, text, isHighlight, isReply, parentMessage, badges, emotes } = defineProps<{
  id: string,
  user: string,
  color: string,
  text: string,
  isHighlight: boolean,
  isReply: boolean,
  parentMessage?: string,
  badges: HelixChatBadgeVersion[],
  emotes?: Map<string, string>
}>()

const message = ref<HTMLElement>()

function attachEmotes(text: string, emotes?: Map<string, string>) {

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
</script>

<template>
  <li
      :class="[
          'twitch-chat-message',
          isHighlight && 'is-highlight',
          isReply && 'is-reply'
      ]"
      ref="message"
      :style="`--color: ${color}`"
  >
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
        v-if="parentMessage"
        class="chat-message-parent"
    >
      {{ parentMessage }}
    </p>

    <p
        class="chat-message-content"
        v-html="attachEmotes(text, emotes)"
    />
  </li>
</template>

<style lang="scss">
@keyframes pop {

  0% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.75);
  }

  50% {
    transform: scale(1.5);
  }

  90% {
    transform: scale(0.75);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shine {

  0% {
    right: 100%;
    background: rgba(255, 255, 255, 0.05);
  }

  50% {
    right: -100%;
    background: rgba(255, 255, 255, 0.2);
  }

  100% {
    right: 100%;
    background: rgba(255, 255, 255, 0.05);
  }
}

.twitch-chat-message {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1em 1em 1em 1.5em;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 100%);

  &::after {
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

  &.is-highlight {
    animation: 0.3s linear 0.5s 1 forwards pop;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.3);
      transform: skewX(-30deg);
      animation: 0.6s linear 0.5s 1 forwards shine;
    }
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
  }

  &-badges {
    display: flex;
    align-items: center;
    list-style-type: none;
    gap: 0.5em;
  }

  &-parent {
    display: flex;
    align-items: center;
    position: absolute;
    top: -1.5em;
    left: 1em;
    padding: 0 0.5em;
    background-color: aliceblue;
    color: darkslategray;

    &::before {
      content: '';
      width: 1.75em;
      height: 1.5em;
      -webkit-mask-image: url('/chat-reply-icon.svg');
      background-color: darkslategray;
    }
  }

  &-content {
    width: fit-content;
    text-align: justify;
    line-height: 1.75;
    margin: 0;
  }

  &-emote {
    vertical-align: middle;
  }
}
</style>
