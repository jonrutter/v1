import React from 'react';
import clsx from 'clsx';

type Props = {
  title: React.ReactNode;
};

/**
 * Renders a page's hero section.
 */
export const Hero: React.FC<Props> = ({ title, children }) => (
  <>
    {/* outer wrapper: bg color, padding, full-width */}
    <div
      className={clsx(
        'pt-12 pb-[calc(112px_+_1rem)]  md:pb-[calc(112px_+_3rem)] px-6 md:pt-24 md:px-12  bg-white dark:bg-slate-800 text-base sm:text-lg lg:flex lg:items-center relative '
      )}
    >
      {/* inner wrapper: flex container for inner alignment, content max width, centered */}
      <div
        className={clsx(
          'max-w-site-sm md:max-w-site-md lg:max-w-site-lg mx-auto relative'
        )}
      >
        {/* background svgs */}
        <div className="aurora-lg absolute bottom-0 left-0 hidden xl:block scale-90 2xl:scale-100 -translate-x-[120%] opacity-10 " />
        <div className="aurora-md absolute top-0 right-0 hidden xl:block scale-90 2xl:scale-100 translate-x-[120%] -translate-y-2/3 opacity-10 " />
        <div className="star-decoration absolute top-0 left-0 hidden md:block md:-translate-y-24 md:-translate-x-16 opacity-10 xl:-translate-x-60 xl:-translate-y-8" />
        <div className="star-decoration absolute bottom-0 right-0 hidden md:block md:translate-y-16 md:translate-x-8 opacity-10 xl:translate-x-40 xl:translate-y-8" />

        <div className="w-full max-w-prose">
          {/* hero content */}
          <div className="mb-6 md:mb-8 relative inline-block z-10">
            <h1
              className={clsx(
                'font-heading font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white bg-transparent'
              )}
            >
              {title}
            </h1>
            <div className="shine" />
          </div>
          {/* everything that should appear below the heading */}
          {children}
        </div>
      </div>
      {/* divider */}
      <svg
        width="1920"
        height="112"
        viewBox="0 0 1920 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute bottom-0 right-0 left-0 xl:w-full"
      >
        <g clipPath="url(#clip0_1010_2364)">
          <path
            d="M1920 0H0V112H1920V0Z"
            className="fill-slate-100 dark:fill-slate-900"
          />
          <path
            d="M0 61L22.8 66.5C45.7 72 91.3 83 137 86.2C182.7 89.3 228.3 84.7 274 84.3C319.7 84 365.3 88 411.2 88.2C457 88.3 503 84.7 548.8 78.5C594.7 72.3 640.3 63.7 686 65.2C731.7 66.7 777.3 78.3 823 87.3C868.7 96.3 914.3 102.7 960 106.5C1005.7 110.3 1051.3 111.7 1097 107.3C1142.7 103 1188.3 93 1234 84.7C1279.7 76.3 1325.3 69.7 1371.2 73C1417 76.3 1463 89.7 1508.8 95C1554.7 100.3 1600.3 97.7 1646 90.2C1691.7 82.7 1737.3 70.3 1783 66.2C1828.7 62 1874.3 66 1897.2 68L1920 70V0H1897.2C1874.3 0 1828.7 0 1783 0C1737.3 0 1691.7 0 1646 0C1600.3 0 1554.7 0 1508.8 0C1463 0 1417 0 1371.2 0C1325.3 0 1279.7 0 1234 0C1188.3 0 1142.7 0 1097 0C1051.3 0 1005.7 0 960 0C914.3 0 868.7 0 823 0C777.3 0 731.7 0 686 0C640.3 0 594.7 0 548.8 0C503 0 457 0 411.2 0C365.3 0 319.7 0 274 0C228.3 0 182.7 0 137 0C91.3 0 45.7 0 22.8 0H0V61Z"
            className="fill-white dark:fill-slate-800"
          />
        </g>
        <defs>
          <clipPath id="clip0_1010_2364">
            <rect width="1920" height="112" className="fill-white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  </>
);
