/* eslint-disable */
import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Footer from "components/Footer/Footer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-pro-react/components/footerLinksStyle.js";
import classNames from "classnames";
const useStyles = makeStyles(styles);

export default function FooterLinks(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const color = props.color;
    const badgeClasses = classNames({
        [classes.container]: true,
        [classes.fixed]: props.fixed,
    });

    return (
        <div className={badgeClasses}>
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
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
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
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
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
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
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
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
        </div>
    )
}

FooterLinks.defaultProps = {
    color: "transparent",
    fixed:false
  };
  
FooterLinks.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    fixed: PropTypes.bool,
};
  