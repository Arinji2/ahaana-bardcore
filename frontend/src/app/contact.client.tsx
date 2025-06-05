"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Turnstile from "react-turnstile";

export default function Contact() {
  const [showChallenge, setShowChallenge] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const siteKey = "0x4AAAAAABgKjks_tAgYieiC";

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.subject.trim() !== "" &&
    formData.message.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setShowChallenge(true);
  };

  const handleTokenVerified = (token: string) => {
    setShowChallenge(false);

    console.log("Form submitted with token:");
    console.log({ ...formData, turnstileToken: token });

    // Handle the actual form submission here
    // Reset form after successful submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="w-full gap-6 md:gap-10 relative flex flex-col items-center px-4 justify-center">
      <h2 className="text-4xl font-bold tracking-wider text-primary">
        CONTACT ME
      </h2>
      <p className="text-2xl text-black text-center">
        Like what you see? Drop me a message and we can have a chat
      </p>

      <div className="flex flex-row gap-12 justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full md:max-w-[50%] h-fit flex flex-col items-start justify-start gap-4"
        >
          <div className="w-full h-fit flex flex-col md:flex-row items-center justify-start gap-6">
            <div className="md:w-fit w-full gap-3 h-fit flex flex-col items-center justify-center">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="bg-offwhite border-[3px] placeholder:text-black text-lg border-primary md:w-[300px] rounded-sm w-full py-1 px-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                className="bg-offwhite border-[3px] placeholder:text-black text-lg border-primary md:w-[300px] rounded-sm w-full py-1 px-2"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange("subject")}
                className="bg-offwhite border-[3px] placeholder:text-black text-lg border-primary md:w-[300px] rounded-sm w-full py-1 px-2"
                required
              />
            </div>
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange("message")}
              className="bg-offwhite border-[3px] placeholder:text-black text-lg border-primary md:w-[300px] rounded-sm w-full py-1 px-2"
              rows={5}
              required
            />
          </div>

          <Button
            disabled={!isFormValid}
            type="submit"
            className="text-lg"
            size="lg"
          >
            Send Message
          </Button>
        </form>

        <div className="md:block hidden w-[350px] h-[250px] relative">
          <Image
            src="/contact.png"
            alt="Contact"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {showChallenge && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <p className="text-lg text-white mb-4">
              Please verify you are human
            </p>
            <Turnstile
              sitekey={siteKey}
              onVerify={handleTokenVerified}
              theme="dark"
              refreshExpired="auto"
            />
            <Button
              variant="destructive"
              onClick={() => setShowChallenge(false)}
              className="text-sm mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
