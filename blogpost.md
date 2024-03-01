# Mastering Bun API - Building With Elysia.js And Fly.io

In this tutorial, you will explore Bun.js, the powerful web framework for building fast and efficient web applications and harness its full potential, while elevating your web development skills.

- [Mastering Bun API - Building With Elysia.js And Fly.io](#mastering-bun-api---building-with-elysiajs-and-flyio)
  - [Introduction](#introduction)
  - [What is Bun?](#what-is-bun)
  - [Bun Features](#bun-features)
  - [What Bun Is Not](#what-bun-is-not)
  - [Getting Started With Bun](#getting-started-with-bun)
  - [Creating Your First Bun.js Project](#creating-your-first-bunjs-project)
  - [Project Structure and File Organization](#project-structure-and-file-organization)
    - [Configuring Your Bun.js Project](#configuring-your-bunjs-project)
  - [Integrating Elysia.js with Bun](#integrating-elysiajs-with-bun)
    - [Installing And Setting Up Elysia.js](#installing-and-setting-up-elysiajs)
    - [Creating a Simple Server](#creating-a-simple-server)
    - [An Advanced Example...](#an-advanced-example)
  - [Testing Your Bun.js Application](#testing-your-bunjs-application)
  - [Deploying With Fly.io](#deploying-with-flyio)
  - [Conclusion](#conclusion)

## What is Bun?

[Bun JavaScript runtime](https://bun.sh/) is a JavaScript runtime written in the Zig programming language, and built from scratch, to serve the modern JavaScript ecosystem. It has been said to be a replacement for C and C++ and is also a drop-in replacement for [Node.js](https://nodejs.org/en). It is completely compatible with Node APIs and also compatible with the NPM ecosystem. You can use Bun to run node applications and also install [npm package installer](https://www.npmjs.com/) packages.

In the recent past, developers would most likely need separate technologies like Node.js for servers, Bundlers like [Webpack](https://webpack.js.org/) or [Vite](https://vitejs.dev/) for frontend, frameworks for testing, et al.  Bun can be said to be an "all-in-one" tool as it includes a native bundler, transpiler, task runner and npm client.

## Bun Features

Bun has distinct features when compared to other runtimes:

1. It is faster (than Node.js and Deno) with fewer dependencies.
2. Bun also supports JSX.
3. It comes with TypeScript right out of the box.
4. You can enable watch mode.

![Bun Speed On The Server Side](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1708100211/j0eeevs1higbgtwbu6au.png)

![Bun Speed In WebSocket](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1708100211/m6wwyt0f3e97kr6ysaxw.png)

![Bun Speed In Database Loading](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1708100210/ddoy01jncizckqp6tj41.png)

## What Bun Is Not

Bun is not a fork of Node.js. It is also not built on the v8 engine like Node.js. Instead it is built on the JavaScriptCore engine, the performance minded JavaScript engine built for Safari and WebKit.

## Getting Started With Bun

- If you are a MacOS user, you can install Bun using the command below in your terminal:

```bash
curl -fsSL https://bun.sh/install | bash
```

- You can also install Bun using NPM

```bash
npm install -g bun 
```

- If you are a Windows user, install Bun using WSL. Click this [guide](https://www.youtube.com/watch?v=aNL3gXW0ZuM) to get help with that.

A Macbook was used for this tutorial.

![Installing Bun Using The MacOS](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1708102367/Screenshot_2024-02-16_at_3.26.26_PM_pfg0qk.png)

To check that Bun was installed successfully, run `bun --version`.

## Creating Your First Bun.js Project

- After installation, create a new folder on your terminal and navigate into that folder.

```bash
mkdir bun-api-starter
cd bun-api-starter
```

- Run `bun init` to start an empty project and follow the prompts to complete your project setup.

```bash
bun init
```

You will get prompts about naming your projects and the entry point. At the end, your terminal should be looking like this:

![After Installation](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1708345482/Screenshot_2024-02-19_at_1.23.57_PM_gc9wex.png)

## Project Structure and File Organization

After initializing your Bun.js project, you'll notice a default structure created in your project directory. Understanding this structure is crucial for efficient development and maintenance. Here's a typical Bun.js project layout:

![A typical bun project structure](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1709285569/Screenshot_2024-03-01_at_10.31.14_AM_vqf1xg.png)

- `index.ts`: Bun treats TypeScript as a first-class citizen. can directly execute `.ts` and `.tsx` files just like vanilla JavaScript, with no extra configuration. Bun internally transpiles it into JavaScript then executes the file.

- `package.json`: Describes your project and its dependencies. It also includes scripts and metadata relevant to the project.

- `tsconfig.json`: The TypeScript configuration file.

- `README.md`: For your project documentation purposes.

### Configuring Your Bun.js Project

To maximize the organization, efficiency and performance of our `Bun.js` project, add the following folders:

- `adapters`: To create database connections.

- `config`: To keep any configuration you will need during the project.

- `controllers`: To hold all the routes in the project.

- `services`: To handle all business logic.

## Integrating Elysia.js with Bun

[Elysia.js](https://elysiajs.com/) is a lightweight, efficient framework designed to work seamlessly with Bun.js, enhancing its capabilities for web application development. According to their website, it is designed with simplicity and type safety in mind, allowing you to create a server with familiar APIs like [Express](https://expressjs.com/) and [Fastify](https://fastify.dev/).

`Elysia.js` has speed 21x faster than `Express` and even competes on speed with [Rust](https://www.rust-lang.org/) and [Go](https://go.dev/) frameworks.

It supports TypeScript right out of the box.

### Installing And Setting Up `Elysia.js`

1. Add `Elysia.js` to your project using Bun's package manager:

```bash
bun add elysia
```

![Elysia.js installation](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1709289100/Screenshot_2024-03-01_at_11.30.57_AM_pryq3m.png)

2. Replace the existing content of your `package.json` file with the below to give your application more options.

```json
{
  "name": "bun-api-starter",
  "module": "index.ts",
  "type": "module",
  "scripts": {
    "dev": "bun --watch index.ts",
    "build": "bun build index.ts",
    "start": "NODE_ENV=production bun index.ts",
    "test": "bun test"
  },
  "devDependencies": {
    "@flydotio/dockerfile": "latest",
    "bun-types": "latest"
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  },
  "dependencies": {
    "elysia": "^0.8.8"
  }
}

```

### Creating a Simple Server

In your `index.ts` file, use `Elysia.js` to set up a basic server and listen on port `3000`

```javascript
import Elysia from "elysia";

new Elysia().get("/", () => "hi").listen(3000);

```

The above is a good example of a simple **`hello world`** project.

**It is important to note that Elysia.js will accept the `return` value directly. You do not have to pass `res.send` or `res.json` like in `Express`. `Elysia.js` will handle all of that for you under the hood.**

Let's take it a step further however and create a REST API.

### An Advanced Example...

Let's create a working API that gives us a list of cats.

- Navigate to the `services` folder and create a `cat.service.ts` file.

- In the `cat.service.ts` file, create a function that mimics getting data from a database and will return an array of cats with their age and name.

```javascript
type Cat = {
    name: string;
    age: number;
};

export const getCats = (): Cat[] => {
    return [
        { name: "Mittens", age: 5 }, 
        { name: "Bella", age: 11 }, 
        { name: "Coco", age: 2 }, 
    ];
};
```

- Next, navigate to the `controllers` folder. 

- Create a `cat.controller.ts` controller file to hold a subset of the application's routes. It is always useful to organize your application's route as it grows.

- In the `cat.controller.ts` file, create a route that gets all the cats.

```javascript
import Elysia from "elysia";
import { getCats } from "../services/cat.service";

export const cat = new Elysia <"/cat">();

cat.get("/cats", () => {
    const allCats = getCats();
    return allCats;
});
```

- Consume the `cat.controller.ts` controller by importing it in the `index.ts` file and passing it in the `.use` method of the main `Elysia.js` application

```typescript
import Elysia from "elysia";
import { cat } from "./controllers/cat.controller.ts"

export const app = new Elysia()
                    .get("/", () => "hi")
                    .use(cat);

app.listen(3000);
```

Now we have a working API...

## Testing Your Bun.js Application

- Create a test file `index.test.ts` in the root.

- Import the `expect`, `describe` and `it` functions from `bun:test` and test that the root endpoint returns "hi" and the `cat` endpoint returns an array.

```javascript
import { describe, expect, it } from "bun:test";
import { app } from ".";

describe("Elysia", () => {
  it("returns a greeting", async () => {
    const response = await app
      .handle(new Request("http://localhost:3000"))
      .then((res) => res.text());

    expect(response).toBe("hi");
  });

  it("returns  an array of cats", async () => {
    const response = await app
      .handle(new Request("http://localhost:8080/cats"))
      .then((res) => res.json());

    expect(response).toBeArray();
  });
});

```

- Run the test by running `bun test` to see which tests passed or failed.

![bun test results](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1709308677/Screenshot_2024-03-01_at_4.52.48_PM_netnao.png)

## Deploying With Fly.io

[Fly.io](https://fly.io/) provides a straightforward platform for deploying Bun.js applications, ensuring they run close to your users with global distribution. It is a long running server option for hosting bun applications. 

It leverages `Docker`, a set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers. The containerization aspect of `Docker` ensures that your application works seamlessly across different computing environments.

`Fly.io` uses Docker images to create lightweight, portable, and self-sufficient containers from your application.

- Install the Fly.io CLI tool if you haven't already, and log in:

```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

- In your `root` directory, run `fly launch` to create a docker image that is used to create your application on Fly.io.

![Fly.io Launch command](https://res.cloudinary.com/resourcefulmind-inc/image/upload/v1709309986/Screenshot_2024-03-01_at_5.18.59_PM_bpci9o.png)

- Run `fly deploy` to deploy your application on the Fly.io platform.

## Conclusion

Throughout this tutorial, you have learned the essentials of the `Bun.js` ecosystem, discovered how to enhance your web development with `Elysia.js`, and mastered deployment with `Fly.io`. We've also touched on Docker's role in ensuring consistent deployments across various environments.

The journey doesn't end here; continue exploring, experimenting, and contributing to these vibrant ecosystems. If you have any comments, corrections, or suggestions for future tutorials, please feel free to share them. Your feedback and contributions not only help you grow as a developer but also strengthen the tools and communities you engage with.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wyQ3lWDAwzs?si=HBJ7kwdDSE2ae2bT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Remember, the best way to master any technology is by building with it. So, take what you've learned and start creating.

Happy coding! See you in the next one!
