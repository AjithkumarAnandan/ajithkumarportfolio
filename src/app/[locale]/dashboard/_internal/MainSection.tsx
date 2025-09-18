"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Mail, Globe, Phone, StickyNote } from "lucide-react";
// import DownloadLink from "next/link";
import { Link } from "@/i18n/navigation";
import React, { useState } from "react";

interface PageProps {
  locale: string;
}
const MainSection = ({ locale }: PageProps) => {
  const [formData, setFormData] = useState({
    email: "",
    customername: "",
    comment: "",
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Thank you for subscribing with ${formData.email}! We'll keep you updated on ReactJS.`
    );
    setFormData({ email: "", customername: "", comment: "" });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div id="features" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black text-foreground">
          This website is built with Next.js and React.js
        </h2>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Featuring powerful tools that make React the leading choice for modern
          web development, including Tailwind CSS, i18n for multilingual
          support, Redux Toolkit, responsive design, email feedback integration,
          and a robust backend powered by Node.js, Express, PostgreSQL, OAuth,
          and JWT authentication.
        </p>
      </div>
      <div id="community" className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-black text-foreground">
          Join with US
        </h2>
      </div>
      <div id="resources" className="max-w-4xl mx-auto">
        <Card className="border-border p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-6">
                Get the latest news, updates, and best practices delivered to
                your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <Input
                    id="customername"
                    name="customername"
                    type="text"
                    placeholder="Mr. Abc"
                    value={formData.customername}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                  <Textarea
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Feedback
                </Button>
              </form>
            </div>
            <div className="d-flex content-center m-4">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-3">
                {/* <Link
                  href="#"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Github className="h-6 w-6" />
                </Link> */}
                <Link
                  href="tel:+917708192049"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Phone className="h-6 w-6" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/in/ajithkumar-anandan-developer/`}
                  target="_blank"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ajithkumaranandandeveloper@gmail.com"
                  target="_blank"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Mail className="h-6 w-6" />
                </Link>
                <Link
                  href="/dashboard/crud"
                  locale={locale}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Globe className="h-6 w-6" />
                </Link>
                <a
                  href="/AjithkumarAnandan_Resume.pdf"
                  target="_blank"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <StickyNote className="h-6 w-6" />
                </a>
              </div>
              <p className="text-muted-foreground mt-6">
                Feel free to reach out through phone, email, LinkedIn, or my
                site.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainSection;
