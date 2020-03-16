class ServiceResponse {
   static error(message, data, httpCode) {
      console.log('srr',message);
      return {success: false, data: data || {}, message, httpCode: httpCode || 400}
   }

   static success(message, data, httpCode) {
      let gg = {success: true, data: data|| {}, message: message || "", httpCode: httpCode || 200}
      // console.log(gg);
      return gg
   }
}

export default ServiceResponse;
