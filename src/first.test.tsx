import { render, screen } from '@testing-library/react';
import First from "./First"

describe('Component', () => {
  it('should render component', () => {
    render(<First />);
    
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello World');
  });
});