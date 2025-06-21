"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    reminders: true,
    weeklyReports: true,
  });
  const [preferences, setPreferences] = useState({
    theme: "dark",
    language: "en",
    timezone: "UTC",
  });
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Goal-oriented individual focused on personal growth and achievement.",
  });

  const handleBackToDashboard = () => {
    router.push("/");
  };

  const handleSaveProfile = () => {
    // Handle profile save logic
    console.log("Profile saved:", profile);
  };

  const handleSaveNotifications = () => {
    // Handle notifications save logic
    console.log("Notifications saved:", notifications);
  };

  const handleSavePreferences = () => {
    // Handle preferences save logic
    console.log("Preferences saved:", preferences);
  };

  return (
    <div className="min-h-screen bg-[#121416]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#121416] border-[#2c3035] p-4">
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

      {/* Main Content */}
      <div className="mx-auto max-w-7xl gap-1 px-6 flex flex-1 justify-center py-5 bg-[#121416]">
        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-col px-4">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
              Settings
            </p>

            <div className="flex gap-4 py-3">
              {/* Left Half - Profile and Notifications */}
              <div className="flex flex-col flex-1 space-y-3">
                {/* Profile Section */}
                <div className="space-y-3">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                    Profile
                  </p>
                  
                  <label className="flex flex-col flex-1">
                    <p className="text-[#e2e8f0] text-base font-medium leading-normal pb-2">
                      Full Name
                    </p>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full bg-[#2c3035] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f7fbf] border border-[#404550] h-14 placeholder:text-[#a2abb3] text-base font-normal leading-normal"
                      placeholder="Enter your full name"
                    />
                  </label>

                  <label className="flex flex-col flex-1">
                    <p className="text-[#e2e8f0] text-base font-medium leading-normal pb-2">
                      Email Address
                    </p>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full bg-[#2c3035] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f7fbf] border border-[#404550] h-14 placeholder:text-[#a2abb3] text-base font-normal leading-normal"
                      placeholder="Enter your email address"
                    />
                  </label>

                  <label className="flex flex-col w-full">
                    <p className="text-[#e2e8f0] text-base font-medium leading-normal pb-2">
                      Bio
                    </p>
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-[#2c3035] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f7fbf] border border-[#404550] resize-none placeholder:text-[#a2abb3] text-base font-normal leading-normal"
                      placeholder="Tell us about yourself"
                    />
                  </label>

                  <div className="flex pt-3">
                    <button
                      onClick={handleSaveProfile}
                      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-gradient-to-r from-[#3f7fbf] to-[#2d5f8f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#2d5f8f] hover:to-[#1e4a7a] transition-all duration-200 shadow-lg"
                    >
                      <span className="truncate">Save Profile</span>
                    </button>
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="space-y-3">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                    Notifications
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-[#2c3035] rounded-xl p-3 border border-[#404550]">
                      <div>
                        <p className="text-white text-base font-medium leading-normal">
                          Email Notifications
                        </p>
                        <p className="text-[#a2abb3] text-sm">
                          Receive updates via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              email: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#404550] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3f7fbf]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between bg-[#2c3035] rounded-xl p-3 border border-[#404550]">
                      <div>
                        <p className="text-white text-base font-medium leading-normal">
                          Push Notifications
                        </p>
                        <p className="text-[#a2abb3] text-sm">
                          Get instant notifications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              push: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#404550] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3f7fbf]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between bg-[#2c3035] rounded-xl p-3 border border-[#404550]">
                      <div>
                        <p className="text-white text-base font-medium leading-normal">
                          Goal Reminders
                        </p>
                        <p className="text-[#a2abb3] text-sm">
                          Daily reminders for your goals
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.reminders}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              reminders: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#404550] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3f7fbf]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between bg-[#2c3035] rounded-xl p-3 border border-[#404550]">
                      <div>
                        <p className="text-white text-base font-medium leading-normal">
                          Weekly Reports
                        </p>
                        <p className="text-[#a2abb3] text-sm">
                          Receive weekly progress summaries
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReports}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              weeklyReports: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#404550] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3f7fbf]"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex pt-3">
                    <button
                      onClick={handleSaveNotifications}
                      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-gradient-to-r from-[#3f7fbf] to-[#2d5f8f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#2d5f8f] hover:to-[#1e4a7a] transition-all duration-200 shadow-lg"
                    >
                      <span className="truncate">Save Notifications</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Half - Preferences and Account */}
              <div className="flex flex-col flex-1 space-y-3">
                {/* Preferences Section */}
                <div className="space-y-3">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                    Preferences
                  </p>
                  
                  <label className="flex flex-col flex-1">
                    <p className="text-[#e2e8f0] text-base font-medium leading-normal pb-2">
                      Theme
                    </p>
                    <select
                      value={preferences.theme}
                      onChange={(e) =>
                        setPreferences({ ...preferences, theme: e.target.value })
                      }
                      className="w-full bg-[#2c3035] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f7fbf] border border-[#404550] h-14 placeholder:text-[#a2abb3] text-base font-normal leading-normal"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </label>

                  <label className="flex flex-col flex-1">
                    <p className="text-[#e2e8f0] text-base font-medium leading-normal pb-2">
                      Language
                    </p>
                    <select
                      value={preferences.language}
                      onChange={(e) =>
                        setPreferences({ ...preferences, language: e.target.value })
                      }
                      className="w-full bg-[#2c3035] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f7fbf] border border-[#404550] h-14 placeholder:text-[#a2abb3] text-base font-normal leading-normal"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </label>

                  <label className="flex flex-col flex-1">
                    <p className="text-[#e2e8f0] text-base font-medium leading-normal pb-2">
                      Timezone
                    </p>
                    <select
                      value={preferences.timezone}
                      onChange={(e) =>
                        setPreferences({ ...preferences, timezone: e.target.value })
                      }
                      className="w-full bg-[#2c3035] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f7fbf] border border-[#404550] h-14 placeholder:text-[#a2abb3] text-base font-normal leading-normal"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </label>

                  <div className="flex pt-3">
                    <button
                      onClick={handleSavePreferences}
                      className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-gradient-to-r from-[#3f7fbf] to-[#2d5f8f] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:from-[#2d5f8f] hover:to-[#1e4a7a] transition-all duration-200 shadow-lg"
                    >
                      <span className="truncate">Save Preferences</span>
                    </button>
                  </div>
                </div>

                {/* Account Section */}
                <div className="space-y-3">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                    Account
                  </p>
                  
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-[#2c3035] rounded-xl hover:bg-[#3a3f45] transition-colors border border-[#404550]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-base font-medium leading-normal">
                            Change Password
                          </p>
                          <p className="text-[#a2abb3] text-sm">
                            Update your account password
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="text-[#a2abb3]"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                        </svg>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 bg-[#2c3035] rounded-xl hover:bg-[#3a3f45] transition-colors border border-[#404550]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-base font-medium leading-normal">
                            Export Data
                          </p>
                          <p className="text-[#a2abb3] text-sm">
                            Download your goals and progress data
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="text-[#a2abb3]"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                        </svg>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 bg-[#2c3035] rounded-xl hover:bg-[#3a3f45] transition-colors border border-[#404550]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-base font-medium leading-normal">
                            Privacy Settings
                          </p>
                          <p className="text-[#a2abb3] text-sm">
                            Manage your privacy and data settings
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="text-[#a2abb3]"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                        </svg>
                      </div>
                    </button>

                    <button className="w-full text-left p-3 bg-red-900/20 border border-red-500/50 rounded-xl hover:bg-red-900/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-400 text-base font-medium leading-normal">
                            Delete Account
                          </p>
                          <p className="text-red-300 text-sm">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="text-red-400"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 