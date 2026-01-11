"use client";
import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, GithubIcon, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from "react";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 🔴 IMPORTANT: REPLACE THIS URL with your Google Apps Script Web App URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylHm3MoQnoaYHwrmB_Wxqy9ubaB5aH00thiVzJxtokctHV7-K9CNTY3OcssPyA-MGH/exec";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Use FormData to ensure Google Apps Script parses it as e.parameter
            const params = new FormData();
            params.append("name", formData.name);
            params.append("email", formData.email);
            params.append("subject", formData.subject);
            params.append("message", formData.message);

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: params,
            });

            setIsSuccess(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="container mx-auto py-32 px-4 relative z-10">
            <div className="mx-auto max-w-7xl">
                <ContactCard
                    className="min-h-[600px]"
                    title="Let's Collaborate"
                    description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
                    contactInfo={[
                        {
                            icon: MailIcon,
                            label: 'Email',
                            value: 'vishnukashyapd18@gmail.com',
                        },
                        {
                            icon: PhoneIcon,
                            label: 'Phone',
                            value: '+91 6362991486',
                        },
                        {
                            icon: MapPinIcon,
                            label: 'Location',
                            value: 'Bangalore, India',
                        },
                        {
                            icon: LinkedinIcon,
                            label: 'LinkedIn',
                            value: 'linkedin.com/in/vishnu-kashyap-d',
                            className: 'cursor-pointer hover:text-primary',
                        },
                        {
                            icon: GithubIcon, // Using the already imported GithubIcon
                            label: 'GitHub',
                            value: 'github.com/Vishnu-kashyap-D',
                            className: 'cursor-pointer hover:text-primary',
                        },
                        {
                            icon: Instagram, // Need to import this
                            label: 'Instagram',
                            value: 'instagram.com',
                            className: 'cursor-pointer hover:text-primary',
                        }
                    ]}
                >
                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="name" className="text-base">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    className="bg-background/50 h-12 text-base"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="email" className="text-base">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-background/50 h-12 text-base"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="subject" className="text-base">Subject</Label>
                            <Input
                                id="subject"
                                type="text"
                                placeholder="Project discussion"
                                className="bg-background/50 h-12 text-base"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="message" className="text-base">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Tell me about your project..."
                                className="bg-background/50 min-h-[160px] text-base"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button className="w-full text-lg h-12" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                        {isSuccess && <p className="text-green-500 text-center text-base">Message received! I'll get back to you soon.</p>}
                    </form>
                </ContactCard>
            </div>
        </section>
    );
}
