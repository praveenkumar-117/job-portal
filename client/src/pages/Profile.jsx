import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { MdOutlineCameraAlt } from "react-icons/md";

const Profile = () => {
  const { backendUrl, user, setUser } = useContext(AppContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [image, setImage] = useState(null);
  const [resume, setResume] = useState(null);

  // AppContext se user information aane ke baad form fields ko update karne ke liye
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Job seeker ki updated profile information backend API ko bhejne ke liye
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("Please login to update your profile");
      return;
    }

    // Profile name ko submit karne se pehle valid input check karne ke liye
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Please enter your full name");
      return;
    }

    if (trimmedName.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(trimmedName)) {
      toast.error("Name can contain only letters and spaces");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/user/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
          name: trimmedName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Updated user information ko global state aur sessionStorage me save karne ke liye
        setUser(data.user);
        sessionStorage.setItem("userData", JSON.stringify(data.user));

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Profile update error:", error);
      toast.error("Unable to connect with server");
    }
  };

  // Job seeker ki selected profile photo ko select hote hi backend par upload karne ke liye
  const onImageUpload = async (selectedImage) => {
    if (!selectedImage) return;

    try {
      const formData = new FormData();

      formData.append("image", selectedImage);

      const response = await fetch(`${backendUrl}/api/user/update-image`, {
        method: "POST",
        headers: {
          token: sessionStorage.getItem("userToken"),
        },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        // Updated profile information ko global state aur sessionStorage me save karne ke liye
        setUser(data.user);
        sessionStorage.setItem("userData", JSON.stringify(data.user));
        setImage(null);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Profile image upload error:", error);
      toast.error("Unable to upload profile photo");
    }
  };

  // Job seeker ke selected resume ko backend par automatically upload karne ke liye
  const onResumeUpload = async (selectedResume) => {
    if (!selectedResume) return;

    try {
      const formData = new FormData();

      formData.append("resume", selectedResume);

      const response = await fetch(`${backendUrl}/api/user/update-resume`, {
        method: "POST",
        headers: {
          token: sessionStorage.getItem("userToken"),
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Updated resume information ko global state aur sessionStorage me save karne ke liye
        setUser(data.user);
        sessionStorage.setItem("userData", JSON.stringify(data.user));

        setResume(null);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Resume upload error:", error);
      toast.error("Unable to upload resume");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-300 dark:bg-black py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Profile page ka main heading section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your personal information and resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Job seeker ka profile summary show karne ke liye */}
            <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-400 dark:from-green-500 dark:via-emerald-600 dark:to-green-500 rounded-2xl shadow-lg p-6 h-fit text-center text-black">
              <div className="relative w-28 h-28 mx-auto">
                <img
                  src={user?.image || assets.person_icon}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-900"
                />

                <label className="absolute bottom-1 right-1 bg-black dark:bg-white text-white dark:text-black w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow">
                  <MdOutlineCameraAlt size={20} />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedImage = e.target.files[0];

                      if (!selectedImage) return;

                      // Profile image ka type aur size validate karne ke liye
                      if (!selectedImage.type.startsWith("image/")) {
                        toast.error("Please select a valid image file");
                        return;
                      }

                      if (selectedImage.size > 2 * 1024 * 1024) {
                        toast.error("Profile image must be less than 2 MB");
                        return;
                      }

                      // Valid image select hone ke baad upload process start karne ke liye
                      setImage(selectedImage);
                      onImageUpload(selectedImage);
                    }}
                  />
                </label>
              </div>

              <h2 className="text-xl font-semibold text-black mt-5">
                {user?.name || "Job Seeker"}
              </h2>

              <p className="text-sm text-black/70 mt-1">{user?.email}</p>

              <div className="border-t border-black/20 mt-6 pt-5 text-left">
                <p className="text-xs uppercase tracking-wide text-black/60">
                  Account Type
                </p>

                <p className="font-medium text-black mt-1">Job Seeker</p>
              </div>
            </div>

            {/* Job seeker ki personal information edit karne ke liye */}
            <div className="md:col-span-2 bg-gray-200 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-7">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-7">
                Keep your information up to date
              </p>

              <form onSubmit={onSubmitHandler}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      className="w-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 text-gray-500 dark:text-gray-400 outline-none"
                      disabled
                    />
                  </div>
                </div>

                {/* Resume ko upload/manage karne ke liye */}
                <div className="mt-7">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Resume
                  </label>

                  <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-5 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-200">
                          {user?.resume
                            ? "Resume uploaded"
                            : "Upload your resume"}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {user?.resume
                            ? "Your resume is saved successfully"
                            : "PDF, DOC or DOCX files are supported"}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Resume select karne ke liye file picker open karne ka button */}
                        <label className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium text-green-600 dark:text-green-400 cursor-pointer hover:bg-green-50 dark:hover:bg-gray-800">
                          Choose File
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                              const selectedResume = e.target.files[0];

                              if (!selectedResume) return;

                              // Resume ka allowed format aur file size validate karne ke liye
                              const allowedTypes = [
                                "application/pdf",
                                "application/msword",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              ];

                              if (!allowedTypes.includes(selectedResume.type)) {
                                toast.error(
                                  "Only PDF, DOC or DOCX files are allowed",
                                );
                                return;
                              }

                              if (selectedResume.size > 5 * 1024 * 1024) {
                                toast.error("Resume must be less than 5 MB");
                                return;
                              }

                              // Valid resume select hone ke baad upload process start karne ke liye
                              setResume(selectedResume);
                              onResumeUpload(selectedResume);
                            }}
                          />
                        </label>

                        {/* Uploaded resume ko browser me open karne ke liye */}
                        {user?.resume && (
                          <a
                            href={user.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                          >
                            View Resume
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-400 text-black px-7 py-3 rounded-xl font-medium hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
