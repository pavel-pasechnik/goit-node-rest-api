import HttpError from '../helpers/HttpError.js';
import { createContactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';
import contactsService from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  const allContacts = await contactsService.listContacts();
  res.status(200).send(allContacts);
};

export const getOneContact = async (req, res) => {
  const contactId = req.params['id'];
  const oneContact = await contactsService.getContactById(contactId);

  if (!oneContact) {
    const status = 404;
    const error = HttpError(status);
    return res.status(status).send({ message: error.message });
  }
  res.status(200).send(oneContact);
};

export const deleteContact = async (req, res) => {
  const contactId = req.params['id'];
  const deletedContact = await contactsService.removeContact(contactId);

  if (!deletedContact) {
    const status = 404;
    const error = HttpError(status);
    return res.status(status).send({ message: error.message });
  }
  res.status(200).send(deletedContact);
};

export const createContact = async (req, res) => {
  const contact = req.body;
  const { error, value } = createContactSchema.validate(contact);

  if (!error) {
    const addContact = await contactsService.addContact(value);
    return res.status(201).send(addContact);
  }
  res.status(400).send({ message: error.message });
};

export const updateContact = async (req, res) => {
  const contactId = req.params['id'];
  const contact = req.body;
  const { error, value } = updateContactSchema.validate(contact);
  const oneContact = await contactsService.getContactById(contactId);
  const status = 404;

  if (!oneContact) {
    const error = HttpError(status);
    return res.status(status).send({ message: error.message });
  } else if (Object.keys(req.body).length === 0) {
    const error = HttpError(status, 'Body must have at least one field');
    return res.status(status).send({ message: error.message });
  } else if (!error) {
    const { name = oneContact.name, email = oneContact.email, phone = oneContact.phone } = value;
    const updatedContact = await contactsService.updateContact(contactId, { name, email, phone });
    return res.status(200).send(updatedContact);
  }
  res.status(400).send({ message: error.message });
};
