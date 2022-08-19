import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    ImageListItem, ImageListItemBar,
    ImageList, Stack, Typography,
    Avatar
} from '@mui/material';
// import InputDebounce from './Utils/InputDebounce';

const axios = require('axios');

function SearchResults() {
    const [imageData, setImageData] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        console.log('here', query);
        axios.get('https://api.unsplash.com/search/photos/',
            {
                params: {
                    client_id: 'aksP_zYThX8YCAoG3T7fO71unadjMjQFeBB4XGn3QU8',
                    query: query
                }
            })
            .then((res) => {
                console.log("res", res);
                setImageData(res.data.results);
            })
            .catch((err) => {
                console.log("Error", err);
            })
    }, [query])
    return (
        <>

            <Stack mt={4} ml={2}>
                <Typography variant="h3">Search results for "{query}"</Typography>
            </Stack>
            <Stack sx={{ mt: '30px', mx: '10px' }} spacing={2}>
                {
                    imageData.length === 0 ?
                        <Stack mt="50px" alignItems="center">
                            <Typography variant="h5">Nothing to show here!!</Typography>
                        </Stack>
                        :
                        <ImageList variant="masonry" gap={28} cols={3}>
                            {
                                imageData.map((item) => (
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
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                }
            </Stack>
        </>
    );
}

export default SearchResults;
