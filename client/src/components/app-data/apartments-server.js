import fetcher from './fetcher';

async function registerUser({...data}) {
    console.log('HEY YOU' ,{...data})
    try{
        const post = await fetcher.post('/users/signup', {...data});
        console.log("post: ",post)
    } catch (error) {
        console.log("Say me what a problem", error);
        return error
    }
}

const getApartments = async (rooms = 0, beds = 0, minprice = -1, maxprice = -1, size = 10) => {
    try {
        const response = await fetcher.get(`/apartments?rooms=${rooms}&beds=${beds}&minprice=${minprice}&maxprice=${maxprice}&size=${size}`);
        return response.data.apartments;
    } catch (error) {
        console.log(error);
    }
}

const getApartmentsById = async (id) => {
    try {
        const response = await fetcher.get(`/apartments?id=${id}`);
        return response.data.apartments;
    } catch (error) {
        console.log(error);
    }
}

async function getApartment(apartmentId, handleSuccess) {
    try {
        const success = await fetcher.get(`/apartments/${apartmentId}`);
        const apartment = await handleSuccess(success.data);
        console.log(apartment)
    }
    catch (error) {
        console.log(error)
        return error
    }
}



async function loginUser(email, password, func) {
    // console.log(email, password)
    console.log(email, password, 'herere')
    console.log('func', func)

    try {
        const login = await fetcher.post(`/users/login`, {email, password});
        console.log('login', login)
        func()
        return login
    } catch (error) {
        return error
    }
}

export { getApartments, getApartment, registerUser, loginUser, getApartmentsById }

/*const getDataFromServer = () => {
    fetch(`https://storage.googleapis.com/realtour/apartments-rt.json`, {
            method: 'GET',
        }
    ).then(response => response.json()
    ).then(success =>  {
            this.setState({
                feedPosts: success,
            })
        }
    ).catch(error => console.log(error))};*/

// const getDataFromServer = (type, handleSuccess) => {
//     fetch(`https://storage.googleapis.com/realtour/${type}`, {
//             method: 'GET',
//         }
//     ).then(response => response.json()
//     ).then(success => handleSuccess(success)
//     ).catch(error => console.log(error));
// };
// const getQuery = (query) => {
//     let result = "";
//     for (const q in query) {
//         result += `${q}=${query[q]}`
//     }
// }
// const getApartments = async ({rooms = -1, beds = -1, minprice = -1, maxprice = -1, size = 10}) => {
    // const getApartment = (apartmentId,handleSuccess) => {
//     axios.get(`http://localhost:4000/apartments/${apartmentId}`
//     ).then(success => handleSuccess(success.data)
//     ).catch(error => console.log(error));
// }