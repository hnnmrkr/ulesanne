import { Title } from "../components/Title";
import { useTable } from "./useTable"
import { Modal } from "../components/Modal";
import { Trash, Edit, Check } from 'react-feather';
import { Button } from "../components/Button";

export const Table = ({ searchQuery }) => {
  
  const {
    users,
    setUsers,
    filteredUsers,
    showModal,
    editableRowId,
    tableWrapperRef,
    mouseDown,
    mouseMove,
    mouseUpOrLeave,
    toggleModal,
    deleteUser,
    editUser,
    saveEdit,
    onInputChange,
    handleKeyDown,
  } = useTable(searchQuery);

  return (
    <>
      <div className="container__head">
        <Title text="Users" />
        <Button onClick={toggleModal} text={showModal ? "Close modal" : "Add new user"} />
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
              <th>Address</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Catch Phrase</th>
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
                      onChange={(e) => onInputChange(e, 'name', user.id)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) => onInputChange(e, 'username', user.id)}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.email}
                      onChange={(e) => onInputChange(e, 'email', user.id)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                      onChange={(e) => onInputChange(e, 'address', user.id)}
                    />
                  ) : (
                    `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.phone}
                      onChange={(e) => onInputChange(e, 'phone', user.id)}
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.company.name}
                      onChange={(e) => onInputChange(e, 'company.name', user.id)}
                    />
                  ) : (
                    user.company.name
                  )}
                </td>
                <td>
                  {editableRowId === user.id ? (
                    <input
                      type="text"
                      value={user.company.catchPhrase}
                      onChange={(e) => onInputChange(e, 'company.catchPhrase', user.id)}
                    />
                  ) : (
                    user.company.catchPhrase
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
