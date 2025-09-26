import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
  });
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic
    setIsEditing(false);
  };

  if (!user) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Profile
      </motion.h1>

      <motion.div
        className="rounded-2xl border border-white/20 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl shadow-xl p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {!isEditing ? (
          // -------- View Mode --------
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              {user.avatar ? (
                <motion.img
                  src={user.avatar}
                  alt={user.username}
                  className="w-20 h-20 rounded-full ring-4 ring-cyan-400/40 shadow-md"
                  whileHover={{ scale: 1.05 }}
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {user.username}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>

            {user.bio && (
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Bio
                </h3>
                <p className="text-slate-700 dark:text-slate-400">{user.bio}</p>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </div>
        ) : (
          // -------- Edit Mode --------
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:ring-2 focus:ring-cyan-400"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-400"
                  placeholder="Add a skill..."
                />
                <motion.button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center gap-2 shadow-md"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-white hover:text-red-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-slate-500 to-slate-700 shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
