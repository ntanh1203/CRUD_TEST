# CRUD Frontend for Managing Articles

This project is a React-based CRUD application for managing articles, built using TypeScript and Vite. The articles are stored as an array and queried dynamically.

## Project Setup

- Project Name: **CURD_TEST**
- Built with: React, TypeScript, Vite
- Data Storage: Local array

## Features

### Article Management

- **Attributes:**
  - Article Number (Auto-generated, sorted in descending order)
  - Title (Text input)
  - Content (Textarea input)
  - Views (Incremented on detail page visit)

### Screens

1. **Article List Screen:**

   - Displays the list of articles, showing the Article Number, Title, and Views.
   - Articles are sorted in descending order by Article Number.
   - Clicking on a title navigates to the detail screen.

2. **Article Creation Screen:**

   - Allows users to enter a Title and Content.
   - Article Number is automatically assigned.
   - After submission, redirects to the detail screen.

3. **Article Edit Screen:**

   - Allows users to modify the Title and Content.
   - After saving, redirects to the detail screen.

4. **Article Detail Screen:**
   - Displays Article Number, Title, Content, and Views.
   - Includes a button to navigate to the edit screen.
   - Includes a delete button to remove the article.
   - Views count increases by 1 upon visiting this screen.

## Additional Notes

- Developers are free to implement extra features as needed.
- The final source code should be submitted as a **ZIP** file.

## Project Setup & ESLint Configuration

This project follows best practices for React development with TypeScript and Vite.

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the ESLint configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/crud_test.git
   ```
2. Install dependencies:
   ```sh
   cd crud_test
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
