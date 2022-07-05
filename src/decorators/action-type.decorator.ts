import { SetMetadata } from '@nestjs/common';

export const ActionType = (action: string) => SetMetadata('action-type', action);
