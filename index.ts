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

const bleet = 'You can find the code for this bleet >>>[here](https://github.com/aliceisjustplaying/atproto-starter-kit)<<<, with a link card, a title and a description!';

const markdownLinkRegExp = /\[(.*?)\]\((.*?)(?<!\\)\)/g;
const bleet_clean = bleet.replace(markdownLinkRegExp, '$1');

const findMarkdownLinks = (input: string): { index: { byteStart: number; byteEnd: number }, features: { $type: string, uri: string }[]}[] => {
  const facets: { index: { byteStart: number; byteEnd: number }; features: { $type: string, uri: string }[]}[] = [];

  let match;
  while ((match = markdownLinkRegExp.exec(input)) !== null) {
    const linkText = match[1];
    const url = match[2];
    const start = bleet_clean.indexOf(linkText);
    const end = start + linkText.length;

    facets.push({ index: { byteStart: start, byteEnd: end }, features: [{ $type: 'app.bsky.richtext.facet#link', uri: url }] });
  }

  return facets;
};

const facets = findMarkdownLinks(bleet);
console.log(facets);

await agent.post({
  text: bleet_clean,
  facets,
  embed: {
    $type: 'app.bsky.embed.external',
    external: {
      uri: 'https://github.com/aliceisjustplaying/atproto-starter-kit',
      title: "alice's atproto starter kit",
      description: "i'm just playing around with the api",
    },
  },
});
