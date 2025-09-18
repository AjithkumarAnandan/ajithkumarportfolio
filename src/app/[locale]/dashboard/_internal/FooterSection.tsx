import React from "react";

function FooterSection() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">ReactJS</span>
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Tutorials
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Blog
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            GitHub
          </a>
        </div>
      </div> */}
      <div className="border-border text-center">
        <p className="text-sm text-muted-foreground font-bold  dark:text-white ">
          © 2025 ReactJS. Built with React and love by developers worldwide.
        </p>
      </div>
    </div>
  );
}

export default FooterSection;
