import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorMessage } from '../../components/ErrorMessage';

describe('ErrorMessage', () => {
    it('matches snapshot when errors are provided', () => {
        const errors = ['Error 1', 'Error 2'];
        const { asFragment } = render(<ErrorMessage errors={errors} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when no errors are provided', () => {
        const { asFragment } = render(<ErrorMessage errors={undefined} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('matches snapshot when an empty array is provided', () => {
        const { asFragment } = render(<ErrorMessage errors={[]} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders all error messages', () => {
        const errors = ['Error 1', 'Error 2'];
        render(<ErrorMessage errors={errors} />);

        errors.forEach(error => {
            expect(screen.getByText(error)).toBeInTheDocument();
        });
    });

    it('does not render error list when no errors are provided', () => {
        const { container } = render(<ErrorMessage errors={undefined} />);
        expect(container.firstChild).toBeNull();
    });

    it('does not render error list when an empty array is provided', () => {
        const { container } = render(<ErrorMessage errors={[]} />);
        expect(container.firstChild).toBeNull();
    });
});
