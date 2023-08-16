import { Client } from 'tmi.js'

const channel: string = window.location.hash.substring(1)

const client = new Client({
    channels: [channel]
})

client.connect()

export default client
