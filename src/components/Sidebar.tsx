"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AICoach from "./AICoach";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <div className="flex h-screen bg-[#121416] dark overflow-hidden p-2">
        {/* Fixed Sidebar */}
        <div className="w-80 flex-shrink-0 bg-[#121416] p-4 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-base font-medium leading-normal">
              Goal Getter
            </h1>
            <div className="flex flex-col gap-2">
              {/* Navigation Items */}
              <Link
                href="/"
                className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                  isActive("/")
                    ? "bg-[#2c3035]"
                    : "hover:bg-[#2c3035]"
                }`}
              >
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-medium leading-normal">
                  Home
                </p>
              </Link>

              <Link
                href="/goals"
                className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                  isActive("/goals")
                    ? "bg-[#2c3035]"
                    : "hover:bg-[#2c3035]"
                }`}
              >
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-medium leading-normal">
                  Goals
                </p>
              </Link>

              <Link 
                href="/ai-coach"
                className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                  isActive("/ai-coach")
                    ? "bg-[#2c3035]"
                    : "hover:bg-[#2c3035]"
                }`}
              >
                <div className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <clipPath id="__lottie_element_69">
                        <rect width="32" height="32" x="0" y="0"></rect>
                      </clipPath>
                      <g id="__lottie_element_76">
                        <g transform="matrix(-1,0,0,-1,16,16)" opacity="1">
                          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                            <path
                              fill="url(#__lottie_element_79)"
                              fillOpacity="1"
                              d=" M0.027000000700354576,14 C0.47999998927116394,6.489999771118164 6.489999771118164,0.47999998927116394 14,0.027000000700354576 C14,0.027000000700354576 14,-0.027000000700354576 14,-0.027000000700354576 C6.489999771118164,-0.47999998927116394 0.47999998927116394,-6.489999771118164 0.027000000700354576,-14 C0.027000000700354576,-14 -0.027000000700354576,-14 -0.027000000700354576,-14 C-0.47999998927116394,-6.489999771118164 -6.489999771118164,-0.47999998927116394 -14,-0.027000000700354576 C-14,-0.027000000700354576 -14,0.027000000700354576 -14,0.027000000700354576 C-6.489999771118164,0.47999998927116394 -0.47999998927116394,6.489999771118164 -0.027000000700354576,14 C-0.027000000700354576,14 0.027000000700354576,14 0.027000000700354576,14z"
                            ></path>
                          </g>
                        </g>
                      </g>
                      <linearGradient
                        id="__lottie_element_79"
                        spreadMethod="pad"
                        gradientUnits="userSpaceOnUse"
                        x1="-9.222999572753906"
                        y1="8.489999771118164"
                        x2="10.461999893188477"
                        y2="-8.211999893188477"
                      >
                        <stop offset="0%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="14%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="27%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="52%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="78%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="89%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="100%" stopColor="rgb(255,255,255)"></stop>
                      </linearGradient>
                      <linearGradient
                        id="__lottie_element_83"
                        spreadMethod="pad"
                        gradientUnits="userSpaceOnUse"
                        x1="-4.002999782562256"
                        y1="4.630000114440918"
                        x2="8.092000007629395"
                        y2="-7.886000156402588"
                      >
                        <stop offset="0%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="14%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="27%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="52%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="78%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="89%" stopColor="rgb(255,255,255)"></stop>
                        <stop offset="100%" stopColor="rgb(255,255,255)"></stop>
                      </linearGradient>
                      <mask
                        id="__lottie_element_76_1"
                        maskUnits="objectBoundingBox"
                      >
                        <use xlinkHref="#__lottie_element_76"></use>
                      </mask>
                    </defs>
                    <g clipPath="url(#__lottie_element_69)">
                      <g mask="url(#__lottie_element_76_1)">
                        <g transform="matrix(1,0,0,1,16,16)" opacity="1">
                          <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                            <path
                              fill="url(#__lottie_element_83)"
                              fillOpacity="1"
                              d=" M0,-16 C8.830400466918945,-16 16,-8.830400466918945 16,0 C16,8.830400466918945 8.830400466918945,16 0,16 C-8.830400466918945,16 -16,8.830400466918945 -16,0 C-16,-8.830400466918945 -8.830400466918945,-16 0,-16z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <p className="text-white text-sm font-medium leading-normal">
                  AI Coach
                </p>
              </Link>

              <div className="flex flex-col gap-1">
                <Link 
                  href="/settings"
                  className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                    isActive("/settings")
                      ? "bg-[#2c3035]"
                      : "hover:bg-[#2c3035]"
                  }`}
                >
                  <div className="text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">
                    Settings
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="flex flex-col gap-1">
            <Link
              href="/pricing"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#3f7fbf] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2d5f8f] transition-colors"
            >
              <span className="truncate">Upgrade Plan</span>
            </Link>
            <div className="text-center">
              <p className="text-[#a2abb3] text-xs font-normal leading-normal">
                Unlock pro features with our premium plan
              </p>
              <p className="text-[#a2abb3] text-xs font-normal leading-normal mt-1">
                We only accept Stripe as payment provider
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>

      <AICoach />
    </>
  );
};

export default Sidebar;
