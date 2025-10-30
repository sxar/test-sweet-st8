# TestSweet - React Sweet State Test Application

A comprehensive test suite application demonstrating all major features of [React Sweet State](https://github.com/atlassian/react-sweet-state) state management library.

## Overview

TestSweet provides interactive, recording-friendly test scenarios organized across 4 tabs, covering 10 distinct test sections that validate React Sweet State's core functionality.

## Features Tested

### Tab 1: Basic Features
- **Simple Counter** - Global store creation and basic actions
- **Multiple Subscribers** - Shared state across components
- **Actions with Parameters** - Parameterized action execution

### Tab 2: Scoping & Containers
- **Scoped Store Instances** - Isolated state per container scope
- **Container Props** - Props passed to actions via containers
- **Container Lifecycle** - Mount/unmount cleanup and memory management

### Tab 3: Advanced Features
- **Selectors** - Selective re-rendering with selectors for render optimization
- **Multiple Stores** - Multiple independent stores working together

### Tab 4: Miscellaneous
- **Race Conditions** - Request tracking and handling concurrent operations
- **State Persistence** - Global store persistence across remounts

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

**For development:**
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

**For running tests (production mode):**
```bash
npm run build
npm run preview
```
The application will be available at `http://localhost:4173`

> **Important:** Recorded tests in `/tests/ui` require the app to run in production mode (`npm run preview`) to work correctly.

**To run the test locallly with Playwright :**
```bash
npm install @skyramp/skyramp @playwright/test
npx playwright install
npx playwright test testfile --headed
```


## Recording Tests

> ⚠️ **Run the app in production mode** (`npm run build && npm run preview`) before recording or running tests.

Sample recorded traces are stored in `/traces` organized by scenario.

## Key Components

### Stores
- `counterStore` - Basic global counter
- `sharedCounterStore` - Shared state demonstration
- `paramCounterStore` - Parameterized actions
- `todoStore` - Scoped todo lists
- `multiplierStore` - Container props demo
- `chatStore` - Lifecycle management
- `postsStore` - Race condition handling
- `userProfileStore` - Selector optimization
- `themeStore`, `notificationStore`, `multiCounterStore` - Multiple stores
- `persistCounterStore` - State persistence

### Shared Components
- `RenderCounter` - Tracks component render count
- `DisplayCard` - Consistent card layout
- `LoadingSpinner` - Async loading indicator
- `StatusBadge` - Color-coded status display

## Technologies

- **React 18** - UI framework
- **React Sweet State** - State management
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Base styling (customized)
- **classnames** - Conditional CSS classes

## Test Coverage

✅ Global store creation and management
✅ Shared state across multiple components
✅ Actions with parameters
✅ Scoped store instances with isolation
✅ Container props in actions
✅ Container lifecycle hooks (onInit/onDestroy)
✅ Race condition handling
✅ Selectors for render optimization
✅ Multiple independent stores
✅ State persistence across remounts

## Development

### Running Locally

```bash
npm run dev
```

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Documentation

For detailed implementation information, see:
- Implementation Guide (comprehensive development guide)
- Design Document (UI specifications and test scenarios)

## License

MIT

## Credits

Built for comprehensive testing of [React Sweet State](https://github.com/atlassian/react-sweet-state) by Atlassian.
