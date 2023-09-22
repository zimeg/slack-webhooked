# Webhooked on Slack

Post messages to any channel from anywhere on the web! Just bring a token,
channel ID, and something to say.

## Readying this app

A few quick actions must happen before you're posting messages to your webhook.
Feel free to follow along if you want!

### Create the webhook

After installing the [Slack CLI][cli], create the webhook with these commands:

```sh
$ slack create webhooked --template zimeg/slack-webhooked
$ cd webhooked
$ slack deploy
```

When prompted to create a trigger, select `triggers/webhook_trigger.ts` and hold
on to the `hooks.slack.com` URL.

### Gather a token

A service token from Slack is used to verify the webhook requests are valid.
Gather this for your workspace with:

```sh
$ slack auth token
```

### Prepare the paylod

The payload sent with a request contains all of the information needed to post a
messsage.

Update the `payload.json` file with your own information for the message:

```json
{
  "token": "xoxp-example-token",
  "channel": "C0123456789",
  "message": "Wowza! Webhook magic!"
}
```

### Send the message

Now comes the moment of truth. Will the message send? I certainly hope so!

Send a `POST` request to the `hooks.slack.com` URL with your payload to send
your message:

```sh
$ curl https://hooks.slack.com/triggers/T0123456789/31415926535897/6c0b3bdbbd5cde46d14184aa3fbbdbd7 -d "@payload.json"
```

Assuming everything went well, you should now find a new message in the channel
you specified! Awesome stuff!

## Continuing onwards

A token usually isn't necessary to hook onto a webhook but can be useful for
authenticating requests. This app requires a token for the sake of example.

You can customize any validation logic in the `functions/validate_function.ts`
file.

The [`auth.test`][auth.test] method is currently used to check that the provided
token matches **some** Slack identity and can be easily extended to compare the
corresponding `team_id` or `user_id`.

<!-- a collection of links -->

[cli]: https://api.slack.com/automation/cli
[auth.test]: https://api.slack.com/methods/auth.test
