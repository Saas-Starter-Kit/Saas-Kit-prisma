Place API requests for third party services here.

Initialize for reuse third party libraries/SDKs in `init` directory.

stripe /webhooks contain functions related to webhooks

Third party Services can either be called from the frontend like supabase or only from the server like stripe.

Api calls are seperated by Server and Browser.

Queries like get requests, to fetch data are going to be called server side to use Nextjs built in cache.

Mutations like post, update and delete requests can be called directly from the frontend through supabase, as there is no need to cache them.

Therefore the requests are seperated into queries for nextjs server components, and mutations for nextjs client components

if a client components needs the data, it can be passed from the server page.tsx components down to the child client component.

useContext can be used to avoid prop drilling, but is not necassary

context should not be used to save API request data.
