"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  appendCopilotSessionEntry,
  buildCopilotSession,
} from "@/app/intelligence";

import type {
  AtlasCopilotSession,
  AtlasCopilotSessionEntry,
  AtlasCopilotSessionEntryRole,
} from "@/app/intelligence";


export type AddAtlasCopilotSessionEntryInput = {
  id?: string;

  content: string;

  createdAt?: string;

  recommendationTitle?: string;

  recommendationConfidence?: number;

  intent?: string;
};


export type UseAtlasCopilotSessionResult = {
  session: AtlasCopilotSession | null;

  isReady: boolean;

  appendEntry: (
    role: AtlasCopilotSessionEntryRole,
    input: AddAtlasCopilotSessionEntryInput
  ) => void;

  addPlayerEntry: (
    input: AddAtlasCopilotSessionEntryInput
  ) => void;

  addAtlasEntry: (
    input: AddAtlasCopilotSessionEntryInput
  ) => void;

  addSystemEntry: (
    input: AddAtlasCopilotSessionEntryInput
  ) => void;

  startNewSession: () => void;
};


function createSessionEntryId(
  role: AtlasCopilotSessionEntryRole
): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `${role}-${crypto.randomUUID()}`;
  }

  return `${role}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}


function buildSessionEntry(
  role: AtlasCopilotSessionEntryRole,
  input: AddAtlasCopilotSessionEntryInput
): AtlasCopilotSessionEntry {
  return {
    id:
      input.id ??
      createSessionEntryId(
        role
      ),

    role,

    content:
      input.content,

    createdAt:
      input.createdAt ??
      new Date().toISOString(),

    recommendationTitle:
      input.recommendationTitle,

    recommendationConfidence:
      input.recommendationConfidence,

    intent:
      input.intent,
  };
}


export function useAtlasCopilotSession():
  UseAtlasCopilotSessionResult {
  const [
    session,
    setSession,
  ] =
    useState<AtlasCopilotSession | null>(
      null
    );

  const [
    isReady,
    setIsReady,
  ] =
    useState(
      false
    );


  useEffect(
    () => {
      setSession(
        buildCopilotSession()
      );

      setIsReady(
        true
      );
    },
    []
  );


  const appendEntry =
    useCallback(
      (
        role: AtlasCopilotSessionEntryRole,
        input: AddAtlasCopilotSessionEntryInput
      ) => {
        const entry =
          buildSessionEntry(
            role,
            input
          );

        setSession(
          (
            currentSession
          ) => {
            const activeSession =
              currentSession ??
              buildCopilotSession();

            return appendCopilotSessionEntry(
              activeSession,
              entry
            );
          }
        );
      },
      []
    );


  const addPlayerEntry =
    useCallback(
      (
        input: AddAtlasCopilotSessionEntryInput
      ) => {
        appendEntry(
          "player",
          input
        );
      },
      [
        appendEntry,
      ]
    );


  const addAtlasEntry =
    useCallback(
      (
        input: AddAtlasCopilotSessionEntryInput
      ) => {
        appendEntry(
          "atlas",
          input
        );
      },
      [
        appendEntry,
      ]
    );


  const addSystemEntry =
    useCallback(
      (
        input: AddAtlasCopilotSessionEntryInput
      ) => {
        appendEntry(
          "system",
          input
        );
      },
      [
        appendEntry,
      ]
    );


  const startNewSession =
    useCallback(
      () => {
        setSession(
          buildCopilotSession()
        );

        setIsReady(
          true
        );
      },
      []
    );


  return {
    session,

    isReady,

    appendEntry,

    addPlayerEntry,

    addAtlasEntry,

    addSystemEntry,

    startNewSession,
  };
}


export default useAtlasCopilotSession;