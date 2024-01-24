import { ErrorAssociation } from '../validators/enums/errorAssociation.enum';

export interface ValidatorErrorI {
  errorMessage?: string | null;
  errorAssociation: ErrorAssociation;
}
