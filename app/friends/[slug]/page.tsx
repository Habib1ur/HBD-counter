import React from "react";
import { notFound } from "next/navigation";
import { FRIENDS_DATA, getFriendBySlug } from "@/data/friends";
import { FriendProfileClient } from "./FriendProfileClient";

export function generateStaticParams() {
  return FRIENDS_DATA.map((friend) => ({
    slug: friend.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const friend = getFriendBySlug(params.slug);
  if (!friend) return { title: "Friend Not Found — Friends Universe" };

  return {
    title: `${friend.name} — Friends Universe Profile`,
    description: friend.shortDescription,
  };
}

export default function FriendProfilePage({ params }: { params: { slug: string } }) {
  const friend = getFriendBySlug(params.slug);

  if (!friend) {
    notFound();
  }

  return <FriendProfileClient friend={friend} />;
}
