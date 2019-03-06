export function loginHandler(params) {
  
    if (
      params.mail.toLowerCase() !== 'admin@mail.ru' ||
      params.password !== '12345'
    ) {
      return false
    }
  
    return true
  }

  export function getAvtorizetion() {
      const userId = localStorage.getItem('session');
      return userId ? +userId : null;
  }