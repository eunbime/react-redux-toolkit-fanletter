import axios from "axios";
// import store from "../redux/config/configStore";
// import { logoutUser } from "redux/modules/authSlice";

export const loginApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 2000,
});

export const jsonApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// json server 요청
jsonApi.interceptors.request.use(
  // 요청 전 수행되는 함수
  function (config) {
    console.log("인터셉터 요청 성공!");
    return config;
  },

  // 오류 요청 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 요청 오류 발생");
    return Promise.reject(error);
  }
);

// 로그인 서버 요청
loginApi.interceptors.request.use(
  function (config) {
    console.log("인터셉터 요청 성공!");
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// json 서버 응답
jsonApi.interceptors.response.use(
  function (response) {
    console.log("인터셉터 응답 받았습니다!");
    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// 로그인 서버 응답
loginApi.interceptors.response.use(
  function (response) {
    console.log("인터셉터 응답 받았습니다!");
    return response;
  },

  function (error) {
    console.log("인터셉터 응답 오류 발생", error.code);
    alert("로그인이 만료되었습니다");
    localStorage.removeItem("user");
    window.location.replace("/login");

    return Promise.reject(error);
  }
);

export default loginApi;

// try {
//   const response = await axios.get("/user", {
//     headers: {
//       Authorization: `Bearer ${user.accessToken}`,
//     },
//   });
//   console.log(response.data.success);

//   if (response.data.success === true) {
//     return config;
//   } else {
//     alert("로그인이 만료되었습니다");
//     localStorage.removeItem("user");
//     window.location.replace("/login");
//   }
//   console.log("인터셉터 요청 성공!");
// } catch (error) {
//   console.log("error", error);
//   alert("로그인이 만료되었습니다");
//   localStorage.removeItem("user");
//   window.location.replace("/login");
// }
