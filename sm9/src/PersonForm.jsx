import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const PersonForm = ({onSubmit}) => {
    //схема валидации
    const validationSchema = Yup.object({
        name: Yup.string().required('Обязательное поле'),
        age: Yup.number()
            .integer()
            .positive()
            .required('Обязательное поле'),
        email: Yup.string().required('Обязательное поле'),
        petName: Yup.string().when((obj) => obj.hasPet, {
            is: true,
            then: Yup.string().required('Обязательное поле'),
            otherwise: Yup.string(),
        }),
        petAge: Yup.number()
            .integer()
            .positive()
            .when((obj) => obj.hasPet, {
                is: true,
                then: Yup.number().required('Обязательное поле'),
                otherwise: Yup.number(),
            }),
    });   

    return (
        <Formik
            initialValues={{
                name: '',
                age: '',
                email: '',
                hasPet: false,
                petName: '',
                petAge: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                const person = {
                    name: values.name,
                    age: parseInt(values.age, 10),
                    email: values.email,
                    pet: values.hasPet
                        ? [{ name: values.petName, age: parseInt(values.petAge, 10) }]
                        : [],
                };
                
                onSubmit(person);
                resetForm();
            }}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <div>
                        <label htmlFor="name">Имя:</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="age">Возраст:</label>
                        <Field type="number" name="age" />
                        <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                    </div>

                    <div>
                        <label>
                        <Field type="checkbox" name="hasPet" onChange={(e) => setFieldValue('hasPet', e.target.checked)} />
                        Есть питомец?
                        </label>
                    </div>

                {values.hasPet && (
                    <>
                        <div>
                            <label htmlFor="petName">Имя питомца:</label>
                            <Field type="text" name="petName" />
                            <ErrorMessage name="petName" component="div" style={{ color: 'red' }} />
                        </div>

                        <div>
                            <label htmlFor="petAge">Возраст питомца:</label>
                            <Field type="number" name="petAge" />
                            <ErrorMessage name="petAge" component="div" style={{ color: 'red' }} />
                        </div>
                    </>
                )}

                <button type="submit">Добавить</button>
            </Form>
        )}
        </Formik>
    );
};

export default PersonForm;


