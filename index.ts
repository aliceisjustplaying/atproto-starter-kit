import bsky from '@atproto/api';
const { BskyAgent } = bsky;
import * as dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

const agent = new BskyAgent({
  service: 'https://bsky.social',
});

await agent.login({
  identifier: process.env.BSKY_USERNAME!,
  password: process.env.BSKY_PASSWORD!,
});

const bleet = 'You can find the code for this bleet >>>here<<<, with a link card, a title and a description!';
await agent.post({
  text: bleet,
  entities: [
    {
      index: { start: bleet.indexOf('>>>') + 3, end: bleet.indexOf('<<<') },
      type: 'link',
      value: 'https://github.com/aliceisjustplaying/bluesky-starter-kit',
    },
  ],
  embed: {
    $type: 'app.bsky.embed.external',
    external: {
      uri: 'https://github.com/aliceisjustplaying/bluesky-starter-kit',
      title: "alice's bluesky starter kit",
      description: "i'm just playing around with the api",
    },
  },
});
