Place calls to supabase database here.

Calls are seperated into Browser and Server as both are supported by nextjs and used in this project.
Each enviroment has its own supabase client as well.

Queries are almost always on the server to cache the response and let Nextjs built in caching take over.

Mutations can be made on the client since the response usually does not need to be cached.
