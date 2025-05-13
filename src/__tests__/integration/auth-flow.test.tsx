import { render, screen, fireEvent, waitFor } from '@/test/testUtils';
import LoginPage from '@/app/(auth)/login/page';

describe('Authentication Flow', () => {
  it('completes login flow successfully', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});