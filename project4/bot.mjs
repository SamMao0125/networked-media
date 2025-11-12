import dotenv from "dotenv"
import {createRestAPIClient} from "masto"

dotenv.config();

const masto = createRestAPIClient({
  url: "https://networked-media.itp.io/",
  accessToken: process.env.TOKEN,
});

let allPosts;
let counter = 0;

fetch("http://142.93.207.37:7001/all-posts")
  .then((response) => response.json())
  .then((data) => {
    allPosts = data.posts;
    makeStatus();
  });

function makeStatus() {
  let post = allPosts[counter];
  let text = post.object + " " + post.location + " " + post.refereceObject;
  
  masto.v1.statuses.create({
    status: text,
    visibility: "public",
  });
  
  counter = counter + 1;
  if (counter >= allPosts.length) {
    counter = 0;
  }
}

setInterval(function() {
  makeStatus();
}, 3600000);