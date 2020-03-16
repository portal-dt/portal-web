import axios from 'axios';

export const getCustomers = async () => {
  const { data: { customers } } = await axios.get('http://127.0.0.1:3000/customers');
  return customers;
};