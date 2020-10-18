import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

   // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="email" ref={register({required: true})} />
            {errors.email && <span>Email is required</span>}
            <input name="password" ref={register({ required: true, minLength : 6 })} />
            {errors.password && <span>Password is required</span>}
            <input type="submit" />
        </form>
    );
}