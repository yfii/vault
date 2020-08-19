import {
  title,
  mrAuto,
  mlAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import checkboxes from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";
import tooltips from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const sectionOpenedPoolStyle = theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(16),
      // height: theme.spacing(16),
    },
  },
});

export default sectionOpenedPoolStyle;