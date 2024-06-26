import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content 

  if (isLoading) content = <p>Loading...</p>

  if (isError) content = <p className="errmsg">{error?.data?.message}</p>

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length
    ? ids.map(userId => <User key={userId} userId={userId}/>)
    : null

    content = (
      <table className='table table_users'>
        <thead className='table-thead'>
          <tr>
            <th scope='col' className='table-th-username'>Username</th>
            <th scope='col' className='table-th-role'>Role</th>
            <th scope='col' className='table-th-edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default UsersList