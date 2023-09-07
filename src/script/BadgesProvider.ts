import { HelixChatBadgeSet } from '@twurple/api'

import { user } from './ChannelInfoProvider.ts'
import { Api } from './ApiClient.ts'

const globalBadges: HelixChatBadgeSet[] = await Api.chat.getGlobalBadges()

if (user) {

  const channelBadges: HelixChatBadgeSet[] = await Api.chat.getChannelBadges(user.id)

  channelBadges.forEach((badgeSet: HelixChatBadgeSet) => {

    const globalSet: HelixChatBadgeSet | undefined = globalBadges.find((set: HelixChatBadgeSet) => {
      return set.id === badgeSet.id
    })

    if (!globalSet) {
      globalBadges.push(badgeSet)
    } else {
      globalSet.versions.push(...badgeSet.versions)
    }
  })
}

export const badges: HelixChatBadgeSet[] = globalBadges
