# The TypeScript Toolkit for Wirechunk Extensions

An extension may implement server-side logic and provide custom React components.

At the root of every extension’s repository, there must be an `extension.json` file with a `"name"` property.

## Building Server-Side Extensions

On the server side, an extension is just an HTTP server that responds to requests from the Wirechunk core platform and optionally
defines its own API endpoints.

### Getting Started

To build a TypeScript extension, at a minimum you need to import the `start` function from the `@wirechunk/extension-toolkit/server` package and
call it to start the server.

```
import { start } from '@wirechunk/extension-toolkit/server';

await start();
```

All this would do is hook up a health check endpoint that Wirechunk uses to ensure the extension is running.

### Handling Hooks

To handle a hook, import and call the corresponding hook handler registration function:

```
import { handleBeforeSubmitForm, start } from '@wirechunk/extension-toolkit/server';

handleBeforeSubmitForm(async ({ value, context }) => {
  // Query from the database, validate input, etc.
  return {
    value,
  };
});

await start();
```

Make sure you call `start` only after all hook handlers have been registered.

A hook handler can always return `null` to signal that the hook is not modifying anything. Alternatively, it can
return a value that customizes some behavior, depending on the specific hook.

### Custom API Endpoints

To add custom API endpoints that you can call from your custom React components or from anywhere else, import and call the `registerApiRoutes` function from the `@wirechunk/extension-toolkit/server` package.

```
registerApiRoutes((server) => {
  // Example API endpoint at GET /_api/ext/<name>
  server.get('/', () => {
    return { message: 'Hello' };
  });

  // Example API endpoint at POST /_api/ext/<name>/user
  server.post(
    '/user',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
      },
    },
    async (req) => {
      const user = await prisma.user.findUnique({
        where: {
          id: req.body.userId,
        },
      });
      return { user };
    },
  );
});
```

Internally, this uses the [Fastify](https://fastify.dev/) web framework, and you can use all of its features.

In the calls to `server.get` and `server.post` in the example above, the path is appended to `/_api/ext/<name>` where `<name>` is the extension name from
the `extension.json` file.

The host for a custom API endpoint would be the domain of any site on the platform that the extension is installed on.

## Building Client-Side Extensions

An extension may provide custom React components that can be rendered in the Wirechunk core platform using the visual builder.

### Getting Started

Every remote component needs to be in its own file and be the default export from the file.

```
const Hello: FunctionComponent = () => {
  return <div>Hello, world!</div>;
};

export default Hello;
```

### Using Dependencies

You can import any of the following dependencies in your code and they will automatically be provided at runtime:

- `react`
- `react-dom`
- `@wirechunk/extension-toolkit/web`
- `@wirechunk/ui`
- `clsx`

In development, you can install these packages as `devDependencies` to have TypeScript types available.

You may install any of your own libraries and use them as usual. All components will be bundled separately with their dependencies,
and you can import CSS files in your TypeScript files and all styles will be bundled together into a separate CSS file.
