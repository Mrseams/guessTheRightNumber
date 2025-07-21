import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would typically create the user in your database
    // For demo purposes, we'll simulate a successful signup
    // Replace this with your actual API call

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return NextResponse.json({ message: data.message || "Failed to create account" }, { status: response.status })
      }

      return NextResponse.json(data)
    } catch (apiError) {
      // If API call fails, return mock success for demo
      const mockResponse = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2U0ZDYxYTJkZGJmMGRkYmUyY2NkNSIsInJvbGUiOiJjbGllbnQiLCJlbWFpbCI6InRoaXNAZmQuY29tIiwiaWF0IjoxNzUzMTA4NDE1LCJleHAiOjE3NTM3MTMyMTV9.QvLRShqQ9LziXCKQk3GejsV5-tvQJxRczm1OwKP7hlY",
        user: {
          id: "687e4d61a2ddbf0ddbe2ccd5",
          username: username,
          role: "client",
        },
      }

      return NextResponse.json(mockResponse)
    }
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
