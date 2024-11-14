import type { RegisterOptions, UseFormGetValues } from "react-hook-form"
import * as yup from "yup"
import { AnyObject } from "yup";


type Rules = {[key in "email" | "password" | "confirm_password"] ?: RegisterOptions}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
    email: {
        required: {
            value: true,
            message: "Email là bắt buộc"
        },
        pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
            message: "Email không đúng định dạng"
        },
        maxLength: {
            value: 150,
            message: "Độ dài từ 5 - 150 ký tự"
        },
        minLength: {
            value: 5,
            message: "Độ dài từ 5 - 150 ký tự"
        }
    },
    password: {
        required: {
            value: true,
            message: "Password là bắt buộc"
        },
        maxLength: {
            value: 150,
            message: "Độ dài từ 6 - 150 ký tự"
        },
        minLength: {
            value: 6,
            message: "Độ dài từ 6 - 150 ký tự"
        }
    },
    confirm_password: {
        required: {
            value: true,
            message: "Vui lòng nhập lại password"
        },
        maxLength: {
            value: 150,
            message: "Độ dài từ 6 - 150 ký tự"
        },
        minLength: {
            value: 6,
            message: "Độ dài từ 6 - 150 ký tự"
        },
        validate: 
            typeof getValues === "function" 
            ? ((value) => value === getValues("password") || "Password không khớp")
            : undefined
    },

});

function testPriceMinMax(this: yup.TestContext<AnyObject>)  {
    const { price_min, price_max } = this.parent as { price_min: string; price_max: string}
    if(price_min !== "" && price_max !== "") {
        return Number(price_max) >= Number(price_min)
    }
    return price_min !== "" || price_max !== ""
}


export const schema = yup.object({
        email: yup
            .string()
            .required("Email là bắt buộc")
            .email("Email không đúng định dạng")
            .max(150, "Độ dài từ 6 - 150 ký tự")
            .min(6, "Độ dài từ 6 - 150 ký tự"),
        password: yup
            .string()
            .required("Password là bắt buộc")
            .max(150, "Độ dài từ 6 - 150 ký tự")
            .min(6, "Độ dài từ 6 - 150 ký tự"),
        confirm_password: yup
            .string()
            .required("Password không trùng khớp")
            .max(150, "Độ dài từ 6 - 150 ký tự")
            .min(6, "Độ dài từ 6 - 150 ký tự")
            .oneOf([yup.ref("password")], "Password không trùng khớp"),
        price_min: yup
            .string()
            .test({
                name: "price-not-allowed",
                message: "Giá không phù hợp",
                test: testPriceMinMax
            }),
        price_max: yup
            .string()
            .test({
                name: "price-not-allowed",
                message: "Giá không phù hợp",
                test: testPriceMinMax
            }),
        name: yup
            .string()
            .required("Tên sản phẩm là bắt buộc")
    });

export type Schema = yup.InferType<typeof schema>