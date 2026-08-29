import { NextResponse } from "next/server";

const LEETCODE_QUERY = `
  query userProblemsSolved($username: String!) {
    matchedUser(username: $username) {
      profile {
        ranking
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "username query param is required" }, { status: 400 });
    }

    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: LEETCODE_QUERY,
                variables: { username },
            }),
            next: { revalidate: 300 },
        });

        if (!response.ok) {
            return NextResponse.json({ error: "LeetCode API request failed" }, { status: 502 });
        }

        const data = await response.json();
        const matchedUser = data?.data?.matchedUser;

        if (!matchedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const solvedByDifficulty: Record<string, number> = {};
        for (const item of matchedUser.submitStatsGlobal?.acSubmissionNum ?? []) {
            solvedByDifficulty[item.difficulty] = item.count;
        }

        const totalByDifficulty: Record<string, number> = {};
        for (const item of data?.data?.allQuestionsCount ?? []) {
            totalByDifficulty[item.difficulty] = item.count;
        }

        return NextResponse.json({
            totalSolved: solvedByDifficulty["All"] ?? 0,
            totalQuestions: totalByDifficulty["All"] ?? 0,
            easySolved: solvedByDifficulty["Easy"] ?? 0,
            easyTotal: totalByDifficulty["Easy"] ?? 0,
            mediumSolved: solvedByDifficulty["Medium"] ?? 0,
            mediumTotal: totalByDifficulty["Medium"] ?? 0,
            hardSolved: solvedByDifficulty["Hard"] ?? 0,
            hardTotal: totalByDifficulty["Hard"] ?? 0,
            ranking: matchedUser.profile?.ranking ?? null,
        });
    } catch {
        return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 500 });
    }
}
