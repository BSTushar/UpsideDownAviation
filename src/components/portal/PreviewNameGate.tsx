"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Label, Input } from "@/components/ui/FormElements";

type Props = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

/** Collects the visitor's name before entering the portal preview. */
export function PreviewNameGate({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-void/90 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-name-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-card border border-graphite bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
      >
        <p className="type-caption text-accent">Preview the student portal</p>
        <h2 id="preview-name-title" className="mt-2 type-heading-sm text-bone-white">
          What should we call you?
        </h2>
        <p className="mt-2 type-body-sm text-slate">
          We will welcome you by name and walk you through the portal with sample student data — nothing you enter is saved.
        </p>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
          <div>
            <Label htmlFor="preview-name">Your first name</Label>
            <Input
              id="preview-name"
              autoFocus
              placeholder="e.g. Arjun"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              className="mt-1"
            />
            {error && (
              <span role="alert" className="mt-1 block type-body-sm text-error">
                {error}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" variant="primary" fullWidth>
              Continue to preview
            </Button>
            <Button type="button" variant="ghost" fullWidth onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
