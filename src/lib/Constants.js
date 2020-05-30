
let getHost = () => {
   if (process.env.NODE_ENV === 'development') {
      return 'https://dashboard.awiros.com:3002'
   } else if (process.env.NODE_ENV === 'production') {
      return 'https://dashboard.awiros.com:3002'
   }
}

export {getHost};
