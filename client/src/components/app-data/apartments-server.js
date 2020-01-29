import fetcher from './fetcher';

async function registerUser({ ...data }) {
    try {
        await fetcher.post('/users/signup', { ...data });
    } catch (error) {
        return error
    }
}

const getApartments = async (rooms = 0, beds = 0, minprice = -1, maxprice = 99999999999, city_id = 0, size = 12, page = 1, status = 'approved', sale_status = 'both') => {
    try {
        const response = await fetcher.get(`/apartments?rooms=${rooms}&beds=${beds}&minprice=${minprice}&maxprice=${maxprice}&size=${size}&city_id=${city_id}&page=${page}&status=${status}&sale_status=${sale_status}`);
        return response.data.apartments;
    } catch (error) {
        return error
    }
}
const getApartmentsByUserId = async (user_id = -1) => {
    try {
        const response = await fetcher.get(`/apartments?user_id=${user_id}`);
        return response.data.apartments;
    } catch (error) {
        return error
    }
}



async function getApartment(apartmentId, handleSuccess) {
    try {
        const success = await fetcher.get(`/apartments/${apartmentId}`);
        await handleSuccess(success.data);
    }
    catch (error) {
        return error
    }
}

async function loginUser(email, password) {
    try {
        const login = await fetcher.post(`/users/login`, { email, password });
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
    try {
        const cities = await fetcher.get(`/cities`)
        onSuccess(cities)
        return cities
    } catch (error) {
        return error
    }
}

const getAllCitiesWithApartments = async (onSuccess) => {
    try {
        const cities = await fetcher.get(`/cities/apartments`)
        onSuccess(cities)
        return cities
    } catch (error) {
        return error
    }
}

const updateApartment = async (id, data) => {
    try {
        const response = await fetcher.put(`/apartments/${id}`, data)
        return response.data
    } catch (error) {
        return error
    }
}

const deleteApartmentById = async (id) => {
    try {
        const response = await fetcher.delete(`/apartments/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

const getApartmentsLength = async () => {
    try {
        const response = await fetcher.get(`/apartments/length`)
        return response.data
    } catch (error) {
        return error
    }
}

const getUsers = async () => {
    try {
        const response = await fetcher.get(`/users`)
        return response.data
    } catch (error) {
        return error
    }
}

const confirmApartment = async (apartmentId) => {
    try {
        const response = await fetcher.put(`/apartments`, { id: apartmentId })
        return response.data
    } catch (error) {
        return error
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetcher.delete(`/users/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}
const deleteApartmentByUserId = async (id) => {
    try {
        const response = await fetcher.delete(`/apartments/user/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}

const checkEmail = async (email) => {
    try {
        const response = await fetcher.get(`/users/${email}`)
        return response.data
    } catch (error) {
        return error
    }
}
const getUser = async (id) => {
    try {
        const response = await fetcher.get(`/users/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}
export {
    getApartments, getApartment, registerUser, loginUser, getApartmentsByUserId, addApartment, addImages, deleteApartmentByUserId,
    getCities, updateApartment, deleteApartmentById, getApartmentsLength, getUsers, getAllCitiesWithApartments,
    checkEmail, deleteUser, confirmApartment, getUser
}
