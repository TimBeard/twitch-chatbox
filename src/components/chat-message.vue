<template>
  <article class="chat-message" ref="element">
    <Transition name="chat-message" appear>
      <div class="chat-message-wrapper" v-show="isVisible">
        <div class="chat-message-header">
          <h3 class="chat-message-username">{{ name }}</h3>
          <small class="chat-message-timestamp">{{ time }}</small>
        </div>

        <p class="chat-message-content" v-html="parsedMessage" />
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
import { Ref, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type { ChatMessageData } from '../types/chat-messages'

import parseMessage from '../utils/parse-message'

const { id, color, message, emotes } = defineProps<ChatMessageData>()
const emit = defineEmits<{ exitView: [id?: string] }>()

const element: Ref<HTMLElement | null> = ref(null)
const isVisible: Ref<boolean> = ref(true)

const parsedMessage = parseMessage(message, emotes)

onMounted(() => {

  watch(element, (element) => {

    if (!element) return

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(({ intersectionRatio: ratio }) => {
        if (ratio < 1.0) isVisible.value = false
        if (ratio <= 0.0) emit('exitView', id)
      })
    }, { rootMargin: '8px', threshold: 1.0 })

    observer.observe(element)

    onBeforeUnmount(() => {
      observer.unobserve(element)
    })
  }, { immediate: true })
})
</script>

<style lang="scss">
.chat-message {

  &-wrapper {
    position: relative;
    padding: 1em 1em 1em 1.5em;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 100%);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 8px;
      height: 100%;
      background-color: v-bind(color);
    }
  }

  & + & {
    margin-top: 16px;
  }

  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &-username {
    flex-grow: 1;
    font-size: 1em;
    color: v-bind(color);
    line-height: 1.75;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-timestamp {
    color: rgba(128, 128, 128, 0.87);
  }

  &-badges-container {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    margin-left: 8px;
  }

  &-content {
    text-align: justify;
    line-height: 1.75;
    margin: 0;
  }

  &-emote {
    vertical-align: middle;
  }

  &-enter-active,
  &-leave-active {
    transition: 0.4s ease-out;
    transition-property: opacity, transform;
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
