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
  facets: [
    {
      index: { byteStart: bleet.indexOf('>>>') + 3, byteEnd: bleet.indexOf('<<<') },
      features: [
        {
          $type: 'app.bsky.richtext.facet#link',
          uri: 'https://github.com/aliceisjustplaying/atproto-starter-kit',
        }
      ]
    }
  ],
  embed: {
    $type: 'app.bsky.embed.external',
    external: {
      uri: 'https://github.com/aliceisjustplaying/atproto-starter-kit',
      title: "alice's atproto starter kit",
      description: "i'm just playing around with the api",
    },
  },
});
