"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AICoachMessage {
  id: string;
  message: string;
  sender: "user" | "ai";
  timestamp: string;
}

const AICoachPage: React.FC = () => {
  const router = useRouter();
  const [aiCoachMessage, setAiCoachMessage] = useState<string>("");
  const [aiCoachHistory, setAiCoachHistory] = useState<AICoachMessage[]>([
    {
      id: "1",
      message:
        "Hi there! I'm your AI Coach. I'm here to help you achieve your goals, provide motivation, and guide you through your journey. What would you like to work on today?",
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
          message: generateAIResponse(aiCoachMessage),
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

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("help") || message.includes("advice")) {
      return "I'd be happy to help! Here are some general tips for achieving your goals:\n\n1. Break down your goal into smaller, manageable tasks\n2. Set specific, measurable milestones\n3. Create a realistic timeline\n4. Track your progress regularly\n5. Stay accountable with regular check-ins\n\nWhat specific aspect would you like to explore further?";
    }

    if (message.includes("plan") || message.includes("strategy")) {
      return "Great question! Here's a strategic approach to goal achievement:\n\n**Phase 1: Planning (Week 1-2)**\n- Define clear objectives\n- Research best practices\n- Set up tracking systems\n\n**Phase 2: Execution (Week 3-8)**\n- Start with small steps\n- Build consistent habits\n- Monitor progress\n\n**Phase 3: Optimization (Week 9-12)**\n- Review and adjust\n- Celebrate milestones\n- Plan next steps\n\nWould you like me to help you break this down further for a specific goal?";
    }

    if (message.includes("motivation") || message.includes("stay motivated")) {
      return "Staying motivated is key! Here are some proven strategies:\n\n🎯 **Visualize Success**: Picture yourself achieving your goal\n📊 **Track Progress**: Use metrics to see your advancement\n🏆 **Celebrate Wins**: Acknowledge even small achievements\n👥 **Find Support**: Share your journey with others\n📝 **Daily Affirmations**: Remind yourself why this matters\n\nWhat specific aspect of motivation would you like to explore?";
    }

    if (message.includes("time") || message.includes("schedule")) {
      return "Time management is crucial! Here's a framework:\n\n⏰ **Morning Routine**: Start with your most important task\n📅 **Weekly Planning**: Set 3 main priorities each week\n🔄 **Time Blocking**: Dedicate specific time slots\n⚡ **Energy Management**: Work on complex tasks when you're most alert\n🛑 **Buffer Time**: Leave room for unexpected events\n\nWould you like help creating a specific schedule for your goals?";
    }

    if (message.includes("goal") || message.includes("objectives")) {
      return "Setting effective goals is fundamental! Here's the SMART framework:\n\n🎯 **Specific**: Make your goal clear and detailed\n📏 **Measurable**: Include metrics to track progress\n✅ **Achievable**: Ensure it's realistic for your situation\n🎯 **Relevant**: Align with your values and priorities\n⏰ **Time-bound**: Set a deadline for completion\n\nWould you like help applying this framework to a specific goal?";
    }

    return "That's an interesting question! I'm here to help you achieve your goals. Could you tell me more about what specific aspect you'd like guidance on? I can help with planning, motivation, time management, goal setting, or any other aspect of personal development.";
  };

  const handleBackToDashboard = () => {
    router.push("/");
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#121416] p-4">
        <div className="flex items-center gap-4 pt-6 px-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-[#a2abb3] hover:text-white transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex flex-col h-[calc(100vh-80px)] bg-[#121416]">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2c3035]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <clipPath id="__lottie_element_69_page">
                    <rect width="32" height="32" x="0" y="0"></rect>
                  </clipPath>
                  <g id="__lottie_element_76_page">
                    <g transform="matrix(-1,0,0,-1,16,16)" opacity="1">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          fill="url(#__lottie_element_79_page)"
                          fillOpacity="1"
                          d=" M0.027000000700354576,14 C0.47999998927116394,6.489999771118164 6.489999771118164,0.47999998927116394 14,0.027000000700354576 C14,0.027000000700354576 14,-0.027000000700354576 14,-0.027000000700354576 C6.489999771118164,-0.47999998927116394 0.47999998927116394,-6.489999771118164 0.027000000700354576,-14 C0.027000000700354576,-14 -0.027000000700354576,-14 -0.027000000700354576,-14 C-0.47999998927116394,-6.489999771118164 -6.489999771118164,-0.47999998927116394 -14,-0.027000000700354576 C-14,-0.027000000700354576 -14,0.027000000700354576 -14,0.027000000700354576 C-6.489999771118164,0.47999998927116394 -0.47999998927116394,6.489999771118164 -0.027000000700354576,14 C-0.027000000700354576,14 0.027000000700354576,14 0.027000000700354576,14z"
                        ></path>
                      </g>
                    </g>
                  </g>
                  <linearGradient
                    id="__lottie_element_79_page"
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
                    id="__lottie_element_83_page"
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
                    id="__lottie_element_76_1_page"
                    maskUnits="objectBoundingBox"
                  >
                    <use xlinkHref="#__lottie_element_76_page"></use>
                  </mask>
                </defs>
                <g clipPath="url(#__lottie_element_69_page)">
                  <g mask="url(#__lottie_element_76_1_page)">
                    <g transform="matrix(1,0,0,1,16,16)" opacity="1">
                      <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                        <path
                          fill="url(#__lottie_element_83_page)"
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
              <h1 className="text-white text-xl font-bold">AI Coach</h1>
              <p className="text-[#a2abb3] text-sm">Online - Ready to help</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {aiCoachHistory.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                      width="20"
                      height="20"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <defs>
                        <clipPath id="__lottie_element_69_message_page">
                          <rect width="32" height="32" x="0" y="0"></rect>
                        </clipPath>
                        <g id="__lottie_element_76_message_page">
                          <g transform="matrix(-1,0,0,-1,16,16)" opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                              <path
                                fill="url(#__lottie_element_79_message_page)"
                                fillOpacity="1"
                                d=" M0.027000000700354576,14 C0.47999998927116394,6.489999771118164 6.489999771118164,0.47999998927116394 14,0.027000000700354576 C14,0.027000000700354576 14,-0.027000000700354576 14,-0.027000000700354576 C6.489999771118164,-0.47999998927116394 0.47999998927116394,-6.489999771118164 0.027000000700354576,-14 C0.027000000700354576,-14 -0.027000000700354576,-14 -0.027000000700354576,-14 C-0.47999998927116394,-6.489999771118164 -6.489999771118164,-0.47999998927116394 -14,-0.027000000700354576 C-14,-0.027000000700354576 -14,0.027000000700354576 -14,0.027000000700354576 C-6.489999771118164,0.47999998927116394 -0.47999998927116394,6.489999771118164 -0.027000000700354576,14 C-0.027000000700354576,14 0.027000000700354576,14 0.027000000700354576,14z"
                              ></path>
                            </g>
                          </g>
                        </g>
                        <linearGradient
                          id="__lottie_element_79_message_page"
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
                          id="__lottie_element_83_message_page"
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
                          id="__lottie_element_76_1_message_page"
                          maskUnits="objectBoundingBox"
                        >
                          <use xlinkHref="#__lottie_element_76_message_page"></use>
                        </mask>
                      </defs>
                      <g clipPath="url(#__lottie_element_69_message_page)">
                        <g mask="url(#__lottie_element_76_1_message_page)">
                          <g transform="matrix(1,0,0,1,16,16)" opacity="1">
                            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                              <path
                                fill="url(#__lottie_element_83_message_page)"
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
                  className={`flex flex-col gap-2 max-w-2xl ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#a2abb3] text-xs">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={`text-base rounded-xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-[#3f7fbf] text-white"
                        : "bg-[#2c3035] text-white"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.message}</p>
                  </div>
                </div>

                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-[#a2abb3] flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
        </div>

        {/* Input Area */}
        <div className="border-t border-[#2c3035] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Ask your AI coach anything..."
                value={aiCoachMessage}
                onChange={(e) => handleAiCoachChange(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAskAiCoach()}
                className="flex-1 bg-[#2c3035] text-white rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-[#3f7fbf]"
              />
              <button
                onClick={handleAskAiCoach}
                className="bg-[#3f7fbf] text-white rounded-xl px-6 py-3 text-base font-medium hover:bg-[#2d5f8f] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AICoachPage; 