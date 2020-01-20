class Builder {
    constructor(){
        this.query = '';
        this.limit = '';
        this.params = [];
    }
    allApartments = (page, size) =>{
        this.query = "SELECT A.*, C.name from apartments A join cities C on A.city_id = C.id WHERE 1 "; 
        this.limit = ` limit ${(page-1)*size}, ${size}`;
        return this;
    }
    id = (id) => {
        this.params.push(id);
        this.query += ' and id = ? ';
        return this;
    }
    user_id = (user_id) => {
        this.params.push(user_id)
        this.query += ' and user_id = ? ';
        return this;
    }
    city_id = (city_id) => {
        this.params.push(city_id);
        this.query += ' and city_id = ? ';
        return this;
    }
    minprice = (price) => {
        this.params.push(price);
        this.query += ' and price >= ? ';
        return this;
    }
    rooms = (rooms) => {
        if(rooms > 0){
            this.params.push(parseInt(rooms));
            this.query += ' and number_of_room >= ? ';
        }
        return this;
    }
    beds = (beds) => {
        if(beds > 0){
            this.params.push(beds);
            this.query += ' and number_of_bath >= ? ';
        }
        return this;
    }
    build = () => {
        this.query += this.limit;
        return {query: this.query, params: this.params}
    }
}


module.exports = Builder