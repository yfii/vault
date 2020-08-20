/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
import Build from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";
import People from "@material-ui/icons/People";
import Assignment from "@material-ui/icons/Assignment";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Chat from "@material-ui/icons/Chat";
import Call from "@material-ui/icons/Call";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccountBalance from "@material-ui/icons/AccountBalance";
import ArtTrack from "@material-ui/icons/ArtTrack";
import ViewQuilt from "@material-ui/icons/ViewQuilt";
import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Store from "@material-ui/icons/Store";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Layers from "@material-ui/icons/Layers";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LineStyle from "@material-ui/icons/LineStyle";
import Error from "@material-ui/icons/Error";
import TranslateIcon from '@material-ui/icons/Translate';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const options = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

export default function HeaderLinks(props) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor } = props;
  const classes = useStyles();
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>

        <CustomDropdown
          // noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonIcon={TranslateIcon}
          buttonText="Dropdown"
          // dropdownHeader="Dropdown Header"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
            // startIcon: <TranslateIcon />
          }}
          onClick={e=>console.log(e)}
          // buttonIcon={{<TranslateIcon/>}}
          dropdownList={[
            "Action",
            "Another action",
            "Something else here",
            { divider: true },
            <Link to="/error-page" className={classes.dropdownLink}>
              Help to translate
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Examples"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ViewCarousel}
          dropdownList={[
            <Link to="/about-us" className={classes.dropdownLink}>
              <AccountBalance className={classes.dropdownIcons} /> About Us
            </Link>,
            <Link to="/blog-post" className={classes.dropdownLink}>
              <ArtTrack className={classes.dropdownIcons} /> Blog Post
            </Link>,
            <Link to="/blog-posts" className={classes.dropdownLink}>
              <ViewQuilt className={classes.dropdownIcons} /> Blog Posts
            </Link>,
            <Link to="/contact-us" className={classes.dropdownLink}>
              <LocationOn className={classes.dropdownIcons} /> Contact Us
            </Link>,
            <Link to="/landing-page" className={classes.dropdownLink}>
              <ViewDay className={classes.dropdownIcons} /> Landing Page
            </Link>,
            <Link to="/login-page" className={classes.dropdownLink}>
              <Fingerprint className={classes.dropdownIcons} /> Login Page
            </Link>,
            <Link to="/pricing" className={classes.dropdownLink}>
              <AttachMoney className={classes.dropdownIcons} /> Pricing Page
            </Link>,
            <Link to="/shopping-cart-page" className={classes.dropdownLink}>
              <ShoppingBasket className={classes.dropdownIcons} /> Shopping Cart
            </Link>,
            <Link to="/ecommerce-page" className={classes.dropdownLink}>
              <Store className={classes.dropdownIcons} /> Ecommerce Page
            </Link>,
            <Link to="/product-page" className={classes.dropdownLink}>
              <ShoppingCart className={classes.dropdownIcons} /> Product Page
            </Link>,
            <Link to="/profile-page" className={classes.dropdownLink}>
              <AccountCircle className={classes.dropdownIcons} /> Profile Page
            </Link>,
            <Link to="/signup-page" className={classes.dropdownLink}>
              <PersonAdd className={classes.dropdownIcons} /> Signup Page
            </Link>,
            <Link to="/error-page" className={classes.dropdownLink}>
              <Error className={classes.dropdownIcons} /> Error Page
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={
            classes.navLink + " " + classes.socialIconsButton
          }
          href="#contained-buttons"
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa-twitter"
            }
          />{" "}
          Twitter
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={
            classes.navLink + " " + classes.socialIconsButton
          }
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa-facebook"
            }
          />{" "}
          Facebook
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={
            classes.navLink + " " + classes.socialIconsButton
          }
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa-instagram"
            }
          />{" "}
          Instagram
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
