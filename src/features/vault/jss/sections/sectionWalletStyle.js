import {
  container,
  title,
  main,
  whiteColor,
  mlAuto,
  grayColor,
  mainRaised,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const sectionWalletStyle = theme => ({
  walletTitle: {
    // display: "inline-flex",
    "& a": {
      color: grayColor[1]
    }
  },
  mlAuto,
  walletAddress: {
    // display: "flex"
  }
  // intro: {
  //   width: "100%",
  //   position: 'relative',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingBottom: '32px',
  //   [theme.breakpoints.down('sm')]: {
  //     maxWidth: 'calc(100vw - 24px)'
  //   }
  // },
  // addressContainer: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   overflow: 'hidden',
  //   flex: 1,
  //   whiteSpace: 'nowrap',
  //   fontSize: '0.83rem',
  //   textOverflow:'ellipsis',
  //   cursor: 'pointer',
  //   padding: '28px 30px',
  //   borderRadius: '50px',
  //   border: '1px solid rgba(25, 101, 233, 0.5)',
  //   alignItems: 'center',
  //   maxWidth: '450px',
  //   [theme.breakpoints.up('md')]: {
  //     width: '100%'
  //   }
  // },
  // walletAddress: {
  //   display: 'inline-block',
  //   padding: '0px 12px'
  // },
  // walletTitle: {
  //   display: 'inline-block',
  //   flex: 1,
  //   color: "rgba(43,57,84,.5)"
  // },
});

export default sectionWalletStyle;