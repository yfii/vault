import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
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
  const { t } = useTranslation();
  const { confirmModal, setConfirmModal, index } = useContext(props.context)

  const handleClick = () => {
    confirmModal[index].func()
    setConfirmModal({
      ...confirmModal,
      [index]: {
        isOpen: false,
        description: '',
        func: (() => {})
      }
    })
  }

  const handleClose = () =>{
    setConfirmModal({
      ...confirmModal,
      [index]: {
        isOpen: false,
        description: '',
        func: (() => {})
      }
    })
  }
  const description = confirmModal[index] ? confirmModal[index].description : ''
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal
      }}
      open={Boolean(confirmModal[index] && confirmModal[index].open)}
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
        <p>{description}</p>
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