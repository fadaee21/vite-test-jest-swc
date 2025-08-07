import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter Component', () => {
  test('renders with default count', () => {
    render(<Counter />);
    const countEl = screen.getByTestId('count-value');
    expect(countEl).toHaveTextContent('Count: 0');
  });

  test('renders with custom initial count', () => {
    render(<Counter initialCount={5} />);
    const countEl = screen.getByTestId('count-value');
    expect(countEl).toHaveTextContent('Count: 5');
  });

  test('increments count by 1 by default', () => {
    render(<Counter />);
    const incrementBtn = screen.getByLabelText('increment');
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 1');
  });

  test('decrements count by 1 by default', () => {
    render(<Counter />);
    const decrementBtn = screen.getByLabelText('decrement');
    fireEvent.click(decrementBtn);
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: -1');
  });

  test('resets to initial count', () => {
    render(<Counter initialCount={3} />);
    const incrementBtn = screen.getByLabelText('increment');
    const resetBtn = screen.getByLabelText('reset');

    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 5');

    fireEvent.click(resetBtn);
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 3');
  });

  test('increments and decrements by custom step', () => {
    render(<Counter initialCount={10} step={2} />);
    const incrementBtn = screen.getByLabelText('increment');
    const decrementBtn = screen.getByLabelText('decrement');

    fireEvent.click(incrementBtn);
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 12');

    fireEvent.click(decrementBtn);
    expect(screen.getByTestId('count-value')).toHaveTextContent('Count: 10');
  });
});
