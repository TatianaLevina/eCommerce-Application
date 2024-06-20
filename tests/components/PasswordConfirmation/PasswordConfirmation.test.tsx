import { render, act } from '@testing-library/react';

import { AuthProvider } from '@/contexts/AuthContext';
import PasswordConfirmationModal from '@/components/PasswordConfirmation/PasswordConfirmation';

describe('PasswordConfirmation tests', () => {
  describe('Render element', () => {
    let container: HTMLElement | null = null;

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'div_root';
      document.body.append(container);
    });

    afterEach(() => {
      container?.remove();
      container = null;
    });

    test('Should be defined', () => {
      act(() => {
        render(
          <PasswordConfirmationModal
            open={true}
            onPasswordModalCancel={() => {}}
            onPasswordModalConfirm={() => {}}
            newPassword={'test'}
          />,
          {
            container: container!,
            wrapper: AuthProvider,
          },
        );
      });

      const el = container?.querySelector('div');
      expect(el).toBeDefined();
    });
  });
});
