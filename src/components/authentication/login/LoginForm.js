import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import firebase from "../../../firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState();
  const [otpField, setOtpField] = useState(false);
  const [otp, setOtp] = useState();

  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  //   password: Yup.string().required('Password is required')
  // });
  const otpHandle = (e) => {
    setOtp(e.target.value);
    console.log("otp code:", otp);
  }

  const handleChange = (e) => {
    setMobile(e.target.value);
    console.log("mobile number:", mobile);
  };

  const formik = useFormik({
    // initialValues: {
    //   number: "",
    // },
    // validationSchema: LoginSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("recaptcha verified");
        },
        defaultCountry: "IN",
      },
      auth
    );
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
  };

  // const handleShowPassword = () => {
  //   setShowPassword((show) => !show);
  // };
  const onSignInSubmit = (e) => {
    e.preventDefault();

    configureCaptcha();
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;

    // const auth = getAuth();
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setOtpField(true);
        console.log("otp has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("otp error", error);
      });
  };

  const onSubmitOtp = (e) => {
    const code = otp
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user))
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("entered wrong otp")
      });
  };

  return (
    <FormikProvider value={formik}>
      {!otpField ? (
        <Form autoComplete="off" noValidate onSubmit={onSignInSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="number"
              label="Mobile Number"
              onChange={handleChange}
              // {...getFieldProps("number")}
              error={Boolean(touched.number && errors.number)}
              helperText={touched.number && errors.number}
            />

            <div id="sign-in-button"></div>
            {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
          </Stack>

          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      ) : (
        <Form autoComplete="off" noValidate onSubmit={onSubmitOtp}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="otp"
              type="number"
              label="Enter OTP"
              onChange={otpHandle}
              // {...getFieldProps("number")}
              error={Boolean(touched.number && errors.number)}
              helperText={touched.number && errors.number}
            />

            {/* <div id="sign-in-button"></div> */}
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Form>
      )}
    </FormikProvider>
  );
}
