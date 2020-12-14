import http from "../http-common";


    const getAll = () => {
        return http.get("/tutorials");
    }

    const get = id => {
        return http.get(`/tutorials/${id}`);
    }

    const create = data => {
        console.log(data);
        return http.post("/tutorials", data);
    }

    const update = (id, data) => {
        return http.put(`/tutorials/${id}`, data);
    }

    const remove = id => {
        console.log("remove");
        return http.delete(`/tutorials/${id}`);
    }

    const removeAll = () =>{
        return http.delete("/tutorials");
    }

    const findByTitle = title => {
        console.log(title);
        return http.get(`/tutorials?title=${title}`)

    }


export default {
      getAll,
      get,
      create,
      update,
      remove,
      removeAll,
      findByTitle
}