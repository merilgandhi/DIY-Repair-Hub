import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGuide } from "../../context/GuideContext.jsx";
import GuideList from "../Guides/GuideList.jsx";
import ChatWidget from "../AI/ChatWidget.jsx";

const Home = () => {
  const { getGuides } = useGuide();

  useEffect(() => {
    getGuides();
  }, []);

  return (
    <div className="space-y-28">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_70%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.25),transparent_60%)]" />

        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent px-5 py-1.5 text-sm ring-1 ring-white/20 backdrop-blur">
              <span className="inline-block size-2 rounded-full bg-cyan-400 animate-pulse" />
              AI assistant now available for complex repairs
            </div>

            {/* Title */}
            <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                DIY Repair Hub
              </span>
            </h1>
            <p className="mt-5 text-lg md:text-2xl t leading-relaxed max-w-2xl mx-auto
            bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Share and discover step-by-step repair guides powered by a
              helpful community.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 font-semibold text-white shadow-lg hover:shadow-cyan-500/40 transition-all"
                >
                  🚀 Get started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/guides"
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg hover:shadow-purple-500/40 transition-all"
                >
                  📚 Browse guides
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-8 md:grid-cols-3 px-6">
        {[
          {
            icon: "🔧",
            title: "Step-by-step",
            desc: "Clear instructions with photos for common repairs.",
            color: "from-cyan-400 to-blue-400",
          },
          {
            icon: "🤖",
            title: "AI assistance",
            desc: "Ask questions and unblock tricky steps instantly.",
            color: "from-purple-400 to-pink-400",
          },
          {
            icon: "👥",
            title: "Community",
            desc: "Share knowledge, rate guides, and help others.",
            color: "from-emerald-400 to-teal-400",
          },
        ].map((f, i) => (
          <motion.article
            key={f.title}
            className="group rounded-2xl border border-zinc-200/20 bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur-md p-6 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${f.color} text-3xl text-white shadow-md group-hover:scale-110 transition-transform`}
            >
              {f.icon}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-white">
              {f.title}
            </h3>
            <p className="mt-2 text-slate-300">{f.desc}</p>
          </motion.article>
        ))}
      </section>

      {/* Recent Guides */}
      <section className="px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Recent guides</h2>
          <Link
            to="/guides"
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all →
          </Link>
        </div>
        <GuideList />
      </section>

      {/* Chat Widget */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ChatWidget />
      </motion.div>
    </div>
  );
};

export default Home;
