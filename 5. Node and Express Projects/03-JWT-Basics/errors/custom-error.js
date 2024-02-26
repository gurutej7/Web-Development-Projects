class CustomAPIError extends Error {
  constructor(message) {
    super(message)
    // this.statusCode = statusCode
    // we are going to setup/hardcore the status code in the separate classes
  }
}

module.exports = CustomAPIError
