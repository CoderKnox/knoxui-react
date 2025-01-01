# Sample React Component Library

This project is a sample React component library that demonstrates basic setup for a web application using React, Next.js, and custom UI components.

## Features

- Custom React components including Button, Checkbox, Radio, Select, Input, Textarea, Table, and PivotTable
- Theme provider for easy theme switching
- Responsive design with Tailwind CSS
- Next.js integration for server-side rendering and routing
- TypeScript support for type safety

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm
- You have a `<Windows/Linux/Mac>` machine. (All OSes are supported)

## Installing Sample React Component Library

You can install this package using npm:

```
npm install knoxui-react
```

Or using yarn:

```
yarn add knoxui-react
```

## Using 

Here's a quick example of how to use components from this library:

```jsx
import React from 'react';
import { Button, Input, ThemeProvider } from 'your-package-name';

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>My App</h1>
        <Input label="Username" />
        <Button>Click me</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Components

This library includes the following components:

- `Button`: A customizable button component with various styles and sizes.
- `Checkbox`: A checkbox input component with label support.
- `Radio`: A radio input component with label and button style options.
- `Select`: A customizable select component with search and multi-select capabilities.
- `Input`: A text input component with various styles and sizes.
- `Textarea`: A textarea component for multi-line text input.
- `Table`: A feature-rich table component with sorting, filtering, and export options.
- `PivotTable`: An interactive pivot table component for data analysis.
- `ThemeProvider`: A context provider for managing theme across the application.


## Documentation

For detailed documentation on each component and its props, please visit our [documentation site](https://knoxui.in).

## Contributing to Sample React Component Library

To contribute to Sample React Component Library, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

