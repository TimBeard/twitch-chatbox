import type { Emotes, ParsedEmote } from '../types/chat-box'

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

function emoteTag(name: string): string {
  const url: string = `https://static-cdn.jtvnw.net/emoticons/v2/${name}/default/dark/1.0`
  return `<img class="chat-message-emote" src="${url}" alt="${name}" />`
}

export default function parseMessage(message: string, emotes?: Emotes): string {

  if (!emotes) return message

  const output: string[] = []
  const parsed: ParsedEmote[] = parseEmotes(emotes)

  let cursor: number = 0

  for (const { name, from, to } of parsed) {

    const chunk: string = message
      .substring(cursor, from)
      .replace(/[<>"^]/g, (e) => `&#${e.charCodeAt(0)};`)

    output.push(chunk)
    output.push(emoteTag(name))

    cursor = to + 1
  }

  return output.join('')
}
