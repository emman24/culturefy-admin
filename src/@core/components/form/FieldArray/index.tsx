// import * as React from "react";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField'


export default function FieldArrayCustom({ fieldsArray, setFieldsArray }: any) {

  // console.log('fieldsArray ', fieldsArray);

  const onChange = (e: any, index: number) => {
    const newFieldsArray = [...fieldsArray];
    newFieldsArray[index] = e.target.value;
    setFieldsArray(newFieldsArray);
  }

  const addMore = () => {
    setFieldsArray(
      [...fieldsArray, '']
    )
  }

  const removeInput = (index: number) => {
    if (fieldsArray.length > 1) {
      const newFieldsArray = [...fieldsArray];
      newFieldsArray.splice(index, 1);
      setFieldsArray(newFieldsArray)
    }
  }


  return (
    <div>
      {
        fieldsArray?.map((field: any, index: number) => {
          return (
            <div className="mainFieldArray" key={index}>
              {/* <input className="inputFieldArray" type='text'
                value={field}
                onChange={(e) => onChange(e, index)}
                placeholder='Points'
              /> */}
              <TextField
                onChange={(e) => onChange(e, index)}
                value={field}
                placeholder='Points'
                fullWidth
              />
              <IconButton size='small' onClick={() => removeInput(index)} color="primary" >
                <DeleteIcon />
              </IconButton>
            </div>
          )
        })
      }
      <div className="addIconFieldArray">
        <IconButton size='small' onClick={addMore} color="primary" >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
}
