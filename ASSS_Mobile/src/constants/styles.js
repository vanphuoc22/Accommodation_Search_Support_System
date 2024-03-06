// import {StyleSheet } from 'react-native'
// import Colors from './Colors';

// const styles = StyleSheet.create({

//     text:{
//         color: Colors.green,
//         fontFamily:'OpenSans-Bold',
//         fontSize:40,
//         fontWeight: 'bold',
//         textAlign:'center',

//       },
//     text1:{
//         justifyContent: 'flex-end',

//     },
//     welcome:{
//         flex:1,
//         flexDirection:'column',
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:'#FBF7F4'
//     },
//   });
//   export default styles;
import { StyleSheet } from "react-native";
import Colors from "./Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  bgColor: {
    backgroundColor: Colors.background,
  },
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  onboarding: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.green,
    // fontFamily: 'OpenSans-Bold',
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  text1: {
    position: "absolute",
    bottom: 20,
    color: Colors.green,
    // fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    textAlign: "center",
    fontStyle: "italic",
  },
  imgOnboarding: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#ddd",
  },
  input: {
    position: "relative",
    height: "100%",
    width: "90%",
    // fontFamily:'OpenSans-Medium',
    paddingLeft: 20,
  },
  btOnBoard: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover", // Chỉnh cách ảnh nền được hiển thị (cover, contain, stretch, repeat, center)
  },
  social_btn: {
    height: 55,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  social_img: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  hstack: {
    space: 3,
    w: "full",
    px: 6,
    bg: Colors.greenPlus,
    py: 4,
    alignItems: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderColor: "#C0C0C0",
    borderRadius: 7,
    backgroundColor: "#ededed",
  },
  inputSignUp: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
    width: "100%",
    borderRadius: 10,
    height: 60,
    paddingLeft: 20,
    margin: 5,
  },
  inputCreatePost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ededed",
    width: "100%",
    borderRadius: 10,
    height: 60,
    paddingLeft: 35,
    margin: 5,
  },
  textHeader: {
    // fontFamily:'OpenSans-SemiBold',
    fontSize: 30,
    color: Colors.black,
    fontWeight: "bold",
  },
  textInfor: {
    // fontFamily:"OpenSans-Regular",
    fontSize: 10,
    paddingTop: 2,
    color: "black",
  },
  viewLogin: {
    flexDirection: "column",
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fogotPass: {
    fontSize: 17,
    // fontFamily:'OpenSans-SemiBold',
    color: "#818181",
    alignSelf: "flex-end",
    paddingTop: 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 3,
    backgroundColor: "#D7E9D7",
    height: 30,
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 25,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 0,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    marginTop: 10,
  },
  infoBox: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {},
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  image: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderColor: Colors.greenPlus,
    borderWidth: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    // borderRadius: "100%",
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image1: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 100,
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateImg: {},
  containerListPosting: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  containerListPostingInProfile: {
    flex: 1,
    padding: 16,
    // backgroundColor: "#fff",
  },
  postItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 8,
  },
  postDescription: {
    marginTop: 5,
    fontWeight: "normal",
  },
  blinkingText: {
    fontWeight: "bold",
    color: "#229C10",
  },
  visibleText: {
    color: "white",
  },
  imagePostContainer: {
    // display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagePost: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  commentContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  postOption: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  inputStyle: {
    fontSize: 18,
    color: "#000000",
  },
  termsAndConditions: {
    marginBottom: 20,
    // whiteSpace: "pre-line",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  fullScreenImage: {
    width: "90%",
    height: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 5,
    borderRadius: 5,
  },
  downloadButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 5,
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
    width: 20,
    height: 20,
    textAlign: "center",
  },

  timepost: {
    fontSize: 12,
    color: "#888",
  },
  additionalIcons: {
    zIndex: 10,
    flexDirection: "row",
    position: "absolute",
    top: -15,
    left: 5,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },

  additionalIcon: {
    marginLeft: 5,
    marginRight: 5,
    padding: 8,
    backgroundColor: "#D1E8E2",
    borderRadius: 30,
  },
  action: {
    alignItems: "center",
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "black",
    marginHorizontal: 10,
    margin: 10,
  },
  borderInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    borderRadius: 10,
  },

  // Style cho mỗi nút cuối cùng
  bottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 8,
  },
  inputForgot: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed",
    width: "100%",
    borderRadius: 10,
    height: 60,
    paddingLeft: 20,
    margin: 5,
  },
  messtextInput: {
    // backgroundColor: color.background,
    borderRadius: 20,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  profileButtonsContainer1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 5,
  },
  profileButtonsContainer2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 5,
  },
  button1: {
    width: "42%",
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileButton1: {
    borderColor: "#DEDEDE",
    borderWidth: 1,
  },
  followButton1: {
    backgroundColor: "#3493D9",
  },

  buttonText1: {
    fontWeight: "bold",
    fontSize: 13,
    // letterSpacing: 1,
    opacity: 0.8,
    textAlign: "center",
    justifyContent: "center",
  },
  followButtonText1: {
    color: "white",
  },
  messageButton1: {
    borderWidth: 1,
    borderColor: "#DEDEDE",
  },
  optionsButton1: {
    width: "10%",
    borderWidth: 1,
    borderColor: "#DEDEDE",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonFG: {
    backgroundColor: "#00A465", // Màu nền
    padding: 10, // Khoảng cách nội dung và viền nút
    borderRadius: 5, // Độ cong của viền nút
    marginVertical: 20,
    width: "60%",
  },
  buttonTextFG: {
    color: "#FFFFFF", // Màu chữ
    textAlign: "center", // Căn chỉnh chữ
    fontWeight: "bold", // Độ đậm của chữ
  },

  // container: {
  //   borderRadius: 20,
  //   width: 200,
  //   height: 200,
  //   borderColor: "green",
  //   borderWidth: 2,
  //   marginTop: 20
  // },
});

export default styles;
