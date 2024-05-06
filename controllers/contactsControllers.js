import HttpError from '../helpers/HttpError.js';
import Contact from '../models/contact.js';

export const getAllContacts = async (_, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).send(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await Contact.findById(contactId);

    if (!oneContact) {
      throw HttpError(404);
    }
    res.status(200).send(oneContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      throw HttpError(404);
    }
    res.status(200).send(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contact = req.body;
    const addContact = await Contact.create(contact);

    return res.status(201).send(addContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const oneContact = await Contact.findById(contactId);

    if (!oneContact) {
      throw HttpError(404);
    }
    const { name = oneContact.name, email = oneContact.email, phone = oneContact.phone } = body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone },
      { new: true }
    );

    return res.status(200).send(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const oneContact = await Contact.findById(contactId);

    if (!oneContact) {
      throw HttpError(404);
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true });

    return res.status(200).send(updatedContact);
  } catch (error) {
    next(error);
  }
};
