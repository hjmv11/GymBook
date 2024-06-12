import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

import React from 'react'

const User = ({userId}) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        //const cellStatus = user.active ? '' : 'table-cell-inactive'

        return (
            <tr className="table-row user">
                <td className={`table-cell`}>{user.username}</td>
                <td className={`table-cell`}>{userRolesString}</td>
                <td className={`table-cell`}>
                    <button
                        className="icon-button table-button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}


export default User