import React,{ useState, useEffect} from 'react';
import {
    InputBase
  } from '@mui/material';


const InputDebounce = props => {
    const { onChange, ...rest } = props;
    const [myTimeOut, setMyTimeOut] = useState(null);

    const handleInputChange = value => {
        if(myTimeOut)
            clearTimeout(myTimeOut);
        setMyTimeOut(
            setTimeout(()=>{
                if(onChange)
                    onChange(value)
            },500)
        );
    }

    useEffect(() =>
        ()=>clearTimeout(myTimeOut)
    ,[myTimeOut])

    return (
        <InputBase
            {...rest}
            onChange = {e => handleInputChange(e.target.value)}
        />
    )
}

export default InputDebounce;