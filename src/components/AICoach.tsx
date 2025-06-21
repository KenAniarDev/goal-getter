"use client";

import React, { useState } from "react";

interface AICoachMessage {
  id: string;
  message: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface AICoachProps {
  formData?: any; // Pass form data for context-aware responses
  isDefaultOpen?: boolean; // Optional prop to control initial open state
}

const AICoach: React.FC<AICoachProps> = ({
  formData,
  isDefaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [aiCoachMessage, setAiCoachMessage] = useState<string>("");
  const [aiCoachHistory, setAiCoachHistory] = useState<AICoachMessage[]>([
    {
      id: "1",
      message:
        "Hi there! I'm here to help you plan your goal. Please provide the goal title, description, target date, and category.",
      sender: "ai",
      timestamp: "10:30 AM",
    },
  ]);

  const handleAiCoachChange = (value: string) => {
    setAiCoachMessage(value);
  };

  const handleAskAiCoach = () => {
    if (aiCoachMessage.trim()) {
      const newUserMessage: AICoachMessage = {
        id: Date.now().toString(),
        message: aiCoachMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setAiCoachHistory((prev) => [...prev, newUserMessage]);
      setAiCoachMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: AICoachMessage = {
          id: (Date.now() + 1).toString(),
          message: generateAIResponse(aiCoachMessage, formData),
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setAiCoachHistory((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const generateAIResponse = (userMessage: string, formData: any): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("help") || message.includes("advice")) {
      return "I'd be happy to help! Based on your goal, here are some tips:\n\n1. Break down your goal into smaller, manageable tasks\n2. Set specific, measurable milestones\n3. Create a realistic timeline\n4. Track your progress regularly\n5. Stay accountable with regular check-ins\n\nWould you like me to help you create a specific plan for your goal?";
    }

    if (message.includes("plan") || message.includes("strategy")) {
      return "Great question! Here's a strategic approach:\n\n**Phase 1: Planning (Week 1-2)**\n- Define clear objectives\n- Research best practices\n- Set up tracking systems\n\n**Phase 2: Execution (Week 3-8)**\n- Start with small steps\n- Build consistent habits\n- Monitor progress\n\n**Phase 3: Optimization (Week 9-12)**\n- Review and adjust\n- Celebrate milestones\n- Plan next steps\n\nWould you like me to help you break this down further?";
    }

    if (message.includes("motivation") || message.includes("stay motivated")) {
      return "Staying motivated is key! Here are some proven strategies:\n\n🎯 **Visualize Success**: Picture yourself achieving your goal\n📊 **Track Progress**: Use metrics to see your advancement\n🏆 **Celebrate Wins**: Acknowledge even small achievements\n👥 **Find Support**: Share your journey with others\n📝 **Daily Affirmations**: Remind yourself why this matters\n\nWhat specific aspect of motivation would you like to explore?";
    }

    if (message.includes("time") || message.includes("schedule")) {
      return "Time management is crucial! Here's a framework:\n\n⏰ **Morning Routine**: Start with your most important task\n📅 **Weekly Planning**: Set 3 main priorities each week\n🔄 **Time Blocking**: Dedicate specific time slots\n⚡ **Energy Management**: Work on complex tasks when you're most alert\n🛑 **Buffer Time**: Leave room for unexpected events\n\nWould you like help creating a specific schedule for your goal?";
    }

    return "That's an interesting question! I'm here to help you achieve your goals. Could you tell me more about what specific aspect you'd like guidance on? I can help with planning, motivation, time management, or any other aspect of goal achievement.";
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Popup */}
      {isOpen && (
        <div className="mb-4 bg-[#1a1d21] border border-[#2c3035] rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#2c3035]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  width="16"
                  height="16"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <clipPath id="__lottie_element_69_header">
                      <rect width="32" height="32" x="0" y="0"></rect>
                    </clipPath>
                    <g id="__lottie_element_76_header">
                      <g transform="matrix(-1,0,0,-1,16,16)" opacity="1">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            fill="url(#__lottie_element_79_header)"
                            fillOpacity="1"
                            d=" M0.027000000700354576,14 C0.47999998927116394,6.489999771118164 6.489999771118164,0.47999998927116394 14,0.027000000700354576 C14,0.027000000700354576 14,-0.027000000700354576 14,-0.027000000700354576 C6.489999771118164,-0.47999998927116394 0.47999998927116394,-6.489999771118164 0.027000000700354576,-14 C0.027000000700354576,-14 -0.027000000700354576,-14 -0.027000000700354576,-14 C-0.47999998927116394,-6.489999771118164 -6.489999771118164,-0.47999998927116394 -14,-0.027000000700354576 C-14,-0.027000000700354576 -14,0.027000000700354576 -14,0.027000000700354576 C-6.489999771118164,0.47999998927116394 -0.47999998927116394,6.489999771118164 -0.027000000700354576,14 C-0.027000000700354576,14 0.027000000700354576,14 0.027000000700354576,14z"
                          ></path>
                        </g>
                      </g>
                    </g>
                    <linearGradient
                      id="__lottie_element_79_header"
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
                      id="__lottie_element_83_header"
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
                      id="__lottie_element_76_1_header"
                      maskUnits="objectBoundingBox"
                    >
                      <use xlinkHref="#__lottie_element_76_header"></use>
                    </mask>
                  </defs>
                  <g clipPath="url(#__lottie_element_69_header)">
                    <g mask="url(#__lottie_element_76_1_header)">
                      <g transform="matrix(1,0,0,1,16,16)" opacity="1">
                        <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                          <path
                            fill="url(#__lottie_element_83_header)"
                            fillOpacity="1"
                            d=" M0,-16 C8.830400466918945,-16 16,-8.830400466918945 16,0 C16,8.830400466918945 8.830400466918945,16 0,16 C-8.830400466918945,16 -16,8.830400466918945 -16,0 C-16,-8.830400466918945 -8.830400466918945,-16 0,-16z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Coach</h3>
                <p className="text-[#a2abb3] text-sm">Online</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-[#a2abb3] hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {aiCoachHistory.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                      width="16"
                      height="16"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <clipPath id="__lottie_element_69_message">
                          <rect width="32" height="32" x="0" y="0"></rect>
                        </clipPath>
                        <g id="__lottie_element_76_message">
                          <g transform="matrix(-1,0,0,-1,16,16)" opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                              <path
                                fill="url(#__lottie_element_79_message)"
                                fillOpacity="1"
                                d=" M0.027000000700354576,14 C0.47999998927116394,6.489999771118164 6.489999771118164,0.47999998927116394 14,0.027000000700354576 C14,0.027000000700354576 14,-0.027000000700354576 14,-0.027000000700354576 C6.489999771118164,-0.47999998927116394 0.47999998927116394,-6.489999771118164 0.027000000700354576,-14 C0.027000000700354576,-14 -0.027000000700354576,-14 -0.027000000700354576,-14 C-0.47999998927116394,-6.489999771118164 -6.489999771118164,-0.47999998927116394 -14,-0.027000000700354576 C-14,-0.027000000700354576 -14,0.027000000700354576 -14,0.027000000700354576 C-6.489999771118164,0.47999998927116394 -0.47999998927116394,6.489999771118164 -0.027000000700354576,14 C-0.027000000700354576,14 0.027000000700354576,14 0.027000000700354576,14z"
                              ></path>
                            </g>
                          </g>
                        </g>
                        <linearGradient
                          id="__lottie_element_79_message"
                          spreadMethod="pad"
                          gradientUnits="userSpaceOnUse"
                          x1="-9.222999572753906"
                          y1="8.489999771118164"
                          x2="10.461999893188477"
                          y2="-8.211999893188477"
                        >
                          <stop offset="0%" stopColor="rgb(255,255,255)"></stop>
                          <stop
                            offset="14%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="27%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="52%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="78%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="89%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                        </linearGradient>
                        <linearGradient
                          id="__lottie_element_83_message"
                          spreadMethod="pad"
                          gradientUnits="userSpaceOnUse"
                          x1="-4.002999782562256"
                          y1="4.630000114440918"
                          x2="8.092000007629395"
                          y2="-7.886000156402588"
                        >
                          <stop offset="0%" stopColor="rgb(255,255,255)"></stop>
                          <stop
                            offset="14%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="27%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="52%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="78%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="89%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="rgb(255,255,255)"
                          ></stop>
                        </linearGradient>
                        <mask
                          id="__lottie_element_76_1_message"
                          maskUnits="objectBoundingBox"
                        >
                          <use xlinkHref="#__lottie_element_76_message"></use>
                        </mask>
                      </defs>
                      <g clipPath="url(#__lottie_element_69_message)">
                        <g mask="url(#__lottie_element_76_1_message)">
                          <g transform="matrix(1,0,0,1,16,16)" opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                              <path
                                fill="url(#__lottie_element_83_message)"
                                fillOpacity="1"
                                d=" M0,-16 C8.830400466918945,-16 16,-8.830400466918945 16,0 C16,8.830400466918945 8.830400466918945,16 0,16 C-8.830400466918945,16 -16,8.830400466918945 -16,0 C-16,-8.830400466918945 -8.830400466918945,-16 0,-16z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                )}

                <div
                  className={`flex flex-col gap-1 max-w-[280px] ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#a2abb3] text-xs">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={`text-sm rounded-xl px-3 py-2 ${
                      message.sender === "user"
                        ? "bg-[#3f7fbf] text-white"
                        : "bg-[#2c3035] text-white"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.message}</p>
                  </div>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-[#a2abb3] flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      viewBox="0 0 256 256"
                    >
                      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#2c3035]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask AI Coach for help..."
                value={aiCoachMessage}
                onChange={(e) => handleAiCoachChange(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAskAiCoach()}
                className="flex-1 bg-[#2c3035] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3f7fbf]"
              />
              <button
                onClick={handleAskAiCoach}
                className="bg-[#3f7fbf] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#2d5f8f] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`ml-auto w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-[#3f7fbf] shadow-[#3f7fbf]/50"
            : "bg-gradient-to-br from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700"
        } flex items-center justify-center`}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 256 256"
          >
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        ) : (
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
              <mask id="__lottie_element_76_1" maskUnits="objectBoundingBox">
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
        )}
      </button>
    </div>
  );
};

export default AICoach;
