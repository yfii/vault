/* eslint-disable */
import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Icon from "@material-ui/core/Icon";
import Avatar from '@material-ui/core/Avatar';
// @material-ui/icons
import TranslateIcon from '@material-ui/icons/Translate';
import TelegramIcon from '@material-ui/icons/Telegram';
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// hooks
import { useTranslation } from 'react-i18next';

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const { dropdownHoverColor } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [lng, setLanguage] = useState('en');

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const switchLanguage = () => {
    console.log('switchLanguage')
    switch(i18n.language) {
      case 'zh':
      case 'zh-CN':
        return '中文'
      case 'en':
        return 'English'
      case 'ja':
        return '日本語'
      case 'th':
        return 'ไทย'
      default:
        return '中文'
    }
  }

  const handleClick = event => {
    console.log(event)
    switch(event) {
      case 'English':
        return i18n.changeLanguage('en').then(()=>setLanguage(event))
      case '中文':
        return i18n.changeLanguage('zh').then(()=>setLanguage(event))
      case '日本語':
        return i18n.changeLanguage('ja').then(()=>setLanguage(event))
      case 'ไทย':
        return i18n.changeLanguage('th').then(()=>setLanguage(event))
      default:
        return
    }
  }

  useEffect(() => {
    const lng = switchLanguage()
    setLanguage(lng);
  });
  
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonIcon={TranslateIcon}
          buttonText={lng}
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          onClick={handleClick}
          dropdownList={[
            "English",
            "中文",
            "日本語",
            "ไทย",
            { divider: true },
            <a
              href="https://github.com/yfii/vault/tree/master/src/locales"
              target="_blank"
            >
              Help to translate
            </a>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={
            classes.navLink + " " + classes.socialIconsButton
          }
          href="https://twitter.com/FinanceYfii"
          target="_blank"
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa fa-twitter"
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
          href="https://t.me/yfiifinance"
          target="_blank"
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa fa-telegram"
            }
          />{" "}
          telegram
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={
            classes.navLink + " " + classes.socialIconsButton
          }
          href="https://github.com/yfii/vault"
          target="_blank"
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa fa-github"
            }
          />{" "}
          Github
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={
            classes.navLink + " " + classes.socialIconsButton
          }
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <i
            className={
              classes.socialIcons +
              " " +
              classes.marginRight5 +
              " fab fa fa-wechat"
            }
          />{" "}
          Wechat
        </Button>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Avatar variant="square" alt="YFII" src={require(`../../images/wechat.png`)} style={{width: "80px", height: "80px"}}/>
        </Popover>
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
