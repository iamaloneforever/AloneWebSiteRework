import { NextResponse } from "next/server"

const GITHUB_API = "https://api.github.com"

async function safeFetch(url: string, options: any) {
  const res = await fetch(url, options)
  const text = await res.text()

  if (!res.ok) {
    throw new Error(`GitHub API Error ${res.status}: ${text}`)
  }

  return JSON.parse(text)
}

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME
    const token = process.env.GITHUB_TOKEN

    if (!username || !token) {
      throw new Error("Missing GitHub env variables")
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "NextJS-App",
    }

    const profile = await safeFetch(`${GITHUB_API}/users/${username}`, { headers })

    let repos = await safeFetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`, { headers })
    repos = repos.filter((r: any) => !r.fork).sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)

    const graphqlQuery = {
      query: `
        {
          user(login: "${username}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  stargazerCount
                  url
                  primaryLanguage { name color }
                }
              }
            }
          }
        }
      `
    }

    const pinnedData = await safeFetch(`${GITHUB_API}/graphql`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "NextJS-App",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })

    if (pinnedData.errors) {
      throw new Error(JSON.stringify(pinnedData.errors))
    }

    const pinned = pinnedData.data.user.pinnedItems.nodes

    return NextResponse.json({ profile, repos, pinned })
  } catch (err: any) {
    console.error("GITHUB API FAILED:", err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
