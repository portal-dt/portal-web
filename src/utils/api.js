import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/v3/archive';

export const getDocumentsByCustomerId = async () => {
  try {
    const { data: { documents } } = await axios.get(`${BASE_URL}/documents/19096226325?content=true`);

    return documents.map(({ type, openedAt, invoiceDate, invoiceNumber, file }) => ({
      documentNumber: invoiceNumber,
      documentType: type,
      creationDate: invoiceDate,
      openedAt: openedAt,
      document: file
    }));
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const getLatestDocumentsByCustomerId = async () => {
  try {
    const { data: { documents } } = await axios.get(`${BASE_URL}/documents/latest/19096226325?content=true`);

    return documents.map(({ type, openedAt, invoiceDate, dueDate, file }) => ({
      documentName: `${type} ${new Date(invoiceDate).toLocaleString('default', { month: 'long' })} ${new Date(invoiceDate).getUTCFullYear()}`,
      creationDate: invoiceDate,
      openedAt: openedAt,
      dueDate,
      document: file
    }));
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const getCustomers = async () => {
  try {
    const { data: { customers } } = await axios.get('http://127.0.0.1:3000/customers');
    return customers;
  } catch (e) {
    console.log(e); // todo
    return [];
  }
};

export const updateViewedDocument = async (documentId) => {
  try {
    await axios.post(
      `${BASE_URL}/document`,
      { documentId, openedAt: new Date() }
    );
  } catch (e) {
    console.log(e); // todo
  }
};