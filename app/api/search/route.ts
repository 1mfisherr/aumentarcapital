import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const searchIndex = getSearchIndex();
    return NextResponse.json(searchIndex);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search index" },
      { status: 500 }
    );
  }
}
