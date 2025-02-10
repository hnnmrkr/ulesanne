import { useModal } from './useModal';
import { Button } from './Button';
 
export const Modal = ({ toggleModal, setUsers, users }) => {
  const { newUser, formErrors, onInputChange, onSubmit } = useModal({ toggleModal, setUsers, users });

  return (
    <div className="modal">
      <div className="modal__content">
        <h2>Add New User</h2>
        <form className="form" onSubmit={onSubmit}>
          <div className="form__row">
            <label>
              Name *
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={onInputChange}
                required
                className={formErrors.name ? 'form__error' : ''}
              />
              {formErrors.name && <span className="form__error">{formErrors.name}</span>}
            </label>
            <label>
              Username *
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={onInputChange}
                required
                className={formErrors.username ? 'form__error' : ''}
              />
              {formErrors.username && <span className="form__error">{formErrors.username}</span>}
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={onInputChange}
                className={formErrors.email ? 'form__error' : ''}
              />
              {formErrors.email && <span className="form__error">{formErrors.email}</span>}
            </label>
            <label>
              Phone
              <input
                type="text"
                name="phone"
                value={newUser.phone}
                onChange={onInputChange}
              />
            </label>
            <label>
              Website
              <input
                type="text"
                name="website"
                value={newUser.website}
                onChange={onInputChange}
                className={formErrors.website ? 'form__error' : ''}
              />
               {formErrors.website && <span className="form__error">{formErrors.website}</span>}
            </label>
          </div>
          <div className="form__row">
            <h3>Address</h3>

            <label>
            Street
              <input
                type="text"
                name="street"
                value={newUser.address.street}
                onChange={onInputChange}
              />
            </label>
            <label>
              Suite
              <input
                type="text"
                name="suite"
                value={newUser.address.suite}
                onChange={onInputChange}
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                value={newUser.address.city}
                onChange={onInputChange}
              />
            </label>
            <label>
              Zipcode
              <input
                type="text"
                name="zipcode"
                value={newUser.address.zipcode}
                onChange={onInputChange}
              />
            </label>
          </div>

          <div className="form__row">
            <h3>Geolocation</h3>

            <label>
              Latitude
              <input
                type="number"
                name="lat"
                value={newUser.address.geo?.lat || ''}
                onChange={onInputChange}
              />
            </label>
            <label>
              Longitude
              <input
                type="number"
                name="lng"
                value={newUser.address.geo?.lng || ''}
                onChange={onInputChange}
              />
            </label>
          </div>
          

          <div className="form__row">
            <h3>Company info</h3>

            <label>
              Company Name
              <input
                type="text"
                name="companyName"
                value={newUser.company.name}
                onChange={onInputChange}
              />
            </label>
            <label>
              Company Catchphrase
              <input
                type="text"
                name="catchPhrase"
                value={newUser.company.catchPhrase}
                onChange={onInputChange}
              />
            </label>
            <label>
              BS
              <input
                type="text"
                name="bs"
                value={newUser.company.bs}
                onChange={onInputChange}
              />
            </label>
          </div>
        
          <Button text="Add user" type="submit" onClick={onSubmit} />
        </form>
      </div>
    </div>
  );
};