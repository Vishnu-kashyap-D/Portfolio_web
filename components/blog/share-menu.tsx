"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

export function ShareMenu({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).catch(() => {
      // clipboard access denied — nothing we can do here
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-1">
      <span className="mr-1 text-sm font-medium text-muted-foreground">Share</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        title={copied ? "Copied!" : "Copy link"}
        className={cn(iconButtonClass, copied && "text-primary")}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className={iconButtonClass}
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        title="Share on X"
        className={iconButtonClass}
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
        className={iconButtonClass}
      >
        <MessageCircle className="h-4 w-4" />
      </a>
    </div>
  );
}
