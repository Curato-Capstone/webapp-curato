import { Record } from 'immutable';

export default Record({
    id: '',
    name: '',
    url: '',
    contact: {
        formattedPhone: '',
        twitter: '',
    },
    image: '',
    categories: [],
    description: '',
    rating: 0,
    location: {
        address: '',
        lat: '',
        lng: ''
    }
});
