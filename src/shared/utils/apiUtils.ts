import { GenericResponse } from '@/shared/interfaces/genericResponse';

export const getAllPageCount = (response: GenericResponse): number => {
  const meta = response?.['hydra:view']?.['hydra:last'] ?? '';
  const urlParams = new URLSearchParams(meta?.substring(meta.lastIndexOf('?')));
  const pageCount = urlParams.get('page');
  return pageCount ? Number(pageCount) : 1;
};
