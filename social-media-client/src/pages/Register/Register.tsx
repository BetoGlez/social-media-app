import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { ApolloCache, ApolloError, FetchResult, useMutation } from "@apollo/client";
import { FormikHelpers, useFormik } from "formik";

import { IRegisterUserData, IRegisterUserPayload } from "../../graphql/models/user.model";
import { gqlMutations } from "../../graphql/mutations";

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage: React.FC = () => {

    const INITIAL_REGISTER_FORM_VALUES: RegisterFormValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const history = useHistory();
    const [registerFromValues, setRegisterFormValues] = useState<RegisterFormValues>(INITIAL_REGISTER_FORM_VALUES);
    const [formErrors, setFormErrors] = useState<any>({});
    const toast = useRef<Toast>(null);

    const registerUserForm = useFormik<RegisterFormValues>({
        initialValues: INITIAL_REGISTER_FORM_VALUES,
        onSubmit: (values, helpers) => submitRegisterUser(values, helpers)
    });

    const [registerUser, { loading }] = useMutation<IRegisterUserData, IRegisterUserPayload>(
        gqlMutations.REGISTER_USER,
        {
            update: (prox, res) => getMutationResult(prox, res),
            onError: (err) => handleError(err),
            variables: registerFromValues
        }
    );
    const getMutationResult = (_: ApolloCache<IRegisterUserData>, result: FetchResult<IRegisterUserData>) => {
        const newUser = result.data?.register;
        toast.current?.show({severity: "success", summary: "User registered", detail: newUser?.username});
        history.replace("/");
    };
    const handleError = (err: ApolloError) => {
        const errors = err.graphQLErrors[0].extensions?.exception.errors;
        setFormErrors(errors);
        console.warn("Form errors: ", errors);
        Object.values(errors).forEach(errorMsg => {
            toast.current?.show({severity: "error", summary: "There was an error registering the user", detail: errorMsg});
        });
    };
    const submitRegisterUser = ( values: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues> ) => {
        setRegisterFormValues(values);
        registerUser();
        formikHelpers.resetForm();
    };

    return (
        <div className="p-d-flex p-flex-column p-ai-center">
            <h1>Register to start posting</h1>
            <Toast ref={toast} />
            {
                !loading ?
                <form onSubmit={registerUserForm.handleSubmit} className="p-d-flex p-flex-column p-ai-center" style={{ width: "100%" }}>
                    <div className="p-field p-mb-0" style={{ width: "60%" }}>
                        <span className="p-float-label p-mt-6">
                            <InputText value={registerUserForm.values.username} onChange={registerUserForm.handleChange}
                                id="username" autoComplete="off" style={{ width: "100%" }}/>
                            <label htmlFor="username">Username</label>
                        </span>
                        { formErrors.username && <small id="email" className="p-error p-d-block">{formErrors.username}</small> }
                    </div>
                    <div className="p-field p-mb-0" style={{ width: "60%" }}>
                        <span className="p-float-label p-mt-6">
                            <InputText value={registerUserForm.values.email} onChange={registerUserForm.handleChange}
                                id="email" autoComplete="off" style={{ width: "100%" }} />
                            <label htmlFor="email">Email</label>
                        </span>
                        { formErrors.email && <small id="email" className="p-error p-d-block">Invalid email</small> }
                    </div>
                    <span className="p-float-label p-mt-6" style={{ width: "60%" }}>
                        <InputText value={registerUserForm.values.password} onChange={registerUserForm.handleChange}
                            id="password" autoComplete="off" type="password" style={{ width: "100%" }} />
                        <label htmlFor="password">Password</label>
                    </span>
                    <span className="p-float-label p-mt-6" style={{ width: "60%" }}>
                        <InputText value={registerUserForm.values.confirmPassword} onChange={registerUserForm.handleChange}
                            id="confirmPassword" autoComplete="off" type="password" style={{ width: "100%" }} />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </span>
                    <Button type="sumbit" className="p-mt-6" label="Register" />
                </form>
                :
                <ProgressSpinner/>
            }
        </div>
    );
};

export default RegisterPage;