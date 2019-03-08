export function loginHandler(params) {
 if (
      params.mail.toLowerCase() !== 'admin@mail.ru' ||
      params.password !== '12345'
    ) {
      return false
    }
  
    return true
  }

  export const isEmail = /^[A-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
