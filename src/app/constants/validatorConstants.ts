import { ErrorAssociation } from '../shared/validators/enums/errorAssociation.enum';

export const VALIDATOR_ERROR = [
  {
    errorMessage: 'Поле не может быть пустым',
    errorAssociation: ErrorAssociation.REQUIRED,
  },
  {
    errorMessage: 'Введите коректную электронную почту',
    errorAssociation: ErrorAssociation.EMAIL,
  },
  {
    errorMessage: 'Должен содержать по крайней мере 1 цифру',
    errorAssociation: ErrorAssociation.REQUIRES_DIGIT,
  },
  {
    errorMessage: 'Длина должна быть не менее 8 символов!',
    errorAssociation: ErrorAssociation.MINLENGTH,
  },
  {
    errorMessage: 'Должен содержать по краней мере 1 символ нижнего регистра',
    errorAssociation: ErrorAssociation.REQUIRES_LOWERCASE,
  },
  {
    errorMessage: 'Должен содержать по краней мере 1 символ верхнего регистра',
    errorAssociation: ErrorAssociation.REQUIRES_UPPERCASE,
  },
  {
    errorMessage: 'Должен содержать по крайней мере 1 специальный символ',
    errorAssociation: ErrorAssociation.REQUIRES_SPECIAL_CHARS,
  },
  {
    errorMessage: 'Пароли не совпадают',
    errorAssociation: ErrorAssociation.MISMATCH,
  },
];
