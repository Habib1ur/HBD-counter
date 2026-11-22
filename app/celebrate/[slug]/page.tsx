import React from "react";
import { notFound } from "next/navigation";
import { FRIENDS_DATA, getFriendBySlug } from "@/data/friends";
import { CelebrationClient } from "./CelebrationClient";

export function generateStaticParams() {
  const params = FRIENDS_DATA.map((friend) => ({
    slug: friend.slug,
  }));
  // Also add double celebration route
  params.push({ slug: "mim-and-shiam" });
  return params;
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (params.slug === "mim-and-shiam") {
    return {
      title: "TWO BIRTHDAYS. ONE BIG CELEBRATION — Mim & Shiam",
      description: "Synchronized November 8 Double Birthday celebration for Mim and Shiam in Friends Universe.",
    };
  }

  const friend = getFriendBySlug(params.slug);
  if (!friend) return { title: "Celebration — Friends Universe" };

  return {
    title: `Happy Birthday ${friend.name}! — Friends Universe Celebration`,
    description: `Immersive birthday celebration experience for ${friend.name}.`,
  };
}

export default function CelebratePage({ params }: { params: { slug: string } }) {
  if (params.slug === "mim-and-shiam") {
    const mim = getFriendBySlug("mim")!;
    const shiam = getFriendBySlug("shiam")!;
    return <CelebrationClient primaryFriend={mim} secondaryFriend={shiam} isDouble={true} />;
  }

  const friend = getFriendBySlug(params.slug);
  if (!friend) {
    notFound();
  }

  const isMimOrShiam = friend.slug === "mim" || friend.slug === "shiam";
  const partner = isMimOrShiam
    ? getFriendBySlug(friend.slug === "mim" ? "shiam" : "mim")
    : undefined;

  return (
    <CelebrationClient
      primaryFriend={friend}
      secondaryFriend={partner}
      isDouble={false}
    />
  );
}
