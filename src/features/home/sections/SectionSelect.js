import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import FlashOnIcon from '@material-ui/icons/FlashOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
// sections for this page
// style for this page
import sectionSelectStyle from "../jss/sections/sectionSelectStyle";
// hooks
import { useAccount } from 'features/common/redux/hooks';

import history from 'common/history'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(sectionSelectStyle);

function SectionSelect(props) {
  const { account } = useAccount();
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(Boolean(account));

  console.log(props.location.pathname)

  useEffect(()=> {
    setModalOpen(Boolean(account))
  }, [account])
  
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal + " " + classes.modalSmall
      }}
      open={modalOpen}
      TransitionComponent={Transition}
      // onClose={closeModal}
      keepMounted
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody+ " " + classes.modalSmallBody}
        >
        <Card className={ `${classes.card} ${classes.pool}` } onClick={ () => props.history.push('/vault')}>
          <PieChartIcon className={ `${classes.icon} icon` } />
          <Typography variant={'h3'} className={ `${classes.title} title` }>Vaults</Typography>
        </Card>
      </DialogContent>
    </Dialog>   
  );
}

export default withRouter(SectionSelect);