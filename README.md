# Twitch Chatbox

[![Netlify Status](https://api.netlify.com/api/v1/badges/42e0fbdf-f23b-45dc-a2eb-9146c2e51501/deploy-status)](https://app.netlify.com/sites/hop-twitch/deploys)

A chatbox widget to add to your Twitch overlay.
This project was written for learning purpose and may or may not become usable eventually.

## Installation

Install project's dependencies using the `yarn` command.

You may then run the widget. For testing purpose, use the `yarn dev` command to run it in developer mode.
You'll get a local url in your terminal that should look like `http://localhost:5173`. Copy it.

In OBS, add a new web browser source to your scene. Paste in the url you copied earlier and add your channel id as a hash at the end.
In my case, the final URL would look like this `http://localhost:5173/#hommeoursporc`
