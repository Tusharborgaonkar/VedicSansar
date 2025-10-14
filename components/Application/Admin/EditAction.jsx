import React from 'react'
import {MenuItem, ListItemIcon} from '@mui/material'
import Link from 'next/link'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const EditAction = ({href}) => {
  return (
    <MenuItem key="edit" >
        <Link href={href}>
            <ListItemIcon>
                <EditOutlinedIcon />
            </ListItemIcon>
            Edit
        </Link>
    </MenuItem>
  )
}

export default EditAction
