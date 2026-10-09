import { useState, type FormEvent } from "react";
import {
    contactFormSchema,
    mapContactValidationErrors,
    type ContactFieldErrors,
    type ContactFormField,
} from "../../../lib/contact/schema";
import { submitContactForm } from "../../lib/contact/submitContactForm";
import { Button } from "../ui/Button";

const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
};

type FormStatus = "idle" | "loading" | "success" | "error";

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1 text-small leading-relaxed text-danger">{message}</p>;
}

export function ContactForm() {
    const [values, setValues] = useState(initialValues);
    const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
    const [status, setStatus] = useState<FormStatus>("idle");
    const [formMessage, setFormMessage] = useState("");

    function updateField(field: ContactFormField, value: string) {
        setValues((current) => ({ ...current, [field]: value }));
        setFieldErrors((current) => ({ ...current, [field]: undefined }));
        if (status !== "idle") {
            setStatus("idle");
            setFormMessage("");
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const clientValidation = contactFormSchema.safeParse(values);
        if (!clientValidation.success) {
            setFieldErrors(mapContactValidationErrors(clientValidation.error));
            setStatus("error");
            setFormMessage("Please fix the highlighted fields and try again.");
            return;
        }

        setStatus("loading");
        setFormMessage("");
        setFieldErrors({});

        const result = await submitContactForm(clientValidation.data);

        if (result.success) {
            setValues(initialValues);
            setStatus("success");
            setFormMessage(result.message);
            return;
        }

        setStatus("error");
        setFormMessage(result.message);
        setFieldErrors(result.fieldErrors ?? {});
    }

    const isSubmitting = status === "loading";

    return (
        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(event) =>
                        setValues((current) => ({ ...current, website: event.target.value }))
                    }
                />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="contact-name">
                    YOUR NAME
                </label>
                <input
                    id="contact-name"
                    type="text"
                    placeholder="Enter your name"
                    className="form-input"
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                />
                <FieldError message={fieldErrors.name} />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="contact-email">
                    YOUR EMAIL
                </label>
                <input
                    id="contact-email"
                    type="email"
                    placeholder="Enter your email"
                    className="form-input"
                    value={values.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.email)}
                />
                <FieldError message={fieldErrors.email} />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="contact-subject">
                    SUBJECT
                </label>
                <input
                    id="contact-subject"
                    type="text"
                    placeholder="Enter subject"
                    className="form-input"
                    value={values.subject}
                    onChange={(event) => updateField("subject", event.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.subject)}
                />
                <FieldError message={fieldErrors.subject} />
            </div>

            <div className="form-field">
                <label className="form-label" htmlFor="contact-message">
                    YOUR MESSAGE
                </label>
                <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Write your message..."
                    className="form-input resize-none"
                    value={values.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.message)}
                />
                <FieldError message={fieldErrors.message} />
            </div>

            {formMessage && (
                <p
                    className={`text-small leading-relaxed ${status === "success" ? "text-text" : "text-danger"
                        }`}
                    role={status === "success" ? "status" : "alert"}
                >
                    {formMessage}
                </p>
            )}

            <Button type="submit" disabled={isSubmitting} showArrow={!isSubmitting}>
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </Button>
        </form>
    );
}
