import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categorías y rutas de aprendizaje",
  description: "Rutas organizadas sobre CAD paramétrico, impresión 3D FDM, materiales, simulación FEM y documentación técnica.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: absoluteUrl("/guias")
  }
};

export default function CategoriesPage() {
  permanentRedirect("/guias");
}
