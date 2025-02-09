import { useModal } from './useModal';
import { Button } from '../components/Button';
 
export const Modal = ({ toggleModal, setUsers, users }) => {
  const { newUser, onInputChange, onSubmit } = useModal({ toggleModal, setUsers, users });
  
  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Add New User</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={onInputChange}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={onInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={onInputChange}
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              name="street"
              value={newUser.address.street}
              onChange={onInputChange}
            />
          </label>
          <label>
            Suite:
            <input
              type="text"
              name="suite"
              value={newUser.address.suite}
              onChange={onInputChange}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={newUser.address.city}
              onChange={onInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={onInputChange}
            />
          </label>
          <label>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={newUser.company.name}
              onChange={onInputChange}
            />
          </label>
          <Button text="Add user" type="submit" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
};