# Project Coding Standards Context

## Mandatory Rules
- NO console.log statements in production code
- NO debugger statements in commits  
- Use const for variables that don't change
- Use let instead of var for mutable variables
- Always use semicolons
- Use single quotes for strings
- 2-space indentation
- Maximum 80 characters per line

## Code Patterns to Suggest
```typescript
// GOOD - Prefer this
const userName = 'john';
let counter = 0;

// BAD - Avoid this  
var userName = "john";
console.log(userName);
debugger;
```

## React Patterns
```typescript
// GOOD - Functional components with hooks
const MyComponent: React.FC = () => {
  const [state, setState] = useState<string>('');
  
  return <div>{state}</div>;
};

// BAD - Avoid console in components
const MyComponent = () => {
  console.log('rendering'); // This should be removed
  return <div>Hello</div>;
};
```

## Error Handling
```typescript
// GOOD - Proper error handling
try {
  const result = await apiCall();
  return result;
} catch (error) {
  throw new Error(`API call failed: ${error.message}`);
}

// BAD - Console logging errors
catch (error) {
  console.error(error); // Should use proper logging
}
```
