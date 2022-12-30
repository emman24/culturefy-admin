import React, { useState, useMemo } from 'react';

import { useSelector } from 'react-redux'

import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// ** types
import { RootState } from 'src/store';
import { EmployeeType } from 'src/types/apps/employeeTypes'

interface IManagerMultiSelect {
    managers: EmployeeType[],
    setManagers: (project: EmployeeType[]) => EmployeeType[]
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ManagerMultiSelect({ managers, setManagers }: IManagerMultiSelect) {

    const [selected, setSelected] = useState<EmployeeType[] | []>(managers || [])

    const employee_store = useSelector((state: RootState) => state.employee)

    useMemo(() => {
        setManagers(selected)
    }, [selected])

    return (
        <Autocomplete
            fullWidth
            multiple
            id="manager-multi-select"
            options={employee_store.employees.filter((emp) => emp.role_code === "MANAGER")}
            getOptionLabel={(option) => option.first_name}
            value={selected}
            onChange={(r, e) => setSelected(e)}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.first_name}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select managers"
                    placeholder="Managers"
                />
            )}
        />
    );
}
