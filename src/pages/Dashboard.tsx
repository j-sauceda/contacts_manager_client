// built-in imports
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Zustand store
import { authStore } from "../features/auth/auth.store";

// interfaces
import { Contact } from "../shared/contact.interface";

// Components and CSS imports
import { toast } from "react-toastify";
import { Icon } from "semantic-ui-react";
import Spinner from "../components/Spinner";
import NewContactForm from "../components/NewContactForm";
import { EditContactForm } from "../components/EditContactForm";

interface UserToken {
  email: string;
  sub: string;
  exp: number;
  iat: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { accessToken, isSuccess } = authStore();
  const isUserLoggedIn = isSuccess && accessToken;
  const userId = accessToken
    ? (jwtDecode(accessToken) satisfies UserToken)
    : "";

  const [isNewContactModeOn, setIsNewContactModeOn] = useState(false);
  const [isEditContactModeOn, setIsEditContactModeOn] = useState(false);
  const [editableContact, setEditableContact] = useState<Contact>();

  const httpHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error, isError, isLoading } = useQuery<Contact[], Error>(
    ["contacts"],
    async () => {
      const url = import.meta.env.VITE_API_URL + `contacts/${userId.sub}`;
      const response = await axios.get(url, httpHeaders);
      return response.data;
    }
  );

  const deleteContact = useMutation(async (contactId: string) => {
    const url = import.meta.env.VITE_API_URL + `contacts/${contactId}`;
    await axios.delete(url, httpHeaders);
    queryClient.invalidateQueries(["contacts"]);
  });

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  if (isError) {
    toast.error(error.message);
    return (
      <div style={{ marginTop: 60, marginBottom: 60 }}>
        An Error has occurred
      </div>
    );
  } else if (isNewContactModeOn) {
    return (
      <div style={{ marginTop: 60, marginBottom: 60 }}>
        <NewContactForm setIsNewContactModeOn={setIsNewContactModeOn} />
      </div>
    );
  } else if (isEditContactModeOn) {
    return (
      <div style={{ marginTop: 60, marginBottom: 60 }}>
        <EditContactForm
          editableContact={editableContact}
          setEditableContact={setEditableContact}
          setIsEditContactModeOn={setIsEditContactModeOn}
        />
      </div>
    );
  } else
    return (
      <div style={{ marginTop: 60, marginBottom: 60 }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="row">
              <div className="ten wide column">
                <h2 className="ui header">Contacts Dashboard</h2>
              </div>
              <div className="six wide column">
                <button
                  className="ui large blue button"
                  onClick={() => setIsNewContactModeOn(true)}
                >
                  Create Contact
                </button>
              </div>
            </div>

            {data?.length === 0 ? (
              <div className="ui centered message">
                You have no contacts yet. To start saving contacts info, click
                above.
              </div>
            ) : (
              <table className="ui striped table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Relation</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((contact: Contact) => (
                      <tr key={contact._id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.relation}</td>
                        <td>
                          <button
                            className="ui button"
                            onClick={() => {
                              contact._id && setEditableContact(contact);
                              setIsEditContactModeOn(true);
                            }}
                          >
                            <Icon name="pencil alternate" color="green" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="ui button"
                            onClick={() =>
                              contact._id && deleteContact.mutate(contact._id)
                            }
                          >
                            <Icon name="trash alternate" color="red" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    );
};

export default Dashboard;
