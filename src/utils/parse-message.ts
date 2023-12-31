import type { Emotes, ParsedEmote } from '../types/chat-messages'

function parseEmotes(emotes: Emotes): ParsedEmote[] {

  const output: ParsedEmote[] = []

  for (const [key, value] of Object.entries(emotes)) {

    for (const offset of value) {
      const [from, to] = offset.split('-').map(parseFloat)
      output.push({ name: key, from, to })
    }
  }

  return output
}

function escape(msg: string): string {
  return msg.replace(/[<>"^]/g, (e) => `&#${e.charCodeAt(0)};`)
}

function emoteTag(name: string): string {
  const url: string = `https://static-cdn.jtvnw.net/emoticons/v2/${name}/default/dark/1.0`
  return `<img class="chat-message-emote" src="${url}" alt="${name}" />`
}

export default function parseMessage(message: string, emotes?: Emotes): string {

  if (!emotes) return message

  const parsed: ParsedEmote[] = parseEmotes(emotes)

  let output: string = ''
  let cursor: number = 0

  for (const { name, from, to } of parsed) {

    const chunk: string = escape(message.substring(cursor, from))

    output += chunk
    output += emoteTag(name)

    cursor = to + 1
  }

  return output + escape(message.substring(cursor))
}
