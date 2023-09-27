import { HelixChatBadgeVersion } from '@twurple/api'

export interface MessageProps {
    id: string
    channel: string
    name: string
    user: string
    color: string
    text: string
    badges: HelixChatBadgeVersion[]
    emotes?: Map<string, string[]>
}
