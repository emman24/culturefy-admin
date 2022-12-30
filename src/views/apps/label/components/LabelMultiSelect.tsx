import React, { useState, useMemo } from 'react';

import { useSelector } from 'react-redux'
import _ from 'lodash'

import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// ** types
import { RootState } from 'src/store';
import { Label } from 'src/types/apps/label'

interface ILabelMultiSelect {
    labels: Label[],
    setLabels: (labels: Label[]) => Label[]
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect({ labels, setLabels }: ILabelMultiSelect) {

    const [selected, setSelected] = useState<Label[] | []>([])
    const store = useSelector((state: RootState) => state.label)

    useMemo(() => {
        setSelected(labels)
    }, [labels])

    useMemo(() => {
        if (_.isArray(selected)) {
            setLabels(selected)
        }
    }, [selected])

    return (
        <Autocomplete
            fullWidth
            multiple
            id="label-multi-select"
            options={store.labels}
            getOptionLabel={(option) => option.name}
            value={selected}
            onChange={(r, e) => setSelected(e as Label[])}
            disableCloseOnSelect
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Labels"
                    placeholder="labels"
                />
            )}
        />
    );
}
