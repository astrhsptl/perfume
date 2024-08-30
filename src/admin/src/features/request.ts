import axios from 'axios';

const domain_name = 'https://perfume-api.labofdev.ru/v1/cart/get_all';

export async function fetchCarts() {
  return await axios.get(domain_name);
}
