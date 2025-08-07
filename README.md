# Jest + SWC + React Setup Guide

A simple, fast testing setup for React projects using Vite and SWC.

## Prerequisites

- React project with Vite
- Using SWC (via `@vitejs/plugin-react-swc`)

## 1. Install Dependencies

```bash
npm install -D @swc/jest @testing-library/jest-dom @testing-library/react jest jest-environment-jsdom @types/jest
```

## 2. Package.json

Update your `package.json` with the test script:

```json
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "@swc/jest": "^0.2.36",
    "@testing-library/jest-dom": "^6.6.4",
    "@testing-library/react": "^16.3.0",
    "@types/jest": "^30.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

## 3. Create Configuration Files

### jest.config.js
```javascript
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.js',
  },
};
```

### .swcrc
```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    }
  }
}
```

## 4. Create Test Setup Files

### test/jest.setup.ts
```typescript
import '@testing-library/jest-dom';
```

### test/mocks/fileMock.js
```javascript
module.exports = {
  __esModule: true,
  default: "test-file-stub",
};
```

## 5. Folder Structure

```
project-root/
├── src/
│   ├── First.tsx
│   └── First.test.tsx
├── test/
│   ├── jest.setup.ts
│   └── mocks/
│       └── fileMock.js
├── jest.config.js
├── .swcrc
└── package.json
```

## 6. Example Test

### src/First.tsx
```typescript
const First = () => {
  return <h1>Hello World</h1>;
};

export default First;
```

### src/First.test.tsx
```typescript
import { render, screen } from '@testing-library/react';
import First from './First';

describe('First', () => {
  it('should render component', () => {
    render(<First />);
    
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello World');
  });
});
```

## 7. Run Tests

```bash
npm test
```

## Why This Setup?

- **Fast**: SWC is much faster than ts-jest or Babel
- **Simple**: Minimal configuration required
- **Consistent**: Uses the same transformer as your Vite dev setup
- **No ESM issues**: Avoids complex ESM/CommonJS mixing problems

## Optional: Suppress Deprecation Warnings

If you see punycode deprecation warnings, add to package.json:

```json
{
  "scripts": {
    "test": "NODE_NO_WARNINGS=1 jest"
  }
}
```

## Dependencies You DON'T Need

- `ts-jest` (replaced by `@swc/jest`)
- `ts-node` (not needed with JS config)
- `babel-jest` or Babel presets (SWC handles everything)

## TypeScript Configuration

If you're getting TypeScript errors in tests, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "types": ["jest", "@testing-library/jest-dom"]
  }
}
```

## Troubleshooting

**Error: setupFilesAfterEnv not found**
- Ensure `test/jest.setup.ts` exists
- Check file paths in `jest.config.js`

**JSX/TypeScript not transforming**
- Verify `.swcrc` exists and has correct syntax
- Ensure `@swc/jest` is installed

**TypeScript errors in tests**
- Install `@types/jest`: `npm i -D @types/jest`
- Add `"types": ["jest", "@testing-library/jest-dom"]` to tsconfig.json
- Ensure `jest.setup.ts` imports `@testing-library/jest-dom`

**Module resolution issues**
- Check `moduleNameMapper` patterns in jest config
- Ensure mock files exist in correct locations