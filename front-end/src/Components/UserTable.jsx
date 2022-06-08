import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function UserTable() {
  const { fetchAllUser, allUsers, deleteUser } = useContext(DeliveryContext);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const removeUser = async (id) => {
    await deleteUser(id);
    await fetchAllUser();
  }

  return (
    <table className="table table-striped mt-4 align-middle">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
        { allUsers.length !== 0 && (
          allUsers.map(({ id, name, email, role }) => (
            <tr key={ `${id}-${name}` }>
              <th scope="row">{ id }</th>
              <td>{ name }</td>
              <td>{ email }</td>
              <td>{ role }</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  style={ { marginLeft: '10px' } }
                  type="button"
                  onClick={ () => removeUser(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
