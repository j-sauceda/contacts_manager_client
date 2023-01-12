import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { authStore } from "../features/auth/auth.store";
import { Contact } from "../shared/contact.interface";

interface Props {
  editableContact: Contact | undefined;
  setIsEditContactModeOn: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableContact: React.Dispatch<React.SetStateAction<Contact | undefined>>;
}

interface UserToken {
  email: string;
  sub: string;
  exp: number;
  iat: number;
}

export const EditContactForm = ({
  editableContact,
  setEditableContact,
  setIsEditContactModeOn,
}: Props) => {
  const [contactId, setContactId] = useState(editableContact?._id);
  const [name, setName] = useState(editableContact?.name);
  const [email, setEmail] = useState(editableContact?.email);
  const [phone, setPhone] = useState(editableContact?.phone);
  const [relation, setRelation] = useState(editableContact?.relation);

  const { accessToken } = authStore();
  const userId = accessToken
    ? (jwtDecode(accessToken) satisfies UserToken)
    : "";

  const queryClient = useQueryClient();

  const httpHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const updateContact = useMutation(async (updatedContact: Contact) => {
    const url = import.meta.env.VITE_API_URL + `contacts/${contactId}`;
    await axios.put(url, updatedContact, httpHeaders);
    queryClient.invalidateQueries(["contacts"]);
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let updatedContact: Contact = {
      user: userId.sub ? (userId.sub as string) : "",
      name: name ? name : "",
      email,
      phone,
      relation: relation ? relation : "",
    };
    await updateContact.mutate(updatedContact);
    setEditableContact(undefined);
    setIsEditContactModeOn(false);
  };

  const onEnterKey = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let updatedContact: Contact = {
        user: userId.sub ? (userId.sub as string) : "",
        name: name ? name : "",
        email,
        phone,
        relation: relation ? relation : "",
      };
      await updateContact.mutate(updatedContact);
      setEditableContact(undefined);
      setIsEditContactModeOn(false);
    }
  };

  return (
    <div>
      <h2 className="ui header">Edit Contact</h2>
      <form
        className="ui middle form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="ui stacked segment">
          <div className="field">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="New Contact's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                onEnterKey(e);
              }}
              required
            />
          </div>

          <div className="field">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Contact's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                onEnterKey(e);
              }}
            />
          </div>

          <div className="field">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Contact's Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => {
                onEnterKey(e);
              }}
            />
          </div>

          <div className="field">
            <label className="form-label">Relation</label>
            <select
              className="ui fluid dropdown"
              name="relation"
              id="relation"
              placeholder="Relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              required
            >
              <option value="">Relation</option>
              <option value="Classmate">Classmate</option>
              <option value="Co-worker">Co-worker</option>
              <option value="Friend">Friend</option>
              <option value="Relative">Relative</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="ui fluid attached buttons">
            <button
              className="large negative ui button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditContactModeOn(false);
              }}
            >
              Cancel
            </button>
            <button className="large primary ui button" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
