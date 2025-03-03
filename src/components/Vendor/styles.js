import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.primary,
    margin: '30px 0',
    borderRadius: 20,
    boxShadow: '0px 0px 38px rgba(0, 0, 0, 0.06)',
    textAlign: 'center',
    paddingBottom: 5
  },
  heading: {
    backgroundColor: theme.palette.primary.main2,
    width: '50%',
    padding: 10,
    borderRadius: '20px 20px 20px 0',
    textAlign: 'center'
  },
  headingBlack: {
    backgroundColor: theme.palette.common.black,
    width: '50%',
    padding: 10,
    borderRadius: '20px 20px 20px 0',
    textAlign: 'center'
  },
  text: {
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  textWhite: {
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  form: {
    margin: 25,
    alignItems: 'center'
  },
  labelText: {
    textAlign: 'left',
    marginLeft: '4%',
    fontSize: '15px',
    fontWeight: '500',
    marginTop: '10px'
  }
}))

export default useStyles
