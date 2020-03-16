let HOST;
if (process.env.NODE_ENV === 'development') {
   HOST = "http://192.168.0.80:3000";
} else if (process.env.NODE_ENV === 'production') {
   HOST = "http://192.168.0.80:3000";
}

let Globals = {
   offline:false
};

export {HOST, Globals};
