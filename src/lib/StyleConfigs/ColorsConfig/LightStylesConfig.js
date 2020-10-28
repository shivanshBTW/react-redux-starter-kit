import CommonColorsConfig from "./CommonColorsConfig";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import CommonStylesConfig from "../CommonStylesConfig";

let LightStylesConfig = createMuiTheme({
   palette: {
      type: 'light',
      ...CommonColorsConfig,
      primary: {
         light: '#7986cb',
         main: '#3f51b5',
         dark: '#303f9f',
         contrastText: '#fff'
      },
   },
   ...CommonStylesConfig
})

export default LightStylesConfig;