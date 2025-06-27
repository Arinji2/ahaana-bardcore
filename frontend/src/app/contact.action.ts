"use server";
import { Notify } from "@/components/email/notify";
import { Respond } from "@/components/email/response";
import { after } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export async function SendResponseEmail(
  name: string,
  email: string,
  subject: string,
  body: string,
) {
  try {
    const { error } = await resend.emails.send({
      from: "Ahaana <ahaana@mail.arinji.com>",
      to: [email],
      subject: "Thanks for reaching out",
      react: Respond({ firstName: name }),
    });

    if (error) {
      return false;
    }

    after(async () => {
      console.log("Sending notification email");
      await SendNotificationEmail(name, email, subject, body);
    });
    return true;
  } catch {
    return false;
  }
}

export async function SendNotificationEmail(
  name: string,
  email: string,
  subject: string,
  body: string,
) {
  try {
    const { error } = await resend.emails.send({
      from: "Ahaana <ahaana@mail.arinji.com>",
      to: [process.env.AHAANA_EMAIL!],
      subject: "Hey cutie, someone just reached out to you :D",
      react: Notify({ name, email, subject, body }),
    });

    if (error) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
