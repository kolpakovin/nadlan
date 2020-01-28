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

const getApartments = async (rooms = 0, beds = 0, minprice = -1, maxprice = 99999999999, city_id = 0, size = 12, page = 1, status = 'approved') => {
    console.log("size: ", size)
    try {
        const response = await fetcher.get(`/apartments?rooms=${rooms}&beds=${beds}&minprice=${minprice}&maxprice=${maxprice}&size=${size}&city_id=${city_id}&page=${page}&status=${status}`);
        return response.data.apartments;
    } catch (error) {
        console.log(error);
    }
}
const getApartmentsByUserId = async (user_id = -1) => {
    try {
        const response = await fetcher.get(`/apartments?user_id=${user_id}`);
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

async function loginUser(email, password) {
    // console.log(email, password)
    console.log(email, password, 'herere')
    try {
        const login = await fetcher.post(`/users/login`, {email, password});
        console.log('login', login)
        return login.data
    } catch (error) {
        return error
    }
}

const addApartment = async (form_data) => {
    const response = await fetcher.post(`/apartments`, form_data)
    return response.data
}

const addImages = async (images) => {
    const response = await fetcher.post(`/images`, images)
    return response.data
}

const getCities = async (onSuccess) => {
   try{
    const cities = await fetcher.get(`/cities`)
    console.log("cities ", cities)
    onSuccess(cities)
    return cities
}catch (error) {
    console.log(error)
}}

const getAllCitiesWithApartments = async (onSuccess) => {
    try{
     const cities = await fetcher.get(`/cities/apartments`)
     console.log("cities ", cities)
     onSuccess(cities)
     return cities
 }catch (error) {
     console.log(error)
 }}

const updateApartment = async(id, data) => {
    try{
     const response = await fetcher.put(`/apartments/${id}`, data) 
     console.log("response ", response)
     return response.data
 }catch (error) {
     console.log(error)
}}

const deleteApartmentById = async(id) => {
    try{
     const response = await fetcher.delete(`/apartments/${id}`) 
     console.log("response ", response)
     return response.data
 }catch (error) {
     console.log(error)
}}

const getApartmentsLength = async() => {
    try{
     const response = await fetcher.get(`/apartments/length`) 
     console.log("response ", response)
     return response.data
 }catch (error) {
     console.log(error)
}}

const getUsers = async() => {
    try{
     const response = await fetcher.get(`/users`) 
     console.log("response u", response)
     return response.data
 }catch (error) {
     console.log(error)
}}

const confirmApartment = async(apartmentId) => {
    try{
     const response = await fetcher.put(`/apartments`, {id: apartmentId}) 
     console.log("response ", response)
     return response.data
 }catch (error) {
     console.log(error)
}}

export { getApartments, getApartment, registerUser, loginUser, getApartmentsByUserId, addApartment, addImages,
     getCities, updateApartment, deleteApartmentById, getApartmentsLength, getUsers, getAllCitiesWithApartments, confirmApartment}
