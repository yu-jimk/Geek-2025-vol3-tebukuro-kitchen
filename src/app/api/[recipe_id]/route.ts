import { supabase } from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // console.log("SINGLE GET");
  // console.log(req.url);
  const id = req.url?.split("/api/")[1];
  // console.log(id);

  const { data, error } = await supabase
    .from("Recipes")
    .select("*, Descripts(*), Ingredients(*)")
    .eq("id", id)
    .single();

  if (error || !data) {
    // エラーやデータがない場合は404ステータスを返す
    return NextResponse.json(
      { error: error?.message || "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
