import http from "../http-common";

class AuctionDataService {

    getAll() {
        console.log("Get all called");
        return http.get("/auctions");
    }

    get(id) {
        return http.get(`/auctions/${id}`);
    }

    create(data) {
        console.log("create called");
        return http.post("/auctions", data);
    }

    delete(id) {
        return http.delete(`/auctions/${id}`);
    }

    deleteAll() {
        return http.delete(`/auctions`);
    }

    findByTitle(title) {
        return http.get(`/auctions?title=${title}`);
    }

}

export default new AuctionDataService();

