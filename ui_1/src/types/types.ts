import * as Yup from 'yup';

declare module 'yup' {
    interface StringSchema {
        emailDomainValidator(): StringSchema;
    }
}

Yup.addMethod(Yup.string, "emailDomainValidator", function () {
    return this.test(
        "has-domain-dot",
        "Email must have a valid domain (e.g., gmail.com)",
        (value) => {
            if (!value) return true;
            const parts = value.split("@");
            if (parts.length !== 2) return true;
            const domain = parts[1];
            return domain.includes(".") && domain.split(".").every(part => part.length > 0);
        }
    )
});
