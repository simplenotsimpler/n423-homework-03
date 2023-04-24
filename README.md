# N423

## Author

Rebecca H.

## Homework 3

Vercel URL:
https://n423-homework-03.vercel.app/

## Notes

- Does not use API functionality of Next.js. Rather, Firebase is handled via the useFirebase hook per this week's lessons.
- useFirebase is set up more like an API
- Attempted useContext hook to return result from useFirebase. Was not able to get this to work due to the challenge that we're working with async function and useState is itself asynchronous.

## TODO

- Pretty alerts or toasts.
  - Started a simple message component, but ran out of time (due to other obligations) to roll this out fully.
  - These would be more doable to implement if I could get the result into the global state via useContext.
  - NOTE: In real life, I would use a third-party library for as there are plenty of good ones. I found very few roll-your-own examples. Most articles discussed using these.
