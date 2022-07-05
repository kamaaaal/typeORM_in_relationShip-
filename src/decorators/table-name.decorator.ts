import { SetMetadata } from '@nestjs/common';

export const TableName = (tableName: string) => SetMetadata('table-name', tableName);
