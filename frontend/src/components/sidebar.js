import React from 'react';
import { observer } from 'mobx-react';
import {FormControl, FormLabel, Radio, RadioGroup, FormControlLabel} from '@mui/material';
import store from '../store/store';

const Sidebar = observer(() => {
    const handleChange = (event)=>{
        let attr = event.target.value;
        store.sortArticleBy(attr);  //Publication date => id, because id's are also assigned in inc. order otherwise 
                                    //there should be special check store 'if date ...' , then new Date(a)-new Date(b)
    }
    return (
        <div style={styles.sidebarWrap}>
            <div style={styles.sidebarContainer}>
                <FormControl>
                    <FormLabel id="sort-by-radio"><h5>SORT BY:</h5></FormLabel>
                    <RadioGroup
                        aria-labelledby="sort-by-radio"
                        name="controlled-radio-buttons-group"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="rating" control={<Radio />} label="Rating" />
                        <FormControlLabel value="id" control={<Radio />} label="Publication date" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )
});

const styles = {
    sidebarWrap: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '14%',
        backgroundColor: '#fff',
        boxShadow: "1px 0px 2px 0px rgba(50, 50, 50, 0.07)",
    },
    sidebarContainer: {
        padding: 8,
        paddingTop: 70,
    }
}

export default Sidebar;