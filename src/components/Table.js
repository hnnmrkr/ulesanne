import { Trash, Edit, Check } from 'react-feather';

import { Title } from "./Title";
import { useTable } from "./useTable"
import { Modal } from "./Modal";
import { Button } from "./Button";

export const Table = ({ searchQuery }) => {
  
  const {
    users,
    filteredUsers,
    showModal,
    editableRowId,
    tableWrapperRef,
    setUsers,
    mouseDown,
    mouseMove,
    mouseUpOrLeave,
    toggleModal,
    deleteUser,
    editUser,
    saveEdit,
    onInputChange,
    handleKeyDown,
    formatAddress
  } = useTable(searchQuery);

  return (
    <>
      <div className="container__head">
        <Title text="Users" />
        <Button onClick={toggleModal} text={showModal ? "Close" : "Add new user"} />
        {showModal && <Modal setUsers={setUsers} users={users} toggleModal={toggleModal} />}
      </div>

      <div
        className="table__wrapper"
        ref={tableWrapperRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUpOrLeave}
        onMouseLeave={mouseUpOrLeave}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Address</th>
              <th>Latitude and longitude</th>
              <th>Company</th>
              <th>Catchphrase</th>
              <th>BS</th>
              <th></th>
            </tr>
          </thead>
          <tbody onKeyDown={(e) => e.target.tagName === 'INPUT' && handleKeyDown(e, editableRowId)}>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.name}
                      placeholder="Name"
                      onChange={(e) => onInputChange(e, 'name', user.id)}
                    />
                  ) : (
                    user.name ? user.name : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.username}
                      placeholder="Username"
                      onChange={(e) => onInputChange(e, 'username', user.id)}
                    />
                  ) : (
                    user.username ? user.username : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="email"
                      value={user.email}
                      placeholder="E-mail"
                      onChange={(e) => onInputChange(e, 'email', user.id)}
                    />
                  ) : (
                    user.email ? user.email : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="phone"
                      value={user.phone}
                      placeholder="Phone"
                      onChange={(e) => onInputChange(e, 'phone', user.id)}
                    />
                  ) : (
                    user.phone ? user.phone : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.website}
                      placeholder="Website"
                      onChange={(e) => onInputChange(e, 'website', user.id)}
                    />
                  ) : (
                    user.website ? user.website : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={formatAddress(user.address)}
                      placeholder="Address, suite, city, zipcode"
                      onChange={(e) => onInputChange(e, "address", user.id)}
                    />
                  ) : (
                    formatAddress(user.address) || "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <>
                      <input
                        type="text"
                        value={user.address?.geo?.lat || ""}
                        placeholder="Latitude"
                        onChange={(e) => onInputChange(e, "lat", user.id)}
                      />
                      ,  
                      <input
                        type="text"
                        value={user.address?.geo?.lng || ""}
                        placeholder="Longitude"
                        onChange={(e) => onInputChange(e, "lng", user.id)}
                      />
                    </>
                  ) : (
                    user.address?.geo?.lat && user.address?.geo?.lng
                      ? `${user.address.geo.lat}, ${user.address.geo.lng}`
                      : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.company.name}
                      placeholder="Company name"
                      onChange={(e) => onInputChange(e, 'company.name', user.id)}
                    />
                  ) : (
                    user.company.name ? user.company.name : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.company.catchPhrase}
                      placeholder="Catchphrase"
                      onChange={(e) => onInputChange(e, 'company.catchPhrase', user.id)}
                    />
                  ) : (
                    user.company.catchPhrase ? user.company.catchPhrase : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.company.bs}
                      placeholder="BS"
                      onChange={(e) => onInputChange(e, 'company.bs', user.id)}
                    />
                  ) : (
                    user.company.bs ? user.company.bs : "-"
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <Check 
                      onClick={() => saveEdit(user.id, user)} />
                  ) : (
                    <Edit onClick={() => editUser(user.id)} />
                  )}
                  <Trash onClick={() => deleteUser(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
