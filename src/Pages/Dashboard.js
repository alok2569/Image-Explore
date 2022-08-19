
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {
    ImageListItem, Typography,
    ImageList, Stack,
    Avatar, ImageListItemBar,
    // IconButton
} from '@mui/material';


const axios = require('axios');

function App() {
    const [imageData, setImageData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
    }, [])

    const handleScroll = () => {
        if (
            Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
            isFetching
        )
            return;
        setIsFetching(true);
        console.log(isFetching);
    };

    const fetchData = () => {
        setTimeout(() => {
            axios.get('https://api.unsplash.com/photos/',
                {
                    params: {
                        client_id: 'aksP_zYThX8YCAoG3T7fO71unadjMjQFeBB4XGn3QU8',
                        page: pageNum
                    }
                })
                .then((res) => {
                    console.log("res", res.data);

                    setPageNum(pageNum + 1);
                    setImageData(() => {
                        return [...imageData, ...res.data]
                    });
                    //   setImageData(res.data);
                })
                .catch((err) => {
                    console.log("Error", err);
                })
        }, 200);
    }

    useEffect(() => {
        if (!isFetching)
            return;
        fetchMoreListItems();
    }, [isFetching]);

    const fetchMoreListItems = () => {
        fetchData();
        setIsFetching(false);
    };

    return (

        <Stack sx={{ mt: '30px', mx: '10px' }} spacing={2}>
            <ImageList variant="masonry" gap={28} cols={3}>
                {imageData.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            src={item.urls.small}
                            alt={item.alt_description}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={
                                <Stack mt={1} direction="row">
                            <Avatar sx={{ width: 28, height: 28 }} alt={item.user.first_name} src={item.user.profile_image.small} />
                            <Typography ml={1}>{item.user.first_name}</Typography>
                        </Stack>
                            }
                            // actionIcon={
                                
                            //     <IconButton
                            //         sx={{ width: 36, height: 36,
                            //             color: 'rgba(255, 255, 255, 0.54)' }}
                            //         // aria-label={`info about ${item.title}`}
                            //         onClick={(e) => {
                            //             e.preventDefault();
                            //             console.log('heere')
                            //             window.location.href = item.links.download;
                            //         }}
                            //     >
                            //         <DownloadIcon />
                            //     </IconButton>  
                            // }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Stack>

    );
}

export default App;
