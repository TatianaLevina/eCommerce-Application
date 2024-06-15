import { render, act } from '@testing-library/react';
import ImageCustom from '@/components/ImageCustom/ImageCustom';

describe('ImageCustom tests', () => {
  describe('Render element', () => {
    let container: HTMLElement | null = null;

    const mockSrc = 'http://localhost:3000/testSrc';
    const mockAlt = 'testAlt';
    const testClassName = 'test';

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
        render(<ImageCustom src={mockSrc} alt={mockAlt} className={testClassName} style={{}} />, {
          container: container!,
        });
      });

      const el = container?.querySelector(`.${testClassName}`);
      expect(el).toBeDefined();
    });

    test('Contains HTMLElement img.test', () => {
      act(() => {
        render(<ImageCustom src={mockSrc} alt={mockAlt} className={testClassName} style={{}} />, {
          container: container!,
        });
      });

      const el = container?.querySelector(`.${testClassName}`);
      expect(el).toBeInstanceOf(HTMLElement);
    });

    test('img.src correctly set', () => {
      act(() => {
        render(<ImageCustom src={mockSrc} alt={mockAlt} className={testClassName} style={{}} />, {
          container: container!,
        });
      });

      const el = container?.querySelector(`.${testClassName}`) as HTMLImageElement;
      expect(el?.src).toBe(mockSrc);
    });

    test('img.alt correctly set', () => {
      act(() => {
        render(<ImageCustom src={mockSrc} alt={mockAlt} className={testClassName} style={{}} />, {
          container: container!,
        });
      });

      const el = container?.querySelector(`.${testClassName}`) as HTMLImageElement;
      expect(el?.alt).toBe(mockAlt);
    });
  });
});
