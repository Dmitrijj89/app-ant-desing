import { connect } from 'react-redux'
import { logIn } from '../actions/AuthAction'
import AuthForm from '../components/Auth'

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMsg,
})

const mapDispatchToProps = (dispatch) => ({
  logIn: (params) => dispatch(logIn(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);