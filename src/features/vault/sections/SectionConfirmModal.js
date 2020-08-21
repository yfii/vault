import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from "bignumber.js";
import { withRouter } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import FlashOnIcon from '@material-ui/icons/FlashOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// sections for this page
// style for this page
import sectionModalStyle from "../jss/sections/sectionModalStyle.js";
// hooks

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(sectionModalStyle);

function SectionConfirmModal(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    const func = props.modalOpen.func;
    func()
    props.setModalOpen({
      isOpen: false,
      description: '',
      func: null
    })
  }

  const handleClose = () =>{
    props.setModalOpen({
      isOpen: false,
      description: '',
      func: null
    })
  }
  
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal
      }}
      open={props.modalOpen.isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      onClick={(event) => event.stopPropagation()}
      onFocus={(event) => event.stopPropagation()}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <p>{props.modalOpen.description}</p>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button onClick={handleClose} color="secondary">
         {t('Vault-Modal-CloseButton')}
        </Button>
        <Button color="primary" onClick={handleClick}>{t('Vault-Modal-ConfirmButton')}</Button>
      </DialogActions>
    </Dialog>   
  );
}

export default withRouter(SectionConfirmModal);