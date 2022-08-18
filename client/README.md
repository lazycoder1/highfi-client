# Install

```
npm i highfi-chat-widget
```

# Usage

First request for early access by dropping a mail at aditya@highfi.me / gautam@highfi.me or reach out to us on twitter -  https://twitter.com/HighFiMe

## Get your access token from the dashboard 

Visit dashboard.highfi.me and follow the below steps to get your access token.
1. Log-in to the dashboard and open your organization 
2. Once open , you can navigate to the user nav bar button to go to the organization settings page 
3. Reveal your API key and keep it handy to set up your widget. 

## Using in React

Place the code below in any pages on which you would like to render the widget. If you'd like to render it in all pages by default, place it in the root component of your app.


```
import React from 'react';

import { ChatWidget } from 'highfi-chat-widget';

const ExamplePage = () => {
  return (
    <>
      {/*
        Put <ChatWidget /> at the bottom of whatever pages you would
        like to render the widget on, or in your root/router component
        if you would like it to render on every page
      */}
      <ChatWidget accessToken="<API key>" provider={provider} />
    </>
  );
};
```

Please pass the provider of the connected wallet for the best user experience. 

# Questions?

If you're having any trouble getting started or just want to say hi, join us on Slack! 👋
## Submitting a PR

We welcome any contributions! Please create an issue before submitting a pull request.

When creating a pull request, be sure to include a screenshot! 🎨