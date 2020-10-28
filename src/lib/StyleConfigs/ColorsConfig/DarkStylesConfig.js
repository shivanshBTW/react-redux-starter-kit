import CommonColorsConfig from "./CommonColorsConfig";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CommonStylesConfig from "../CommonStylesConfig";

let DarkStylesConfig = createMuiTheme({
   palette: {
      type: 'dark',
      ...CommonColorsConfig,
      primary: {
         contrastText: "rgba(0, 0, 0, 0.87)",
         dark: "rgb(100, 141, 174)",
         light: "rgb(166, 212, 250)",
         main: "#90caf9"
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
      text: {
         primary: '#fff',
         secondary: 'rgba(255, 255, 255, 0.7)',
         disabled: 'rgba(255, 255, 255, 0.5)',
         hint: 'rgba(255, 255, 255, 0.5)',
         icon: 'rgba(255, 255, 255, 0.5)'
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      background: {
         paper: '#424242',
         default: '#303030'
      },
      action: {
         active: '#fff',
         hover: 'rgba(255, 255, 255, 0.08)',
         hoverOpacity: 0.08,
         selected: 'rgba(255, 255, 255, 0.16)',
         selectedOpacity: 0.16,
         disabled: 'rgba(255, 255, 255, 0.3)',
         disabledBackground: 'rgba(255, 255, 255, 0.12)',
         disabledOpacity: 0.38,
         focus: 'rgba(255, 255, 255, 0.12)',
         focusOpacity: 0.12,
         activatedOpacity: 0.24
      }
   },
   ...CommonStylesConfig
})

export default DarkStylesConfig;