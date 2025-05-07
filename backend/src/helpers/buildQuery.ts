import { filterStatus } from './filterStatus';
import { search } from './search';

export function buildQuery(query: any) {
  let find: any = { deleted: false };

  const filterResult = filterStatus(query, find);
  if (filterResult.error) {
    return filterResult;
  }
  find = filterResult.find;

  const searchResult = search(query, ['title', 'description']);
  if (searchResult.regex) {
    if ('$or' in searchResult.regex) {
      find.$or = searchResult.regex.$or;
    } else {
      find.title = searchResult.regex;
    }
  }

  if (query.price_min || query.price_max) {
    const priceMin = query.price_min ? parseFloat(query.price_min) : 0;
    const priceMax = query.price_max ? parseFloat(query.price_max) : Infinity;

    if (isNaN(priceMin) || isNaN(priceMax) || priceMin < 0 || priceMax < 0) {
      return { error: { status: 400, message: 'Giá phải là số dương' } };
    }

    if (priceMin > priceMax) {
      return { error: { status: 400, message: 'Giá tối thiểu không được lớn hơn giá tối đa' } };
    }

    find.price = {
      $gte: priceMin,
      $lte: priceMax,
    };
  }

  return find;
}