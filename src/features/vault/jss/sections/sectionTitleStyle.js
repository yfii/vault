import {
  container,
  title,
  main,
  whiteColor,
  grayColor,
  mainRaised,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const sectionTitleStyle = theme => ({
  title: {
    ...title,
    color: grayColor,
  },
  textCenter: {
    textAlign: "center",
  }
});

export default sectionTitleStyle;