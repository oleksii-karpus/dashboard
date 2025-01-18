import { ErrorItemStyled, ErrorListStyled } from './index.styles';

type Props = {
    errors?: string[];
};
export const ErrorMessage = ({ errors }: Props) => {
    if (!errors || !errors.length) {
        return null;
    }
    return (
        <ErrorListStyled>
            {errors.map(error => (
                <ErrorItemStyled key={error}>{error}</ErrorItemStyled>
            ))}
        </ErrorListStyled>
    );
};
