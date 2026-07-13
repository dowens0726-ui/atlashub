"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  subscribeAtlasEvents,
  type AtlasEvent,
} from "@/app/store/atlas-events";


export type AtlasEventHandler = (
  event: AtlasEvent
) => void;


/**
 * Subscribes a client component to Atlas lifecycle events.
 *
 * The latest handler is stored in a ref so components do not repeatedly
 * unsubscribe and resubscribe whenever their render callback changes.
 */
export function useAtlasEvents(
  handler: AtlasEventHandler
): void {
  const handlerRef =
    useRef<AtlasEventHandler>(
      handler
    );


  useEffect(() => {
    handlerRef.current =
      handler;
  }, [handler]);


  useEffect(() => {
    return subscribeAtlasEvents(
      (event) => {
        handlerRef.current(
          event
        );
      }
    );
  }, []);
}