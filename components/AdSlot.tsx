"use client";

import { siteConfig } from "@/lib/site.config";
import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
}

export default function AdSlot({ slot, format = "auto", responsive = true }: AdSlotProps) {
  useEffect(() => {
    if (siteConfig.ads.enabled && siteConfig.ads.adsenseClientId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  if (!siteConfig.ads.enabled || !siteConfig.ads.adsenseClientId) {
    return null;
  }

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.ads.adsenseClientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}

