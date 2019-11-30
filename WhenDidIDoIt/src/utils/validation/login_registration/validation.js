const validation = {
    email: {
      presence: {
        message: true
      },
      email: {
        message: true
      }
    },
    password: {
      presence: {
        message: true
      },
      length: {
        minimum: 5,
        message: true
      }
    }, 
  }
  
  export default validation