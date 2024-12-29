import { MyBig } from '@/lib/big';

export const toCent = (amount: number) =>
  new MyBig(amount).mul(100).round(2).toNumber();

export const fromCent = (amount: number) =>
  new MyBig(amount).div(100).round(2).toNumber();

export const toCurrencyFromCent = (amount: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP', // Change to GBP for British Pounds
  }).format(fromCent(amount));
