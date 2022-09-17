export interface GenericResponse<T = unknown> {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': T[];
  'hydra:search': Record<string, unknown>;
  'hydra:totalItems': number;
  'hydra:view'?: {
    '@id': string;
    '@type': string;
    'hydra:first'?: string;
    'hydra:last'?: string;
    'hydra:next'?: string;
  };
}
