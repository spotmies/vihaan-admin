import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
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
import { useStores } from "../../../state_management/store";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { CommonStore } = useStores();
  const navigate = useNavigate();
  const allowedNumber = [
    "8341980196",
    "9885991430",
    "7075852205",
    "8019933883",
    "9999999999",
  ];

  const [otpField, setOtpField] = useState(false);

  const mobileRef = useRef();
  const otpRef = useRef();

  useEffect(() => {
    if (otpField) {
      otpRef.current.value = "";
      otpRef.current.focus();
    }
  }, [otpField]);

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
          //  onSignInSubmit();
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
  const onSignInSubmit = async (e) => {
    console.log(mobileRef.current.value);
    e.preventDefault();
    if (!allowedNumber.includes(mobileRef.current.value.toString())) {
      alert("This number not authorized to use this app");
      return;
    }
    configureCaptcha();
    const phoneNumber = "+91" + mobileRef.current.value;
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
        alert(error);
        console.log("otp error", error);
      });
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const code = otpRef.current.value;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        CommonStore.login();
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("entered wrong otp");
        alert("Wrong OTP", error);
      });
  };

  return (
    <div>
      {!otpField ? (
        <FormikProvider value={formik}>
          <Form autoComplete="off" onSubmit={onSignInSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="username"
                type="number"
                label="Mobile Number"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
                inputRef={mobileRef}
                // onChange={handleChange}
                // {...getFieldProps("number")}
                error={Boolean(touched.number && errors.number)}
                helperText={touched.number && errors.number}
              />

              <div id="sign-in-button"></div>
              {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}
            </Stack>

            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
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
        </FormikProvider>
      ) : (
        <FormikProvider value={formik}>
          <Form
            autoComplete="off"
            noValidate
            onSubmit={onSubmitOtp}
            // value={formik}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="otp"
                inputRef={otpRef}
                type="number"
                defaultValue=""
                label="Enter OTP"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
                // onChange={otpHandle}
                // {...getFieldProps("number")}
                // error={Boolean(touched.number && errors.number)}
                // helperText={touched.number && errors.number}
              />

              {/* <div id="sign-in-button"></div> */}
              <div></div>
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
        </FormikProvider>
      )}
    </div>
  );
}
