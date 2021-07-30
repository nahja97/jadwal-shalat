import styles from '../../styles/Login.module.css';
import { Typography, TextField, Button, Snackbar } from "@material-ui/core"
import { createStyles, makeStyles, Theme, MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth.js'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1),
        width: '100%',
      },
      '& .MuiFormLabel-root': {
        color: '#F8F8F8'
      },
      '& .MuiInputBase-input': {
          color: '#F8F8F8'
      }
    },
    button: {
        marginTop: theme.spacing(2),
    }
  }),
);

const theme = createTheme({
    palette: {
        secondary: {
            main: '#F8F8F8'
        }
    }
});

function Login() {
    const classes = useStyles()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isSignedIn()) {
            router.push('/profile')
        }
    }, [])
    
    const [formData, setformData] = useState({
        username: '',
        password: ''
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setformData((prevState) => ({
            ...prevState,
            [name]: value
          }));
    }
    const { signIn, signOut } = useAuth()

    async function onSubmit(e) {
        e.preventDefault()
        const payload = {
            payload: {
                username: formData.username,
                password: formData.password
            }
        }
        signIn(payload, '/profile')
    }

    return <>
        <MuiThemeProvider theme={theme}>
            <div id={styles.login_form}>
                <h1>Login Page</h1>
                <form method='post'
                    className={classes.root} 
                    noValidate 
                    autoComplete="on"
                    id="login-form"
                    onSubmit={onSubmit}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        className={styles.form_input}
                        variant="outlined"
                        color="secondary"
                        onChange={handleChange}
                        value={formData.username}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        className={styles.form_input}
                        autoComplete="current-password"
                        variant="outlined"
                        color="secondary"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        id={styles.button_submit}
                        className={classes.button}
                        fullWidth
                        type="submit"
                        onClick={onSubmit}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </MuiThemeProvider>
    </>
}

export async function getStaticProps() {
    const layout = 'login'
    return {
        props: {
            meta: {
                title: 'Login',
                description: 'Login Dashboard Jadwal Shalat'
            },
            layout,
        },
    }
}


export default Login