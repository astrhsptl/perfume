import { Lora, Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
export const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});
