import {z} from "zod";

const signUpSchema = z.object({
    name: z.string({message: '이름을 입력해주세요.'})
        .min(2, {message: "이름은 최소 2자 이상이어야 합니다."})
        .max(15, {message: "이름은 최대 15자까지 가능합니다."}),
    email: z.string({message: '이메일을 입력해주세요.'})
        .email({message: "유효한 이메일 주소를 입력해주세요."}),
    password:
        z.string({message: '비밀번호를 입력해주세요.'})
            .min(6, {message: "비밀번호는 최소 6자리 이상이어야 합니다."})
            .max(15, {message: "비밀번호느 최대 15자까지 가능합니다."})
            .refine(
                (val) => /[A-Za-z]/.test(val) && /\d/.test(val),
                {message: "비밀번호는 영문자와 숫자를 각각 하나 이상 포함해야 합니다."}
            ),
    passwordConfirm:
        z.string({message: '비밀번호를 확인해주세요.'}),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ['passwordConfrim']
});

export const SIGN_UP_SCHEMA = signUpSchema;