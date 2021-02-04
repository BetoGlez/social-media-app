import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ApolloCache, ApolloError, FetchResult, useMutation } from "@apollo/client";

import { gqlMutations } from "../../graphql/mutations";
import { ILoginUserData, ILoginUserPayload } from "../../graphql/models/user.model";

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {

    const INITIAL_LOGIN_FORM_VALUES: LoginFormValues = {
        username: "",
        password: ""
    };

    const history = useHistory();
    const [registerFromValues, setRegisterFormValues] = useState<LoginFormValues>(INITIAL_LOGIN_FORM_VALUES);
    const [formErrors, setFormErrors] = useState<any>({});
    const toast = useRef<Toast>(null);

    const loginForm = useFormik<LoginFormValues>({
        initialValues: INITIAL_LOGIN_FORM_VALUES,
        onSubmit: (values, helpers) => submitLoginUser(values, helpers)
    });

    const [loginUser, { loading }] = useMutation<ILoginUserData, ILoginUserPayload>(
        gqlMutations.LOGIN_USER,
        {
            update: (prox, res) => getMutationResult(prox, res),
            onError: (err) => handleError(err),
            variables: registerFromValues
        }
    );
    const getMutationResult = (_: ApolloCache<ILoginUserData>, result: FetchResult<ILoginUserData>) => {
        const loggedUser = result.data?.login;
        console.log("Logged user: ", loggedUser);
        history.replace("/");
    };
    const handleError = (err: ApolloError) => {
        const errors = err.graphQLErrors[0].extensions?.exception.errors;
        setFormErrors(errors);
        console.warn("Form errors: ", errors);
        Object.values(errors).forEach(errorMsg => {
            toast.current?.show({severity: "warn", summary: "Check your credentials", detail: errorMsg});
        });
    };

    const submitLoginUser = ( values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues> ) => {
        setRegisterFormValues(values);
        loginUser();
        formikHelpers.resetForm();
    };

    return (
        <div className="p-d-flex p-flex-column p-ai-center">
            <h1>Login with your credentials</h1>
            <Toast ref={toast} />
            {
                !loading ?
                <form onSubmit={loginForm.handleSubmit} className="p-d-flex p-flex-column p-ai-center" style={{ width: "100%" }}>
                    <div className="p-field p-mb-0" style={{ width: "60%" }}>
                        <span className="p-float-label p-mt-6">
                            <InputText value={loginForm.values.username} onChange={loginForm.handleChange}
                                id="username" autoComplete="off" style={{ width: "100%" }}/>
                            <label htmlFor="username">Username</label>
                        </span>
                        { formErrors.username && <small id="email" className="p-error p-d-block">{formErrors.username}</small> }
                    </div>
                    <div className="p-field p-mb-0" style={{ width: "60%" }}>
                        <span className="p-float-label p-mt-6">
                            <InputText value={loginForm.values.password} onChange={loginForm.handleChange}
                                id="password" autoComplete="off" style={{ width: "100%" }} />
                            <label htmlFor="password">Password</label>
                        </span>
                        { formErrors.password && <small id="email" className="p-error p-d-block">{ formErrors.password }</small> }
                    </div>
                    <Button type="sumbit" className="p-mt-6" label="Login" />
                </form>
                :
                <ProgressSpinner/>
            }
        </div>
    );
};

export default LoginPage;