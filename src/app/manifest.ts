import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "medviCare",
    short_name: "medviCare",
    description:
      "Clinician-guided online care with discreet delivery for eligible adults in Canada.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#3d52a0",
  };
}
