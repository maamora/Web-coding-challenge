import http from "./service";


class URLS {
    getAll() {
        return http.get("/get");
    }

    getById(id) {
        return http.get(`/get/${id}`);
    }

    create(data) {
        return http.post("/post", data);
    }

    update(id, data) {
        return http.put(`/update/${id}`, data);
    }

    delete(id) {
        return http.delete(`/delete/${id}`);
    }
}
export default new URLS();