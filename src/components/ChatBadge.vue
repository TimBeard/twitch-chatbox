<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { HelixChatBadgeVersion } from '@twurple/api'

const { badge } = defineProps<{ badge: HelixChatBadgeVersion }>()
const badgeUrl = ref<string | null>()

onMounted(() => {
  badgeUrl.value = badge.getImageUrl(1)
})
</script>

<template>
  <li
      v-if="badgeUrl"
      class="chat-message-badge"
  >
    <img :src="badgeUrl" :alt="badge.description" />
  </li>
</template>
