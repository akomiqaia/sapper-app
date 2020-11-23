# Thinkin-svelte

This project is built on a  template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template-webpack.


## Get started

Install the dependencies...

```bash
npm install
```

then you will need to create `.env`file and put one variable inside `BASE_API_URL=http://localhost:8000` this is necessary for front end since this is the route for our back-end API. 

**NOTE:** if you are running front-end you will need to run back-end as well to make requests appropriately. 

...then start webpack:

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. 



Another script that can help a lot is: 

```shell
npm run svelte-check
```

This is an extra dependency that watches changes in svelte files and Provides CLI diagnostics checks for:

- Unused CSS
- Svelte A11y hints
- JavaScript/TypeScript compiler errors

Requires Node 12 or later.