import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

// Profile Section
const Profile = () => {
  const t = useTranslations("siteowner");
  return (
    <section
      id="profile"
      className="max-w-4xl mx-auto mb-12 mt-2 p-6 bg-white rounded-lg shadow-md space-y-3"
    >
      <h2 className="text-3xl font-bold mb-4">{t("profile.title")}</h2>
      <p>
        <span className="font-semibold">{t("profile.name")}:</span> AJITHKUMAR
      </p>
      <p>
        <span className="font-semibold">{t("profile.dob")}:</span> 05/06/1996
      </p>
      <p>
        <span className="font-semibold">{t("profile.qualification")}:</span>{" "}
        Bachelor of Engineering (B.E)
      </p>
      <p>
        <span className="font-semibold">{t("profile.about")}:</span>{" "}
        {t("profile.aboutText")}
      </p>
    </section>
  );
};

// Experience Section
const Experience = () => {
  const t = useTranslations("siteowner");

  return (
    <section
      id="experience"
      className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold mb-6">{t("experience.title")}</h2>
      <ul className="space-y-4 list-disc pl-5">
        <li className="text-gray-700">{t("experience.experience1")}</li>
        <li className="text-gray-700">{t("experience.experience2")}</li>
        <li className="text-gray-700">{t("experience.experience3")}</li>
        <li className="text-gray-700">{t("experience.experience4")}</li>
      </ul>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const t = useTranslations("siteowner");

  return (
    <section
      id="skills"
      className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold mb-6">{t("skills.title")}</h2>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.frontEndFrameworksTitle")}
          </label>
          <p className="text-gray-700">{t("skills.frontEndFrameworks")}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.programmingLanguagesTitle")}
          </label>
          <p className="text-gray-700">{t("skills.programmingLanguages")}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.reactFeaturesTitle")}
          </label>
          <p className="text-gray-700 text-wrap">{t("skills.reactFeatures")}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.stateManagementTitle")}
          </label>
          <p className="text-gray-700">{t("skills.stateManagement")}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.UILibraries&ToolsTitle")}
          </label>
          <p className="text-gray-700 whitespace-normal break-words">
            {t("skills.UILibraries&Tools")}
          </p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.webDevelopmentTitle")}
          </label>
          <span className="text-gray-700 whitespace-normal break-words">
            {t("skills.webDevelopment")}
          </span>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.development&DebuggingTitle")}
          </label>
          <p className="text-gray-700">{t("skills.development&Debugging")}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.softwareDevelopmentPracticesTitle")}
          </label>
          <p className="text-gray-700">
            {t("skills.softwareDevelopmentPractices")}
          </p>
        </div>

        <div className="flex flex-col">
          <label className="text-xl font-semibold w-80">
            {t("skills.APIDevelopmentTitle")}
          </label>
          <p className="text-gray-700">{t("skills.APIDevelopment")}</p>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const t = useTranslations("siteowner");
  return (
    <section
      id="contact"
      className="max-w-4xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold mb-4">{t("contact.title")}</h2>
      <Link
        href={`mailto:${t("contact.emailAddress")}`}
        target="_blank"
        className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors"
      >
        <p>
          <span className="font-semibold">{t("contact.email")}:</span>{" "}
          {t("contact.emailAddress")}
        </p>
      </Link>
      <Link
        href={`tel:${t("contact.phoneNumber")}`}
        className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent transition-colors"
      >
        <p>
          <span className="font-semibold">{t("contact.phone")}:</span>{" "}
          {t("contact.phoneNumber")}
        </p>
      </Link>
    </section>
  );
};

// Main Page
const Page = () => {
  const t = useTranslations("siteowner");
  return (
    <div className="min-h-screen">
      {/* Navbar could be added here */}
      <header className="w-full text-center py-20 bg-cyan-50">
        <div className="flex mx-6 justify-center gap-4">
          <img
            src="/myself.png"
            width={100}
            height={100}
            alt="self img"
            className="mr-6"
          />
          <span className="justify-center">
            <h1 className="text-5xl font-bold mb-4">{t("header.name")}</h1>
            <p className="text-xl">{t("header.role")}</p>
          </span>
        </div>
      </header>

      <Profile />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
};

export default Page;
