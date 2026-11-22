"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareHeart, Send, Trash2, Sparkles, User, Info } from "lucide-react";
import { FRIENDS_DATA } from "@/data/friends";
import { WishMessage } from "@/types/birthday";
import { getStoredWishes, saveWish, deleteWish } from "@/lib/storage";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export function WishesSection() {
  const [wishes, setWishes] = useState<WishMessage[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<string>(FRIENDS_DATA[0].slug);
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterFriend, setFilterFriend] = useState<string>("all");

  useEffect(() => {
    setWishes(getStoredWishes());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newWish = saveWish({
      friendSlug: selectedFriend,
      authorName: authorName.trim(),
      message: message.trim(),
    });

    setWishes([newWish, ...wishes]);
    setMessage("");
    setIsSubmitting(false);
  };

  const handleDelete = (id: string) => {
    const updated = deleteWish(id);
    setWishes(updated);
  };

  const filteredWishes =
    filterFriend === "all"
      ? wishes
      : wishes.filter((w) => w.friendSlug === filterFriend);

  return (
    <section id="wishes" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
        <Badge variant="rose" icon={<MessageSquareHeart className="w-3.5 h-3.5" />}>
          MEMORIES & WISHES WALL
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
          Leave a Heartfelt Note
        </h2>
        <p className="text-sm text-slate-300 mt-2 font-sans">
          Pen a birthday message, inside joke, or cherished memory for any of the seven friends.
        </p>

        {/* LocalStorage Notice */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] text-sky-300 font-mono">
          <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>Wishes are stored locally on your device in LocalStorage.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* WISH FORM */}
        <div className="lg:col-span-5">
          <GlassCard
            variant="strong"
            className="p-6 sm:p-8 bg-gradient-to-b from-white/[0.08] to-white/[0.03] dark:from-[#0d162b]/80 dark:to-[#080d1a]/90"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Compose a Birthday Wish</span>
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Select Friend */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Who is this wish for?
                </label>
                <select
                  value={selectedFriend}
                  onChange={(e) => setSelectedFriend(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] dark:bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                >
                  {FRIENDS_DATA.map((friend) => (
                    <option key={friend.slug} value={friend.slug} className="bg-slate-900 text-white">
                      {friend.name} ({friend.birthdayDay}/{friend.birthdayMonth})
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Habib, Shaira, or a Friend"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.06] dark:bg-black/40 border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Wish or Memory
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share a heartfelt message, birthday wish, or memory..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white/[0.06] dark:bg-black/40 border border-white/15 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Post Birthday Wish</span>
              </button>
            </form>
          </GlassCard>
        </div>

        {/* WISHES STREAM */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setFilterFriend("all")}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                filterFriend === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
              }`}
            >
              All ({wishes.length})
            </button>
            {FRIENDS_DATA.map((f) => (
              <button
                key={f.slug}
                onClick={() => setFilterFriend(f.slug)}
                className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                  filterFriend === f.slug
                    ? "bg-blue-600 text-white"
                    : "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1]"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredWishes.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-slate-400 text-sm">
                No wishes found for this friend yet. Be the first to leave one!
              </div>
            ) : (
              filteredWishes.map((w) => {
                const targetFriend = FRIENDS_DATA.find((f) => f.slug === w.friendSlug);
                return (
                  <div
                    key={w.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] dark:bg-white/[0.02] border border-white/[0.08] backdrop-blur-md shadow-glass-sm flex flex-col justify-between gap-3 group hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                          style={{
                            backgroundColor: targetFriend?.profileAccent || "#3B82F6",
                          }}
                        >
                          {w.authorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">
                            {w.authorName}
                          </span>
                          <span className="text-[11px] text-sky-400 font-mono">
                            for {targetFriend?.name || w.friendSlug}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(w.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-400 p-1 rounded-lg hover:bg-white/[0.06] transition-all"
                        title="Delete locally stored wish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      &ldquo;{w.message}&rdquo;
                    </p>

                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(w.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
