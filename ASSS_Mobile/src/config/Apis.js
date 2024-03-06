import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const SERVER_URL = 'http://192.168.1.82:8000';
// const SERVER = 'http://172.16.16.161'

const SERVER_URL = "http://192.168.10.28:8000/";
const SERVER = "http://192.168.10.28";

export const endpoints = {
  // "login": '${SERVER_URL}/api/login/',
  roles: `${SERVER_URL}/roles/`,
  current_user: `${SERVER_URL}/users/current_user/`,
  token: `${SERVER_URL}/o/token/`,
  postImg: `${SERVER_URL}/images/push_images_for_house/`,
  countFollow: `${SERVER_URL}/users/my_infor_count/`, // đếm fl của user đang login
  following: `${SERVER_URL}/follows/followeduser-by-current-user/`,
  getFollowing: (id) => `${SERVER_URL}/follows/${id}/followeduser/`, // lấy các tài khoản mà userid đang fl
  getFollower: (id) => `${SERVER_URL}/follows/${id}/follower/`,
  accFollow: (id) => `${SERVER_URL}/users/${id}/infor_count/`, // đếm fl của ngta
  otherUSer: (id) => `${SERVER_URL}/user/${id}/`, // lấy user khác qua id
  list: `${SERVER_URL}/posts/list_post_accepted/`, //list các bài viết đã đc châps nhận
  ImgOfHouse: (id) => `${SERVER_URL}/houses/${id}/images/`, //hình của nhà
  // "current-user": ${SERVER_URL}/get-user-by-token/,//user đăng nhập
  follower: `${SERVER_URL}/follows/followers-by-current-user/`,
  listCommentID: (id) => `${SERVER_URL}/posts/${id}/comments/`,
  images: `${SERVER_URL}/images/`,
  updateUser: (id) => `${SERVER_URL}/users/${id}/`,
  listComment: `${SERVER_URL}/comments/`,
  createOrDeleteFollow: `${SERVER_URL}/follows/create-or-delete-follow/`,
  countIdInfo: (id) => `${SERVER_URL}/users/${id}/infor_count/`,
  createPost: `${SERVER_URL}/push_post/`,
  listDiscount: `${SERVER_URL}/discounts/`,
  search: `${SERVER_URL}/posts/`,
  searchUser: `${SERVER_URL}/users/`,
  createAccount: `${SERVER_URL}/users/create_user/`,
  updateAvt: `${SERVER_URL}/users/update_avatar/`,
  sendOtp: `${SERVER_URL}/users/Send-OTP/`,
  upgrade: `${SERVER_URL}/users/check-OTP-upgrade-account/`,
  post: (id) => `${SERVER_URL}/posts/${id}/`,
  commentAPI: (id) => `${SERVER_URL}/comments/${id}/`,
  commentupdate: (id) => `${SERVER_URL}/comments/${id}/change-value-comment/`,
  commentcreate: `${SERVER_URL}/comments/create_comment/`,
  checkFollowStatus: (id) => `${SERVER_URL}/follows/${id}/check/`,
  getCommentRep: (id) => `${SERVER_URL}/comments/${id}/comment-rep/`,
  allNotice: (id) => `${SERVER_URL}/users/${id}/notices/`,
  noticeAPI: (id) => `${SERVER_URL}/notices/${id}/`,
  getHouseByID: (id) => `${SERVER_URL}/house/${id}/`,
  getUserByID: (id) => `${SERVER_URL}/user/${id}/`,
  getDiscountByID: (id) => `${SERVER_URL}/discounts/${id}/`,
  checkLikeStatus: (id) => `${SERVER_URL}/posts/${id}/check_like/`,
  createLike: `${SERVER_URL}/likes/create_or_delete_like/`,
  CheckOwnerCmt: (id) => `${SERVER_URL}/comments/${id}/`,
  countLike: (id) => `${SERVER_URL}/posts/${id}/count_like/`,
  paypal: `${SERVER_URL}/create_payment/`,
  otpChangeForgotPw: `${SERVER_URL}/users/change-password/`,
  checkOTP: `${SERVER_URL}/users/check-OTP/`,
  topPost: `${SERVER_URL}/posts/top_posts/`,
  listPostById: (id) => `${SERVER_URL}/users/${id}/posts/`,
  createNotice: `${SERVER_URL}/notices/`,
  searchUsername: `${SERVER_URL}/users/`,
  createBooking: `${SERVER_URL}/bookings/create_booking/`,
  createPayment: `${SERVER_URL}/payments/create-payment/`,
  checkPaypal: `${SERVER_URL}/payments/check_pay_suc/`,
  createPaymentPost: `${SERVER_URL}/create_payment_post/`,
  createPaymentUpPost: `${SERVER_URL}/payments/create-payment-up-post/`,
  deletePost: (id) => `${SERVER_URL}/posts/${id}/delete-post/`,
  upgradeAcc: `${SERVER_URL}/users/check-OTP-upgrade-account/`,
  pdfBooking: (id) => `${SERVER_URL}/pdf/generate_pdf/?booking_id=${id}`,
  sendmail: `${SERVER_URL}/send_mail/`,
};

let token;

const getToken = async () => {
  token = await AsyncStorage.getItem("token");
};

getToken();

export const authApiToken = (token) => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: "Bearer" + " " + token,
    },
  });
};

export default axios.create({
  baseURL: SERVER,
});
