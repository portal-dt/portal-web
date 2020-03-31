import axios from 'axios';

export const getDocumentsByCustomerId = async () => {
  try {
    const { data: { documents } } = await axios.get('http://127.0.0.1:5000/v3/archive/documents/100005262?content=true');

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
      'http://127.0.0.1:5000/v3/archive/document',
      { documentId, openedAt: new Date() }
    );
  } catch (e) {
    console.log(e); // todo
  }
};