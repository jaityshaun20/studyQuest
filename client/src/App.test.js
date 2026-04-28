import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StudyQuest title', () => {
  render(<App />);
  const titleElement = screen.getByText(/StudyQuest/i);
  expect(titleElement).toBeInTheDocument();
});