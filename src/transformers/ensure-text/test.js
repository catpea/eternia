#!/usr/bin/env node

import toText from "./to-text.js";

const html = `<!doctype html>
<html lang="en">
  <head>
  </head>
  <body>
  <div class="section">
    <p>If laws are like source code,<br>and politics of a nation is like a running program.</p>
    <p>Then, the source code can be modified,<br>to eliminate poverty, mass incarceration, unfairness, and fake education.</p>
    <p>Living within this fine program would grant us greater meaning,<br>as we could spend more time on learning, on helping the world.</p>
    <p>Some may wish to know, why are we delaying,<br>why can't we bring that fair, more meaningful world, into existence now.</p>
  </div>
  <div class="section">
    <hr>
  </div>
  <div class="section">
    <p>We have that little problem of following authority without question,<br>we have a tendency to inherit the culture we grew up into without question.</p>
    <p>This means that a lot of people may not know there is a problem,<br>they accept meaningless suffering as part of existence.</p>
    <p>There will say "what are you going to do about it?", or,<br>"You can't change the way things are".</p>
    <p>Seeing that there is a problem,<br>requires real education.</p>
  </div>
  <div class="section">
    <hr>
  </div>
  <div class="section">
    <p>Once we do cross into the more advanced world,<br>prevention of ineffective or fake education will be very important.</p>
    <p>Just like we are confused by the primitive lifestyles of the middle ages,<br>the more advanced Earth Civilization will be confused by us.</p>
    <p>Even if we can't see that our education in ineffective,<br>we can still feel the problem of unfairness in the back of our mind.</p>
    <p>The future will explain our cultures as lacking in education,<br>as being crushed by poverty and politics of our own making.</p>
  </div>
  <div class="section">
    <hr>
  </div>
  <div class="section">
    <p>The nations of the world can't change the laws,<br>because their people are still growing up to see that there is a fixable problem.</p>
    <p>We can accelerate the time it will take the world to grow up,<br>by accepting the responsibility for our own education.</p>
    <p>By finding ways to make "the gift of words on paper",<br>easier to learn from, easier to understand with narrated versions and interactive lectures and info-graphics.</p>
    <p>First we self educate,<br>and then turn right around and build the new Universities the World Needs.</p>
  </div>
  <div class="section">
    <hr>
  </div>
  <div class="section">
    <p>The whole world can only change for better,<br>when all its people become wiser.</p>
    <p>No wrong doers, or misery worshipers, or those who feed on the poor,<br>can stop wise ideas that have permeated the people.</p>
    <p>The only way this change can come about,<br>is by people accepting responsibility for their own education.</p>
    <p>By understanding "the gift of words on paper", and the importance of fine unending self education.<br>Our lives will become more enlightened by Knowledge, Wisdom and Greatness.</p>
  </div>
  <div class="section">
    <hr>
  </div>
  <div class="section">
    <p>Our struggles will become more meaningful when we dedicate some part of our daily efforts<br>to encouraging to self education and thus help humanity grow.</p>
    <p>There is no such thing as a nerd, or book worm,<br>these labels mark the stages of someone's struggle to understanding.</p>
    <p>To growing all the way up to become an Intellectual, a Visionary, and or an Inspiration,<br>aging on the other hand has little to do with growing up.</p>
    <p>While there is no graduation, not n end to Real Education,<br>there does come a day - when our journals in hopes of grasping the world - become brilliant.</p>
  </div>
  <div class="section">
    <hr>
  </div>
  <div class="section">
    <p>The first step is understanding, to get there we need Real Education,<br>and no education can be made more real, than Independent Self Education just at the right time, pace and in the correct sequence.</p>
    <p>Let us all take that first step to making the world a more meaningful place for all the future generations,<br>by making room for, and reading non0fiction books that capture our attention.</p>
    <p>The way to make meaningful repairs to the world starts with the individual and their independent self education,<br>and then their encouragement for others to do the same.</p>
    <p>Let us then, take to the great adventure of finding the next set of books that will enlighten our lives for better,<br>that will improve the clarity of our thinking, the grasp on the world as it is today, and a vision of the future that is worth our efforts.</p>
  </div>
  </body>
</html>`;

const text = toText(html);

console.log(text);
