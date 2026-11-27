import React from "react";

function About() {
  return (
    <section
      id="about"
      className="flex min-h-[70vh] items-center justify-center bg-background px-6 py-12 sm:py-16 md:px-16 lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <div className="max-w-3xl">
          <p className="mb-5 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-primary/60">
            <span
              className="h-1 w-8 rounded-full bg-accent"
              aria-hidden="true"
            />
            About KICKHOUSE
          </p>

          <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.05em] text-primary sm:text-5xl lg:text-6xl">
            Good sneakers make every day a little better.
          </h2>

          <p className="mt-7 text-base leading-7 text-primary/70 sm:text-lg sm:leading-8">
            KICKHOUSE is for the pairs you reach for without thinking: easy to
            wear, full of character, and ready to go wherever the day takes you.
            We bring together fresh drops and familiar favorites so finding your
            next pair feels simple.
          </p>

          <p className="mt-4 text-base leading-7 text-primary/70 sm:text-lg sm:leading-8">
            From the first step out the door to the long way home, find a look
            that feels like yours.
          </p>

          
        </div>
      </div>
    </section>
  );
}

export default About;
