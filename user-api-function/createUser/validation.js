/*
-----------------------------------------------------------------------------
 © Copyright AMIS 2021 - alle rechten voorbehouden
 -----------------------------------------------------------------------------
*/

/**
 * @typedef {object} User
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} prefix
 * @property {string} street
 * @property {number} houseno
 * @property {string} houseno_suffix
 * @property {string} postalcode
 * @property {string} city
 * @property {string} country
 * @property {string} phone1
 * @property {string} phone2
 * @property {string} email1
 * @property {string} email2
 */
/**
 * Validate user object and return full object if ok.
 *
 * @param {object} user - User object from request body
 * @returns {User} User object with all fields
 */
const validateRequest = (user) => {
  const firstName = user.firstname
  const lastName = user.lastname
  const prefix = user.prefix
  const street = user.street
  const houseno = user.houseno
  const housenoSuffix = user.houseno_suffix
  const postalcode = user.postalcode
  const city = user.city
  const country = user.country
  const phone1 = user.phone1
  const phone2 = user.phone2
  const email1 = user.email1
  const email2 = user.email2
  let response = null
  if (firstName && lastName && street && houseno && postalcode && city && email1) {
    response = {
      firstname: firstName,
      lastname: lastName,
      prefix,
      street,
      houseno,
      houseno_suffix: housenoSuffix,
      postalcode,
      city,
      country,
      phone1,
      phone2,
      email1,
      email2
    }
  }
  return response
}

module.exports = {
  validateRequest
}
