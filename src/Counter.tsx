import React, { useState } from 'react';

type CounterProps = {
  initialCount?: number;
  step?: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount = 0, step = 1 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialCount);

  return (
    <div>
      <h2 data-testid="count-value">Count: {count}</h2>
      <button onClick={increment} aria-label="increment">+</button>
      <button onClick={decrement} aria-label="decrement">-</button>
      <button onClick={reset} aria-label="reset">Reset</button>
    </div>
  );
};
