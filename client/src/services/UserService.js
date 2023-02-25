import { API, endpoints } from "../api/index";
class UserService {
  static createUser(user) {
    return API.post(endpoints.api.user.create, user);
  }
  static updateUser(id, user) {
    return API.put(endpoints.api.user.update + id, user);
  }
  static updateUserImage(query, user) {
    return API.put(endpoints.api.user.changeImage + query, user);
  }

  static deleteUser(id) {
    return API.delete(endpoints.api.user.delete + id);
  }
  static fetchOneUser(id) {
    return API.get(endpoints.api.user.getone + id);
  }
  static userStatistic(query) {
    console.log("query:", query);

    return API.get(endpoints.api.user.statistic + query);
  }

  static fetchAllUser(query) {
    const url = query
      ? endpoints.api.user.getAll + query
      : endpoints.api.user.getAll;
    return API.get(url);
  }
}

export default UserService;
